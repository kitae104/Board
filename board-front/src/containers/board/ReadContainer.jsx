import BoardRead from '../../components/board/BoardRead';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as boards from '../../apis/board';
import * as files from '../../apis/files';

const ReadContainer = () => {
  const { id } = useParams();

  const [board, setBoard] = useState({});
  const [mainFile, setMainFile] = useState();
  const [fileList, setFileList] = useState([]);

  // 게시글 데이터 요청
  const getBoard = async () => {
    const response = await boards.select(id);
    const data = await response.data; // 서버에서 Map 형태로 전달 받음
    // console.log(`data : ${data}`)
    setBoard(data.board);
    setFileList(data.fileList);
  };

  // 다운로드
  const onDownload = async (id, fileName) => {
    // 1. API 호출
    const response = await files.download(id);
    console.log(response);

    // 2. 서버에서 응답 파일데이터를 받은 Blob 변환
    const url = window.URL.createObjectURL(new Blob([response.data]));

    // 3. 브라우저를 통해 a 태그로 등록
    // <a href="data" download="파일명.png"></a>
    const link = document.createElement('a'); // a 태그 생성
    link.href = url; // 다운로드 경로 설정
    link.setAttribute('download', fileName); // 다운로드 파일명 설정
    document.body.appendChild(link); // body에 추가
    link.click(); // 클릭 이벤트 발생
    document.body.removeChild(link); // body에서 제거
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <>
      <div>ReadContainer</div>
      <BoardRead board={board} fileList={fileList} onDownload={onDownload} />
    </>
  );
};

export default ReadContainer;
