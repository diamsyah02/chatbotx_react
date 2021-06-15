import { Fragment, useState } from "react"
import '../App.css'
import { Url } from "../constant"

const Navbar = () => {
  const [info, setInfo] = useState(false)
  const [deleted, setDeteled] = useState(false)

  function endChat() {
    localStorage.clear()
    setDeteled(!deleted)
    window.location.reload()
  }
  return (
    <Fragment>
      <nav className="navbar navbar-fixed-top navbar-dark bg-info">
        <div className="navbar-nav mr-auto">
          <span className="navbar-brand h4">Chatbot-X</span>
        </div>
        <div className="navbar-text text-light">
          <i className="fa fa-info-circle" style={{ cursor: 'pointer' }} onClick={() => { setInfo(!info); setDeteled(false); }}></i> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <i className="fa fa-trash" style={{ cursor: 'pointer' }} onClick={() => { setDeteled(!deleted); setInfo(false) }}></i>
        </div>
      </nav>
      {(info) ?
        <div className="info bg-info text-light p-2 animate__animated animate__backInRight">
          <div align="center" className="p-4">
            <i className="fa fa-times-circle fa-2x" style={{ cursor: 'pointer' }} onClick={() => setInfo(!info)}></i>
          </div>
          <ul style={{ marginTop: 15, marginBottom: 15 }}>
            <li>Aplikasi ini dibuat oleh Diamsyah M Dida.</li>
            <li>Dibuat dengan teknologi React JS.</li>
            <li>Aplikasi ini dibuat terinspirasi dari aplikasi chatbot simsimi.</li>
            <li>Gunakan aplikasi ini sebaik-baiknya.</li>
            <li>Maaf jika aplikasi ini dirasa kurang sempurna, kerna ini bot/robot bukan manusia.</li>
            <li>Kontak developer/programmer bisa cek di websitenya <a href="https://diamsyah.com" target="_blank" className="btn btn-outline-light btn-sm">https://diamsyah.com</a></li>
            <li>Jika ada yang menemukan bug silakan infokan ke developer/programmernya</li>
            <li>Sumber bot <a href="https://fdciabdul.tech/" className="text-light" target="_blank"><u>https://fdciabdul.tech/</u></a></li>
            <li>Rest api bot: <a href={Url} className="text-light" target="_blank"><u>{`${Url}{isi pesan}`}</u></a></li>
          </ul>
        </div>
        :
        <></>
      }
      {(deleted) ?
        <div className="deleted bg-info text-light animate__animated animate__jackInTheBox">
          <div align="center" className="pb-4">
            <i className="fa fa-times-circle fa-2x" style={{ cursor: 'pointer' }} onClick={() => setDeteled(!deleted)}></i>
          </div>
          <div align="center">
            <p>Yakin mau end chat?</p>
            <button className="btn btn-light btn-sm" onClick={() => endChat()}>Iya</button>&nbsp;
            <button className="btn btn-secondary btn-sm text-light" onClick={() => setDeteled(!deleted)}>Engga</button>
          </div>
        </div>
        :
        <></>
      }
    </Fragment>
  )
}

export default Navbar