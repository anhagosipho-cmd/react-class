import { useEffect, useRef, useState } from "react"
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [attendance, setAttendance] = useState('출석')
  const [memo, setMemo] = useState('')
  const [students, setStudents] = useState([])
  const [message, setMessage] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date())

  const nameInputRef = useRef(null)

  // 현재 시간 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  // 처음 화면이 나타나면 입력창에 포커스
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus()
    }
  }, [])

  // 학생 추가
  const addStudent = () => {
    if (name.trim() === '') {
      setMessage('학생 이름을 입력하세요')
      nameInputRef.current.focus()
      return
    }

    const newStudent = {
      id: Date.now(),
      name: name,
      attendance: attendance,
      memo: memo
    }

    const updatedStudents = students.concat(newStudent)
    setStudents(updatedStudents)
    setMessage('학생이 등록되었습니다.')

    setName('')
    setAttendance('출석')
    setMemo('')

    nameInputRef.current.focus()
  }

  // 전체 학생 목록 초기화
  const clearStudents = () => {
    setStudents([])
    setMessage('전체 학생 목록을 초기화했습니다.')
    nameInputRef.current.focus()
  }

  // 출석 상태별 학생 목록
  const presentStudents = students.filter(
    (student) => student.attendance === '출석'
  )

  const lateStudents = students.filter(
    (student) => student.attendance === '지각'
  )

  const absentStudents = students.filter(
    (student) => student.attendance === '결석'
  )

  return (
  <main className="page">
  <h1 style={{
    textAlign: 'center',
    display: 'block',
    width: '100%',
    margin: '30px 0 20px',
    position: 'static',
    transform: 'none'
  }}>
    학생 출석·메모 관리
  </h1>
      <section className="time-box">
        <span>현재 시간</span>
        <strong>
          {currentTime.toLocaleTimeString()}
        </strong>
      </section>


      <section className="form-box">
        <h2>학생 등록</h2>

        <div className="form-group">
          <label>학생 이름</label>
          <input
            ref={nameInputRef}
            type="text"
            placeholder="학생 이름 입력"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>출석 상태</label>
          <select
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
          >
            <option value="출석">출석</option>
            <option value="지각">지각</option>
            <option value="결석">결석</option>
          </select>
        </div>

        {/* 메모 */}
        <div className="form-group">
          <label>메모</label>
          <textarea
            placeholder="메모 입력"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>

        {/* 학생 추가 버튼 */}
        <button className="add-button" onClick={addStudent}>
          학생 추가
        </button>

        {/* 결과 메시지 */}
        {message !== '' && (
          <p className="message">{message}</p>
        )}
      </section>

      {/* 출석 현황 */}
      <section className="summary-box">
        <h2>출석 현황</h2>

        <div className="summary-list">
          <div>
            <span>전체</span>
            <strong>{students.length}명</strong>
          </div>

          <div>
            <span>출석</span>
            <strong>{presentStudents.length}명</strong>
          </div>

          <div>
            <span>지각</span>
            <strong>{lateStudents.length}명</strong>
          </div>

          <div>
            <span>결석</span>
            <strong>{absentStudents.length}명</strong>
          </div>
        </div>
      </section>

      {/* 학생 목록 */}
      <section className="student-box">
        <div className="student-header">
          <h2>학생 목록</h2>

          <button onClick={clearStudents}>
            전체 초기화
          </button>
        </div>

        {students.length === 0 && (
          <p className="empty-message">
            등록된 학생이 없습니다.
          </p>
        )}

        {students.map((student) => (
          <article
            className="student-card"
            key={student.id}
          >
            <div>
              <h3>{student.name}</h3>
              <p>출석 상태: {student.attendance}</p>
              <p>
                메모: {student.memo === '' ? '없음' : student.memo}
              </p>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

export default App