import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './Login.css'

function Login() {
  const navigate = useNavigate()

  const dbEmail = 'chaeyeon4739@naver.com'
  const dbPassword = '0411'

 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  
  const [message, setMessage] = useState('')
  const handleLogin = () => {  
  console.log('입력 이메일:', email)  
  console.log('DB 이메일:', dbEmail) 
 
  if (email === dbEmail && password === dbPassword) {  
 
    localStorage.setItem('isLogin', 'true') 
 
    navigate('/profile')  
  } else {     
    setMessage( 
      '이메일 또는 비밀번호가 올바르지 않습니다.' 
    )  
  }  
}
   return (
    <main className="login-page">
      <section className="login-card">

        <p className="login-label">
          STUDENT LOGIN
        </p>

        <h1>로그인</h1>

        <p className="login-guide">
          이메일과 비밀번호를 입력하세요.
        </p>

        <div className="input-group">
          <label>이메일</label>
          <input
            type="email"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>비밀번호</label>
          <input 
          type="password"
           placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
             onKeyDown={(e) => {
           if (e.key === 'Enter') {
           handleLogin()
           }
           }}
/>
        </div>


        {message && (
          <p className="login-message">
            {message}
          </p>
        )}

        <button onClick={handleLogin}>
          로그인
        </button>

        <p className="test-account">
          테스트 계정
          <br />
          student@school.com
          <br />
          비밀번호: 1234
        </p>

      </section>
    </main>
  )
}

export default Login