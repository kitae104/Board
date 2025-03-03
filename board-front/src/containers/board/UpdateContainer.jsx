import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as boards from '../../apis/board'
import * as files from '../../apis/files';
import BoardUpdateForm from '../../components/board/BoardUpdateForm'


const UpdateContainer = () => {

  const { id } = useParams()

  // 상태값 정의
  const [board, setBoard] = useState({})
  const [mainFile, setMainFile] = useState();
  const [fileList, setFileList] = useState([]);

  const navigate = useNavigate()

  // 게시글 수정
  const onUpdate = async (id, title, writer, content) => {
    try{
      const response = await boards.update(id, title, writer, content)
      const data = await response.data
      console.log(`data : ${data}`)
      alert('게시글이 수정되었습니다.')
      // 게시글 목록으로 이동
      navigate('/board')
    } catch(e) {
      console.log(`error : ${e}`)
    }
  }

  // 게시글 삭제  
  const onDelete = async (id) => {
    try{
      const response = await boards.remove(id)
      const data = await response.data
      console.log(`data : ${data}`)
      alert('게시글이 삭제되었습니다.')
      // 게시글 목록으로 이동
      navigate('/board')
    } catch(e) {
      console.log(`error : ${e}`)
    }
  }

  // 게시글 데이터 요청 
  const getBoard = async () => {
    const response = await boards.select(id)
    const data = await response.data
    console.log(`data : ${data}`)
    setBoard(data.board)        // 게시글 데이터
    setFileList(data.fileList); // 파일 데이터
  }

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

  // 파일 삭제 
  const onDeleteFile = async (fileId) => {
    try{
      // 파일 삭제 요청 
      const fileResponse = await files.remove(fileId)
      console.log(fileResponse.data)

      // 요청 성공 여부 체크 

      // 파일 목록 갱신
      const boardResponse = await boards.select(id)
      const data = await boardResponse.data
      const fileList = data.fileList
      setFileList(fileList)
      

    } catch(error) {
      console.log(`error : ${error}`)
    }
  }

  // 선택 삭제 요청 
  const deleteCheckedFiles = async (idList) => {
    console.log("여기", idList)
    try{
      // 파일 선택 삭제 요청 
      const fileResponse = await files.removeFiles(idList)
      console.log(fileResponse.data)

      // 요청 성공 여부 체크 

      // 파일 목록 갱신
      const boardResponse = await boards.select(id)
      const data = await boardResponse.data
      const fileList = data.fileList
      setFileList(fileList)
    } catch(error) {
      console.log(`error : ${error}`)
    }
  }

  useEffect(() => {
    getBoard()
  }, [])

  return (
    <>
      <div>UpdateContainer</div>
      <BoardUpdateForm board={board} 
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                        fileList={fileList} 
                        onDownload={onDownload}
                        onDeleteFile={onDeleteFile}
                        deleteCheckedFiles={deleteCheckedFiles}
                        />
    </>
  )
}

export default UpdateContainer