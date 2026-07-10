import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import './ListContainer.css'
import unchecked from '../assets/unchecked.png'
import checked from '../assets/checked.png'
import { useState } from 'react';



export function ListContainer({messages,onDelete,onEdit,onToggle}){
  
  const [editingId,setEditingId]=useState(null); //for editing
  const [editText,setEditText]=useState(''); //new text

  function getTimeAgo(timestamp){
      const seconds = dayjs().diff(timestamp,'second');
      if(seconds<5) return 'just now';
      if(seconds<60) return `${seconds}s ago`;

      const minutes=dayjs().diff(timestamp,'minute');
      if(minutes<60) return `${minutes}m ago`;

      const hours=dayjs().diff(timestamp,'hour');
      if(hours<24)  return `${hours}h ago`;

      const days=dayjs().diff(timestamp,'day');
       return `${days}d ago`;
  }

  const handleEdit=(event)=>{
    setEditText(event.target.value);
  }
  
  const handleSave=(id)=>{
    if(editText.trim==='') return;
    onEdit(id,editText);
    setEditingId(null);
  }

  const handleCancel=()=>{
    setEditingId(null);
  }

  return(
    <ul className="list-container">
      {messages.map((message)=>{
        return(
        <li className="message-item" key={message.id}>
          <img src={message.completed? checked : unchecked} 
            alt="check" 
            className='check compleded' 
            onClick={()=>onToggle(message.id)}
          />

          {editingId===message.id? (
            <>
             <input type="text" 
               value={editText}
               onChange={handleEdit}
               autoFocus
               className='edit-input'
             />
             <button onClick={()=>handleSave(message.id)} className='save-button'>Save</button>
             <button onClick={handleCancel} className='cancel-button'>Cancel</button>
            </>
          ):(
          <>
          <span className={message.completed? 'completed':'uncompleted'}>{message.message}</span>
          <span className='message-time'>{getTimeAgo(message.time)}</span>
          <div className='buttons'>
          <span className='edit-button'
              onClick={()=>{
                setEditingId(message.id);
                setEditText(message.message)
              }}
            >✏️</span>
          <span className='delete-button' onClick={()=>onDelete(message.id)}>x</span>
          </div>
          </>
          )}
        </li>
        )
      })}
    </ul>
  )
}