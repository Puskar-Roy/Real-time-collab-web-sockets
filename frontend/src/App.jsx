import { useState, useEffect } from 'react'
import './App.css'

import io from 'socket.io-client'
// const socket = io.connect("https://real-time-collab-web-sockets.vercel.app");
const socket = io.connect("https://puskar-real.onrender.com");
// const socket = io.connect("http://localhost:5000");
function App() {
  // const [count, setCount] = useState("")
  const [code, setCode] = useState("")
  // const sendMsg = () => {
  //   socket.emit("send_message", { "data": count })
  //   console.log(count);
  // };
  useEffect(() => {
    socket.on("received_message", data => {
      setCode(data.data)
    })
  }, [socket])

  useEffect(() => {
    socket.emit("send_message", { "data": code })
  }, [code])

  return (
    <>
      <h1>Write Your Code</h1>
      <div className='editor'>
        <textarea placeholder='Write Code' value={code} onChange={e => setCode(e.target.value)} cols="50" rows="40"></textarea>
        
      </div>

    </>
  )
}

export default App
