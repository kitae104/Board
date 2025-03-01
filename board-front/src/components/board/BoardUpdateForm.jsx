import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './css/BoardUpdateForm.module.css';

const BoardUpdateForm = ({ board = {}, onUpdate, onDelete }) => {
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (board) {
      setTitle(board.title);
      setWriter(board.writer);
      setContent(board.content);
    }
  }, [board]);

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
    onUpdate(id, title, writer, content);
  };

  const handleDelete = () => {
    const check = window.confirm('정말 삭제하시겠습니까?');
    if (check) {
      onDelete(id);
    }
  };

  return (
    <div className="container">
      <h1 className="title">게시글 수정</h1>
      <h3>번호 : {id}</h3>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th>제목</th>
            <td>
              <input
                type="text"
                value={title || ''}
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
                value={writer || ''}
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
                value={content || ''}
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
        <div>
          <button onClick={onSubmit} className="btn">
            수정
          </button>          
          <button onClick={handleDelete} className="btn">
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardUpdateForm;
