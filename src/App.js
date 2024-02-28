import { useState, useEffect } from "react";
// useEffect=> is a hook in react that allows you to perform side effects in functional component.
const App = () => {
  // state to manage works
  const [todos, setTodos] = useState([]);

  //state to manage the input value of work
  const [work, setWork] = useState("");

  //get item from localStorage by loading todos

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("todos"));
    if (data !== null) setTodos(data);
  }, []);

  // effect to save todos to localStorage whenever th todos state change

  useEffect(() => {
    if (todos && todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
    //  JSON=> javascript object notation
    // JSON.stringfy=> is a static method which converts a javaScript valut to JSON format.
  }, [todos]);

  // function to handle work addition

  const handleAdd = (e) => {
    e.preventDefault();
    if (work !== "") {
      setTodos([...todos, { id: Date.now(), todo: work, completed: false }]);
      setWork("");
    }
  };

  // function to handle todo completion update

  const handleTodoCompletion = (id) => {
    const updatedTodos = todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTodos(updatedTodos);
  };

  // function to handle remove

  const handleRemove = (id) => {
    // console.log(id);
    const updatedTodos = todos.filter((t) => t.id !== id);
    setTodos(updatedTodos);
  };

  // console.log(todos);

  return (
    <div className="todos">
      <h2>Our first todo app</h2>
      <div className="todo_container">
        <div className="todo_form">
          <form onSubmit={handleAdd}>
            <input
              type="text"
              value={work}
              onChange={(e) => setWork(e.target.value)}
              placeholder="Enter new work"
            />
            <button>Add</button>
          </form>
        </div>
        <ul>
          {todos &&
            todos.map((t, i) => (
              <li key={i}>
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => handleTodoCompletion(t.id)}
                />
                <span className={`${t.completed ? "line" : ""}`}>{t.todo}</span>
                <button onClick={() => handleRemove(t.id)}>Remove</button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
