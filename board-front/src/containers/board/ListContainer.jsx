import React, { useEffect, useState } from 'react';
import BoardList from '../../components/board/BoardList';
import * as board from '../../apis/board';
import { useLocation } from 'react-router-dom';

const ListContainer = () => {
  // boardList state 선언
  const [boardList, setBoardList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

  // ?파라미터=값 가져오는 방법
  const location = useLocation();

  const updatePage = () => {
    const query = new URLSearchParams(location.search);
    const newPage = query.get('page') ?? 1;
    const newSize = query.get('size') ?? 5;
    // console.log(`newPage : ${newPage}`);
    // console.log(`newSize : ${newSize}`);
    setPage(newPage);
    setSize(newSize);
  };

  // 게시글 목록 데이터
  const getList = async () => {
    const response = await board.list(page, size);
    const data = await response.data;
    const content = data.content;
    const pageInfo = data;
    // console.dir(content);
    console.dir(pageInfo);

    setBoardList(content);
    setPageInfo(pageInfo);
  };

  // 컴포넌트가 마운트 되었을 때 게시글 목록 데이터를 가져옴
  useEffect(() => {
    getList();
  }, [page, size]); // page, size 값이 변경될 때마다 호출

  useEffect(() => {
    updatePage();
  }, [location.search]);

  return (
    <>
      <div>ListContainer</div>
      <BoardList boardList={boardList} pageInfo={pageInfo} />
    </>
  );
};

export default ListContainer;
