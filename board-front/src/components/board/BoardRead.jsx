import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './css/BoardRead.module.css';
import * as format from '../../utils/format';

const BoardRead = ({ board = {}, fileList, onDownload }) => {
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
                defaultValue={board.title ?? ''}
                className={`${styles['form-input']}`}                
              />
            </td>
          </tr>
          <tr>
            <th>작성자</th>
            <td>
              <input
                type="text"
                defaultValue={board.writer ?? ''}
                className={`${styles['form-input']}`}                
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <textarea
                rows={10}
                cols={40}
                defaultValue={board.content ?? ''}
                className={`${styles['form-input']}`}                
              ></textarea>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              {
                fileList.map((file) => (
                  <div key={file.id} className='flex-box'>
                    <div className="item">
                      <img src={`/api/file/img/${file.id}`} alt={file.originName} className='file-img'/>
                      <span>{file.originName} ({ format.byteToUnit(file.fileSize)})</span>
                    </div>
                    <div className="item">
                      <button className='btn' onClick={() => onDownload(file.id, file.originName)}>다운로드</button>
                    </div>
                  </div>
                ))
              }
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
