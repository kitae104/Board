import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './css/BoardInsertForm.module.css';

const BoardInsertForm = ({ onInsert }) => {
  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [content, setContent] = useState('');

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const changeWriter = (e) => {
    setWriter(e.target.value);
  };

  const changeContent = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = () => {
    onInsert(title, writer, content);
  };

  return (
    <div className="container">
      <h1 className="title">게시글 쓰기</h1>
      {/* <table className={styles.table}> */}
      <table className={`${styles.table}`}>
        <tbody>
          <tr>
            <th>제목</th>
            <td>
              <input
                type="text"
                onChange={changeTitle}
                className={`${styles['form-input']}`}
              />
            </td>
          </tr>
          <tr>
            <th>작성자</th>
            <td>
              <input
                type="text"
                onChange={changeWriter}
                className={`${styles['form-input']}`}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <textarea
                rows={10}
                cols={40}
                onChange={changeContent}
                className={`${styles['form-input']}`}
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="btn-box">
        <Link to="/board" className="btn">
          목록
        </Link>
        <button className="btn" onClick={onSubmit}>
          등록
        </button>
      </div>
    </div>
  );
};

export default BoardInsertForm;
