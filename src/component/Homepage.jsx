import { useEffect, useState } from "react"
import { Heading } from "./Heading.jsx"
import { ListContainer } from "./ListContainer.jsx"
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export function Homepage(){
  const[messages,setMessages]=useState(()=>{
    try{
      const saved =localStorage.getItem('messages');
      return saved? JSON.parse(saved):[];
    }catch(e){
      console.log('bad data, clear bad data');
      localStorage.removeItem('messages');
      return [];
    }
  });
  
  const deleteTask=(id)=>{
    setMessages(messages.filter(message=>message.id!==id))
  }

  const editTask=(id,newText)=>{
    setMessages(messages.map((message)=>{
      return message.id===id?{...message,message:newText}:message
    })
  )}

  const toggleCheck=(id)=>{
    setMessages(prev=>prev.map((message)=>{
      return message.id===id?{...message, completed:!message.completed}:message
    }));
  }

  useEffect(()=>{
     localStorage.setItem('messages', JSON.stringify(messages));
  },[messages]);
  
  return(
    <div className="todo-app">
        <Heading  messages={messages} setMessages={setMessages}/>
        <ListContainer 
          messages={messages} 
          onDelete={deleteTask} 
          onEdit={editTask}
          onToggle={toggleCheck}
        />
    </div>
  )

}