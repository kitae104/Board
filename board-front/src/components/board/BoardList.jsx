import React from 'react'
import { Link } from 'react-router-dom'
import * as format from '../../utils/format'

const BoardList = ({boardList}) => {  

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
              <td align='center'>{format.formatDate(board.regTime)}</td>
            </tr>
          ))}          
        </tbody>
      </table>
    </div>
  )
}

export default BoardList