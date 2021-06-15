import { Fragment, useState, useEffect } from "react"
import './App.css'
import {
  keyUsername
} from './constant'
import Navbar from './components/Navbar'
import Content from './components/Content'
const App = () => {
  const [username, setUsername] = useState('')
  const [usernameStorage, setUsernameStorage] = useState('')
  const [height, setHeight] = useState(0)
  const body = document.body
  const html = document.documentElement
  const heightx = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight ) - 100

  useEffect(() => {
    setHeight(heightx)
    getUsernameChat()
  }, [])

  function getUsernameChat() {
    setUsernameStorage(localStorage.getItem(keyUsername))
  }

  function saveUsername(data) {
    if(data !== '') {
      localStorage.setItem(keyUsername, username)
      setUsernameStorage(username)
      window.location.reload()
    }
  }
  return (
    <Fragment>
    {(usernameStorage == '' || usernameStorage == null) ?
      <div className="boxFirst">
        <div className="text-center text-light bg-info p-4">
          <h4>Selamat datang orang-orang gabut, selamat menikmati chat dengan chatbot-x !</h4>
          <label>Masukkan username kamu !</label>
          <input className="form-control" placeholder="Username..." value={username} autoFocus={true} onChange={(text) => setUsername(text.target.value)} required={true} /><br/>
          <button className="btn btn-outline-light btn-sm" onClick={() => saveUsername(username)}>&nbsp;&nbsp;&nbsp;Oke&nbsp;&nbsp;&nbsp;</button>
        </div>
      </div>
    :
    <div className="container bg-light pb-4" style={{ height: height }}>
      <Navbar />
      <div className="p-2">
        <Content />
      </div>
    </div>
    }
    </Fragment>
  );
}

export default App
