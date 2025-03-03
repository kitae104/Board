import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './css/BoardUpdateForm.module.css';
import * as format from '../../utils/format';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Checkbox from '@mui/material/Checkbox';

const BoardUpdateForm = ({
  board = {},
  onUpdate,
  onDelete,
  fileList,
  onDownload,
  onDeleteFile,
  deleteCheckedFiles
}) => {
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [content, setContent] = useState('');
  const [fileIdList, setFileIdList] = useState([]); // 선택 삭제 id 리스트 

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
    const check = window.confirm('정말 게시글을 삭제하시겠습니까?');
    if (check) {
      onDelete(id);
    }
  };

  const handleFileDelete = (id) => {
    const check = window.confirm('정말 파일을 삭제하시겠습니까?');
    if (check) {
      onDeleteFile(id);
    }
  };

  const handleCheckedFileDelete = () => {
    const check = window.confirm(`선택한 ${fileIdList.length}개의 파일을 삭제하시겠습니까?`);
    if (check) {
      deleteCheckedFiles(fileIdList) 
    }
  }

  // 체크 박스 클릭 핸들러 
  const checkFileId = (id) => {
    if (fileIdList.includes(id)) {
      setFileIdList(fileIdList.filter((fileId) => fileId !== id));
    } else {
      setFileIdList([...fileIdList, id]);
    }    
  }

  useEffect(() => {
    if (board) {
      setTitle(board.title);
      setWriter(board.writer);
      setContent(board.content);
    }
  }, [board]);

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
          <tr>
            <td colSpan={2}>
              {fileList.map((file) => (
                <div key={file.id} className="flex-box">
                  <div className="item">
                    <Checkbox onClick={()=> checkFileId(file.id)} />
                    <img
                      src={`/api/file/img/${file.id}`}
                      alt={file.originName}
                      className="file-img"
                    />
                    <span>
                      {file.originName} ({format.byteToUnit(file.fileSize)})
                    </span>
                  </div>
                  <div className="item">
                    <button
                      className="btn"
                      onClick={() => onDownload(file.id, file.originName)}
                    >
                      <DownloadIcon />
                    </button>
                    <button
                      className="btn"
                      onClick={() => handleFileDelete(file.id)}
                    >
                      <DeleteForeverIcon />
                    </button>
                  </div>
                </div>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="btn-box">
        <div>
          <Link to="/board" className="btn">
            목록
          </Link>
          <button className='btn' onClick={handleCheckedFileDelete}>선택 삭제</button>
        </div>
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
