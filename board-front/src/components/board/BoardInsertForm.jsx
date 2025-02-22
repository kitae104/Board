import React from 'react'
import { Link } from 'react-router-dom'

const BoardInsertForm = () => {
  return (
    <div className='container'>
      <h1 className="title">게시글 쓰기</h1>
      <table>
        <tr>
          <td>제목</td>
          <td><input type='text'/></td>
        </tr>
        <tr>
          <td>작성자</td>
          <td><input type='text'/></td>
        </tr>
        <tr>
          <td colSpan={2}>내용</td>
            <textarea rows={10} cols={100}></textarea>
        </tr>
        <div className='btn-box'>
          <Link to='/board' className='btn'>목록</Link>
          <button className='btn'>등록</button>
        </div>
      </table>
    </div>
  )
}

export default BoardInsertForm