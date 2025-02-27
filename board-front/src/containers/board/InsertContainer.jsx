import React from 'react'
import BoardInsertForm from '../../components/board/BoardInsertForm'
import * as boards from '../../apis/board'
import { useNavigate } from 'react-router-dom'

const InsertContainer = () => {

  const navigate = useNavigate()

  // 게시글 등록
  const onInsert = async (title, writer, content) => {
    try{
      const response = await boards.insert(title, writer, content)
      const data = await response.data
      console.log(`data : ${data}`)
      alert('게시글이 등록되었습니다.')
      // 게시글 목록으로 이동
      navigate('/board')
    } catch(e) {
      console.log(`error : ${e}`)
    }
  }

  return (
    <>
      <div>InsertContainer</div>
      <BoardInsertForm onInsert={onInsert} />
    </>
  )
}

export default InsertContainer