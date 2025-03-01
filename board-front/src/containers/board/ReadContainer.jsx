import BoardRead from '../../components/board/BoardRead'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as boards from '../../apis/board'

const ReadContainer = () => {

  const { id } = useParams()

  const [board, setBoard] = useState({})

  // 게시글 데이터 요청 
  const getBoard = async () => {
    const response = await boards.select(id)
    const data = await response.data
    // console.log(`data : ${data}`)
    setBoard(data)
  }

  useEffect(() => {
    getBoard()
  }, [])

  return (
    <>
      <div>ReadContainer</div>
      <BoardRead board={board} />
    </>
  )
}

export default ReadContainer