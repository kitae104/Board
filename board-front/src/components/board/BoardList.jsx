import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as format from '../../utils/format';
import styles from './css/BoardList.module.css';
import noImage from '../../assets/react.svg';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const BoardList = ({ boardList, pageInfo }) => {

  const [pageList, setPageList] = useState([]);    

  const createPageList = () => {    
    const currentPage = pageInfo.number + 1; // 현재 페이지 (0-based index이므로 +1)
    const totalPages = pageInfo.totalPages;
    const pageSize = 5; // 페이지 그룹의 크기

    // 시작 페이지 번호를 구함 (현재 페이지가 속한 그룹의 시작 번호)
    const startPage = Math.floor((currentPage - 1) / pageSize) * pageSize + 1;
    // 끝 페이지 번호를 구함 (최대 페이지를 초과하지 않도록)
    const endPage = Math.min(startPage + pageSize - 1, totalPages);

    let newPageList = [];
    
    for (let i = startPage; i <= endPage; i++) {
      newPageList.push(i);
    }

    setPageList(newPageList);
  };

  useEffect(() => {
    createPageList();
  }, [pageInfo]);

  return (
    <div className="container">
      <h1 className="title">게시글 제목</h1>
      <Link to="/board/insert" className="btn">
        글쓰기
      </Link>
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
          {boardList.length === 0 ? (
            <tr>
              <td colSpan={5} align="center">
                게시글이 없습니다.
              </td>
            </tr>
          ) : (
            boardList.map((board) => (
              <tr key={board.id}>
                <td align="center">{board.id}</td>
                <td>
                  {board.file === null ? (
                    <img src={noImage} />
                  ) : (
                    <img
                      src={`/api/file/img/${board.file.id}`}
                      alt={board.file.originName}
                      style={{ width: '100px' }}
                    />
                  )}
                </td>
                <td align="left">
                  <Link to={`/board/${board.id}`}>{board.title}</Link>
                </td>
                <td align="center">{board.writer}</td>
                <td align="center">{format.formatDate(board.regTime)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* 페이지 부분 */}
      {
        (pageInfo != null && pageInfo.totalPages > 0) 
        && 
        (
          <div className="pagination">
            <Link to={`/board?page=${1}`} className="btn-page">
              <KeyboardDoubleArrowLeftIcon />
            </Link>               
            {
              ( pageInfo.number > 0 )
              &&
              <Link to={`/board?page=${pageInfo.number}`} className='btn-page'>
                <KeyboardArrowLeftIcon />        
              </Link>
            }
            {pageList.map((page) => (
              <Link
                to={`/board?page=${page}`}
                key={page}
                className={'btn-page' + (page === pageInfo.number+1 ? ' active' : '')}
              >
                {page}
              </Link>
            ))}
            {
              ( pageInfo.number+1 < pageInfo.totalPages )
              &&
              <Link to={`/board?page=${pageInfo.number+2}`} className="btn-page">
                <KeyboardArrowRightIcon />
              </Link>
            }           
            <Link to={`/board?page=${pageInfo.totalPages}`} className="btn-page">
              <KeyboardDoubleArrowRightIcon />
            </Link>
          </div>
        )        
      }
    </div>
  );
};

export default BoardList;