import { FaClipboardList } from 'react-icons/fa';
import './Heading.css'
import { useState } from 'react';
import dayjs from 'dayjs';


export function Heading({messages,setMessages}){
  const[text,setText]=useState('');
  
  const handleInputr=(event)=>{
    setText(event.target.value);
  }

  function addTask(){
    if(text.trim==='')return;
    const newMessage={
        message:text,
        time:dayjs(),
        completed:false,
        id:crypto.randomUUID()
      }

    setMessages(prev=>[...prev, newMessage]);
    setText('');
  }

  function handleKey(event){
    if(event.key==='Enter'){
      addTask();
    }
    else if(event.key==='Escape'){
      setText('');
    }
  }
  
  return(
    <div className='heading-container'>
    <div className='title'>
      <FaClipboardList className='todo-icon'/>
      <h1 className='todo-title'>Todo App</h1>
    </div>
    <div className="input-Task">
      <input type="text" 
        placeholder='Enter something' 
        className='input-box'
        onChange={handleInputr}
        value={text}
        onKeyDown={handleKey}
      />
      <button className='add-task-button' onClick={addTask}>Add Task</button>
    </div>
    </div>
  )
}