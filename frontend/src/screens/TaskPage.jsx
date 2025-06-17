import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewTask,
  completeTask,
  deleteTask,
  updateTask,
} from "../store/features/tasksSlice";
import { MdOutlineAutoDelete, MdEdit } from "react-icons/md";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TaskPage = () => {
  const [text, setText] = useState("");
  const [newText, setNewText] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const dispatch = useDispatch();
  // const allTasks = useSelector((state) => state.tasks.tasks);
  const [allTasks, setAllTasks] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const emailSaved = localStorage.getItem('email');      
      const allData = await fetch("/api/tasks",
        {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({email: emailSaved})
        }
      );
      const result = await allData.json();
      setAllTasks(result);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const HandleAddTask = async() => {
    const emailSaved = localStorage.getItem('email');  
    dispatch(addNewTask({ text, complete: false }));

    if(text===''){
        setIsEmpty(true);
        return;
    }
    
    setIsEmpty(false);
    
    const addTask = await fetch("/api/addTask",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          task: text, 
          email: emailSaved
        }),        
    })
    const data = await addTask.json();
    
    getData();
    setText("");
  };

  const HandleEditTask = (eid, updateText) => {
    inputRef.current.focus();
    setText(updateText);
    setIsEdit(true);
    setNewText(eid);
  };

  const HandleUpdateTask = async () => {
    dispatch(updateTask({ text: text, id: newText }));
    const emailSaved = localStorage.getItem('email');
     if(text===''){
        setIsEmpty(true);
        return;
    }
    
    setIsEmpty(false);

    const newTask = await fetch("/api/updateTask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: newText, email: emailSaved, msg: text }),
    });

    getData();
    setIsEdit(false);
    setNewText("");
    setText("");
  };

  const HandleCompleteTask = (eid) => {
    dispatch(completeTask({ id: eid }));
  };

  const HandleLogout = () => {
    localStorage.removeItem('Authtoken');
    localStorage.removeItem('email');
    navigate('/');
  };

  const HandleDeleteTask = async (eid) => {
    dispatch(deleteTask({ id: eid }));
    const res = await fetch(`api/deleteTask/${eid}`,{
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        email: localStorage.getItem('email')
      })
    })
    getData();    
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex gap-3">
        <input
          type="text"
          className="w-full focus:outline-none border rounded border-gray-700 px-3"
          value={text}
          ref={inputRef}
          onChange={(e) => setText(e.target.value)}
        />
        {!isEdit ? (
          <button onClick={HandleAddTask}>Add</button>
        ) : (
          <button onClick={HandleUpdateTask}>Update</button>
        )}
        <button onClick={HandleLogout}>Logout</button>
      </div>
      {isEmpty && <p className="text-red-500">Please add task</p>}
      <div className="flex flex-col border rounded border-gray-700 gap-4 p-4">
        <h3>List of Tasks</h3>
        <hr className="border border-gray-700" />
        {allTasks.map((task) => (
          <div key={task._id} className="flex gap-2">
            <input
              type="checkbox"
              onChange={() => HandleCompleteTask(task._id)}
            />
            <input
              type="text"
              className={task.complete ? `w-full line-through` : `w-full`}
              disabled
              value={task.task}
            />
            <MdEdit
              color="blue"
              onClick={() => HandleEditTask(task._id, task.task)}
            />
            <MdOutlineAutoDelete
              color="red"
              onClick={() => HandleDeleteTask(task._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskPage;
