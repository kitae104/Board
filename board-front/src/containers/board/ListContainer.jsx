import React, { useEffect, useState } from 'react'
import BoardList from '../../components/board/BoardList'
import * as board from '../../apis/board'

const ListContainer = () => {

  // boardList state 선언 
  const [boardList, setBoardList] = useState([])
  const [pageInfo, setPageInfo] = useState({})

  // 게시글 목록 데이터 
  const getList = async () => {
    const response = await board.list()
    const data = await response.data    
    const content = data.content
    const pageInfo = data
    console.dir(content)
    console.dir(pageInfo)

    setBoardList(content)  
    setPageInfo(pageInfo)
  }

  // 컴포넌트가 마운트 되었을 때 게시글 목록 데이터를 가져옴
  useEffect(() => {
    getList()
  }, [])

  return (
    <>
      <div>ListContainer</div>
      <BoardList boardList={boardList} pageInfo={pageInfo}/>
    </>
    
  )
}

export default ListContainer