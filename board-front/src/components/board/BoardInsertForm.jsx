import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './css/BoardInsertForm.module.css';

const BoardInsertForm = ({ onInsert }) => {
  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [content, setContent] = useState('');
  const [mainFile, setMainFile] = useState(null)  
  const [files, setFiles] = useState(null);

  const changeTitle = (e) => {
    setTitle(e.target.value); // 제목 변경
  };

  const changeWriter = (e) => {
    setWriter(e.target.value); // 작성자 변경
  };

  const changeContent = (e) => {
    setContent(e.target.value); // 내용 변경
  };

  const changeMainFile = (e) => {
    setMainFile(e.target.files[0]); // 파일 정보 저장
  }

  // 파일 변경 핸들러 
  const changeFile = (e) => {
    setFiles(e.target.files); // 파일 정보 저장    
  };

  const onSubmit = () => {
    // 파일 업로드  -> multipart/form-data 변경    
    const formData = new FormData();  // FormData 객체 생성
    // 게시글 정보 설정 
    formData.append('title', title);  // 제목 추가
    formData.append('writer', writer);  // 작성자 추가
    formData.append('content', content);  // 내용 추가
    
    // 파일 정보 설정    
    if( mainFile ) {
      formData.append('mainFile', mainFile)
    }
    
    if(files) {
      for(let i = 0; i < files.length; i++) {
        const file = files[i];
        formData.append('fileList', file);  // 파일 추가
      }
    }
    
    // 헤더 설정
    const headers = {
      'Content-Type': 'multipart/form-data'  // 파일 업로드 설정
    };
    
    onInsert(formData, headers);  // multipart/form-data 방식
    //onInsert(title, writer, content); // application/json 방식

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
          <tr>
            <th>대표 이미지</th>
            <td>
              <input type="file" onChange={changeMainFile} />
            </td>
          </tr>
          <tr>
            <th>첨부 파일</th>
            <td>
              <input type="file" multiple onChange={changeFile} />
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
