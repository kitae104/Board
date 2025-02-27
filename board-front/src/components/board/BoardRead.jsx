import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './css/BoardRead.module.css';

const BoardRead = ({ board = {} }) => {
  const { id } = useParams();

  return (
    <div className="container">
      <h1 className="title">게시글 읽기</h1>
      <h3>번호 : {id}</h3>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th>제목</th>
            <td>
              <input
                type="text"
                value={board.title || ''}
                className={`${styles['form-input']}`}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <th>작성자</th>
            <td>
              <input
                type="text"
                value={board.writer || ''}
                className={`${styles['form-input']}`}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <textarea
                rows={10}
                cols={40}
                value={board.content || ''}
                className={`${styles['form-input']}`}
                readOnly
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="btn-box">
        <Link to="/board" className="btn">
          목록
        </Link>
        <Link to={`/board/update/${id}`} className="btn">
          수정
        </Link>
      </div>
    </div>
  );
};

export default BoardRead;
