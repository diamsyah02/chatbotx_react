import { Fragment, useEffect, useState } from "react"
import {
  Url,
  keyChat,
  keyUsername
} from '../constant'

const Content = () => {
  const [chat, setChat] = useState([])
  const [msg, setMsg] = useState('')
  const [username, setUsername] = useState('')
  const [height, setHeight] = useState(0)
  const body = document.body
  const html = document.documentElement
  const heightx = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight ) - 155

  useEffect(() => {
    setHeight(heightx)
    getChat()
    getUsername()
    return () => {

    }
  }, [])

  function setUserChat() {
    if(msg != '') {
      let chats = []
      let now = new Date()
      let date = (now.getDate() < 10) ? `0${now.getDate()}` : now.getDate()
      let month = (now.getMonth()+1 < 10) ? `0${now.getMonth()+1}` : now.getMonth()+1
      let hour = (now.getHours() < 10) ? `0${now.getHours()}` : now.getHours()
      let minute = (now.getMinutes() < 10) ? `0${now.getMinutes()}` : now.getMinutes()
      let data = {
        'user': username,
        'sentence': msg,
        'date': `${date}-${month}-${now.getFullYear()} ${hour}:${minute}`
      }
      chats = [...chat, data]
      setChat(chats)
      setMsg('')
      goChat(chats)
      setTimeout(() => {
        document.querySelector('.contentChat').scrollTop = document.querySelector('.contentChat').scrollHeight 
      }, 500)
    }
  }

  async function goChat(chatsx) {
    let chats = []
    let res = await (await fetch(Url + msg)).json()
    if(res !== null || res !== undefined || res !== '') {
      let now = new Date()
      let date = (now.getDate() < 10) ? `0${now.getDate()}` : now.getDate()
      let month = (now.getMonth()+1 < 10) ? `0${now.getMonth()+1}` : now.getMonth()+1
      let hour = (now.getHours() < 10) ? `0${now.getHours()}` : now.getHours()
      let minute = (now.getMinutes() < 10) ? `0${now.getMinutes()}` : now.getMinutes()
      let data = {
        'user': 'chatbotx',
        'sentence': res.jawab,
        'date': `${date}-${month}-${now.getFullYear()} ${hour}:${minute}`
      }
      chats = [...chatsx, data]
      setChat(chats)
      saveChat(chats)
      setTimeout(() => {
        document.querySelector('.contentChat').scrollTop = document.querySelector('.contentChat').scrollHeight 
      }, 500)
    }
  }

  function saveChat(chatsx) {
    localStorage.setItem(keyChat, JSON.stringify(chatsx));
  }

  function getChat() {
    let data = localStorage.getItem(keyChat)
    if (data !== null) {
      setChat(JSON.parse(data))
    }
    setTimeout(() => {
      document.querySelector('.contentChat').scrollTop = document.querySelector('.contentChat').scrollHeight 
    }, 500)
  }

  function getUsername() {
    setUsername(localStorage.getItem(keyUsername))
  }

  return (
    <Fragment>
      <div className="contentChat" style={{ height: height, overflowY: 'scroll', overflowX: 'hidden' }}>
        {(chat.length === 0) ?
          <Fragment>
            <div className="text-center chatKosong">
              Chat aku dong {username} <i className="fa fa-frown"></i>
            </div>
          </Fragment>
          :
          <Fragment>
            {chat.map((item, i) =>
              (item.user === username) ?
                <div className="row mt-3 mb-3 animate__animated animate__bounceInUp" key={i}>
                  <div className="col-md-8 col-2"></div>
                    <div className="col-md-4 col-10 text-right">
                      <div className="ownBubble text-light">
                        <div className="mb-2">
                          <span className="badge badge-light">
                            {item.user}
                          </span>
                        </div>
                        {item.sentence}
                        <div className="text-left">
                          <small>{item.date}</small>
                        </div>
                    </div>
                  </div>
                </div>
                :
                <div className="row mt-3 mb-3 animate__animated animate__bounceInUp" key={i}>
                  <div className="col-md-4 col-10">
                    <div className="otherBubble">
                      <div className="mb-2">
                        <span className="badge badge-light">
                          Chatbot-x
                        </span>
                      </div>
                      {item.sentence}
                      <div className="text-right">
                        <small>{item.date}</small>
                      </div>
                    </div>
                  </div>
                </div>
            )}
          </Fragment>
        }
      </div>
      <div className="row mt-2">
        <div className="col-md-11 col-10">
          <textarea className="form-control" value={msg} placeholder="Tulis pesan..." onChange={(text) => setMsg(text.target.value)}></textarea>
        </div>
        <div className="col-md-1 col-2">
          <div className="text-center pt-2 pb-2">
            <button className="btn btn-info" onClick={() => setUserChat()}>
              <i className="fa fa-paper-plane text-light"></i>
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Content