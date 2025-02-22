import React from 'react';
import { Link, useParams } from 'react-router-dom';

const BoardUpdateForm = () => {

  const { id } = useParams();

  return (
    <div className="container">
      <h1 className="title">게시글 수정</h1>
      <h3>번호 : {id}</h3>
      <table>
        <tr>
          <td>제목</td>
          <td>
            <input type="text" value={'제목1'} />
          </td>
        </tr>
        <tr>
          <td>작성자</td>
          <td>
            <input type="text" value={'작성자1'} />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <textarea rows={10} cols={100} value={'내용1'}></textarea>
          </td>
        </tr>
        <div className="btn-box">
          <Link to="/board" className="btn">
            목록
          </Link>
          <Link to={`/board/update/${id}`} className="btn">
            수정
          </Link>
        </div>
      </table>
    </div>
  )
};

export default BoardUpdateForm;
