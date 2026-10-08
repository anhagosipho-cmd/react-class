import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './App.css'
import profileImg from './assets/photo.png'
import { QRCodeSVG } from 'qrcode.react'

function App() {
  const name = '김채연'
  const studentID = '20250242'
  const department = '멀티미디어학과 · 2학년'
  const goal = '목표: 사용하기 편하고 보기 좋은 웹 화면 만들기'
  const qrData =
  '이름: ' + name +
  '\n학번: ' + studentID +
  '\n학과: ' + department

const navigate = useNavigate()

const handleLogout = () => {
  localStorage.removeItem('isLogin')
  navigate('/')
} 
const isLogin = localStorage.getItem('isLogin')

useEffect(() => {
  if (isLogin !== 'true') {
    navigate('/')
  }
}, [isLogin, navigate])

console.log(qrData)
  return (
    <main className="page">
      <section className="profile-card">

        <span className="status">LIVE</span>

        <img
          src={profileImg}
          alt="프로필 사진"
          className="avatar-img"
        />

        <p className="eyebrow">HELLO REACT</p>

        <h1>{name}</h1>

        <p className="department">{department}</p>

        <div className="divider"></div>

        <p className="goal">{goal}</p>

        <div className="tags">
          <span>HTML</span>
          <span>CSS</span>
          <span>JavaScript</span>
        </div>

        
<div className="qr-area">
  <QRCodeSVG
    value={qrData}
    size={100}
  />
  <p>학생 QR</p>
</div>

       <button onClick={() => navigate('/grade')}>
  성적 보기
</button>

<button onClick={handleLogout}>
  로그아웃
</button>
      </section>
    </main>
  )
}

export default App