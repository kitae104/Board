import React from 'react'
import { Link } from 'react-router-dom'

const BoardList = () => {

  const boardList = [
    {
      id: 1,
      title: '게시글 제목1',
      writer: '작성자1',
      regDate: '2025-02-22 12:34:56'
    }, 
    {
      id: 2,
      title: '게시글 제목2',
      writer: '작성자2',
      regDate: '2025-02-22 12:34:56'
    }, 
    {
      id: 3,
      title: '게시글 제목3',
      writer: '작성자3',
      regDate: '2025-02-22 12:34:55'
    }, 
    {
      id: 4,
      title: '게시글 제목4',
      writer: '작성자4',
      regDate: '2025-02-22 12:34:54'
    }, 
    {
      id: 5,
      title: '게시글 제목5',
      writer: '작성자5',
      regDate: '2025-02-22 12:34:53'
    }
  ]

  return (
    <div className="container">
      <h1>게시글 제목</h1>
      <Link to="/board/insert" className='btn'>글쓰기</Link>
      <table border={1}>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>등록일자</th>
          </tr>
        </thead>
        <tbody>
          {boardList.map((board) => (
            <tr key={board.id}>
              <td align='center'>{board.id}</td>
              <td align='left'>
                <Link to={`/board/${board.id}`}>
                  {board.title}
                </Link>
              </td>
              <td align='center'>{board.writer}</td>
              <td align='center'>{board.regDate}</td>
            </tr>
          ))}          
        </tbody>
      </table>
    </div>
  )
}

export default BoardList