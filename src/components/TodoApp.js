import React, { useState } from "react";
import "./todoapp.css";

function TodoApp() {
  const [task, setTask] = useState("");
  const [tasklist, setTaskList] = useState([]);
  const [taskediting, setTaskediting] = useState(null);
  const [editingtext, setEditingtext] = useState("");
  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const AddTask = () => {

    if (task !== "") {

      const taskDetails = {
        id: Math.floor(Math.random() * 1000),
        value: task,
        isCompleted: false,
      };

      setTaskList([...tasklist, taskDetails]);
    }
  };


  function submitEdits(id) {
    const updatedTasks = [...tasklist].map((task) => {
      if (task.id === id) {
        task.value = editingtext;
      }
      return task;
    });
    setTaskList(updatedTasks);
    setTaskediting(null);
  }

  const deletetask = (e, id) => {
    e.preventDefault();
    setTaskList(tasklist.filter((t) => t.id !== id));
  };
 
  

  const taskCompleted = (e, id) => {
    e.preventDefault();
    //let's find index of element
    const element = tasklist.findIndex((elem) => elem.id === id);

    //copy array into new variable
    const newTaskList = [...tasklist];

    //edit our element
    newTaskList[element] = {
      ...newTaskList[element],
      isCompleted: true,
    };

    setTaskList(newTaskList);
  };
  
  return (
    <div className="todo">
      <input type="text" name="text" id="text" value={task} onChange={(e) => handleChange(e)} placeholder="Add task here..."
      />

      <button className="add-btn" onClick={AddTask}>
        Add
      </button>
      <br />
      {tasklist !== [] ? (
        <ul>
          {tasklist.map((t) => (
            <li className={t.isCompleted ? "crossText" : "listitem"} key={t.id}>
              
              {
               taskediting === t.id ?
              <input type="text" 
              onChange = {(e) => setEditingtext(e.target.value) }
              value={editingtext}
              />:
              <div>{t.value}</div>
              }
              <button
                className="completed"
                onClick={(e) => taskCompleted(e, t.id)}
              >
                Completed
              </button>

              <button className="delete" onClick={(e) => deletetask(e, t.id)}>
                Delete
              </button>

              <button className="edit" onClick={(e) => setTaskediting(t.id)}>
                Edit
              </button>

              <button  onClick={(e) => submitEdits(t.id)}>
                submit edit
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default TodoApp;