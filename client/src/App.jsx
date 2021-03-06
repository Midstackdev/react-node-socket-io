import { useEffect, useState } from 'react';
import './App.css'
import Card from './components/card/Card';
import Navbar from './components/navbar/Navbar';
import { posts } from './data'
import { io } from 'socket.io-client'

const App = () => {
  const [username, setUsername] = useState('')
  const [user, setUser] = useState('')
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    setSocket(io("http://localhost:5800"))
  }, [])

  // console.log(socket)

  useEffect(() => {
    socket?.emit('join', user)
  }, [socket, user])

  return (
    <div className="container">
      {user ? (
        <>
          <Navbar socket={socket} />
          {posts.map(post => (
            <Card key={post._id} post={post} socket={socket} user={user}/>
          ))}
          <span className="username">{user}</span>
        </>
      ) : (

        <div className="login">
          <input type="text" placeholder="username" onChange={e => setUsername(e.target.value)} />
          <button onClick={() => setUser(username)}>Login</button>
        </div> 
      )}
    </div>
  );
}

export default App;
