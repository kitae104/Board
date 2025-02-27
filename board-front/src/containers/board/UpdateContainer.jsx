import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as boards from '../../apis/board'
import BoardUpdateForm from '../../components/board/BoardUpdateForm'


const UpdateContainer = () => {

  const { id } = useParams()

  const [board, setBoard] = useState({})

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
    setBoard(data)
  }

  useEffect(() => {
    getBoard()
  }, [])

  return (
    <>
      <div>UpdateContainer</div>
      <BoardUpdateForm board={board} 
                        onUpdate={onUpdate}
                        onDelete={onDelete}/>
    </>
  )
}

export default UpdateContainer