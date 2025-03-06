import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as format from '../../utils/format'
import styles from './css/BoardList.module.css'
import noImage from '../../assets/react.svg'

const BoardList = ({boardList, pageInfo}) => {  

  const [pageList, setPageList] = useState([])

  const createPageList = () => {
    let newPageList = []
    for(let i = pageInfo.number+1; i <= pageInfo.totalPages; i++) {
      newPageList.push(i)
    }
    setPageList(newPageList)
  }

  useEffect(() => {
    createPageList()
  }, [pageInfo])

  return (
    <div className="container">
      <h1 className='title'>게시글 제목</h1>
      <Link to="/board/insert" className='btn'>글쓰기</Link>
      <table border={1} className={`${styles.table}`}>
        <thead>
          <tr>
            <th>번호</th>
            <th>이미지</th>
            <th>제목</th>
            <th>작성자</th>
            <th>등록일자</th>
          </tr>
        </thead>
        <tbody>
          {
            boardList.length === 0 
            ?
              <tr>
                <td colSpan={5} align='center'>게시글이 없습니다.</td>
              </tr>
            :
            boardList.map((board) => (
              <tr key={board.id}>
                <td align='center'>{board.id}</td>
                <td>
                  {
                    board.file === null
                    ?
                    <img src={noImage} />
                    :
                    <img src={`/api/file/img/${board.file.id}`} alt={board.file.originName} style={ { width: '100px' } } />
                  }                  
                </td>
                <td align='left'>
                  <Link to={`/board/${board.id}`}>
                    {board.title}
                  </Link>
                </td>
                <td align='center'>{board.writer}</td>
                <td align='center'>{format.formatDate(board.regTime)}</td>
              </tr>
            ))
          }          
        </tbody>
      </table>
      {/* 페이지 부분 */}
      <div className='pagination'>
        <a href='' className='btn-page'>처음</a>
        <a href='' className='btn-page'>이전</a>
        {
          pageList.map((page, index) => (
            <a href='' key={index} className='btn-page'>{page}</a>
          ))
        }
        <a href='' className='btn-page'>다음</a>
        <a href='' className='btn-page'>마지막</a>
      </div>
    </div>
  )
}

export default BoardList