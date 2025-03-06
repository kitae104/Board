import axios from 'axios';

// 파일 다운로드
export const download = (id) =>
  axios.get(`/file/download/${id}`, { responseType: 'blob' });

// 파일 삭제
export const remove = (id) => axios.delete(`/file/${id}`);

// 파일 선택 삭제
export const removeFiles = (idList) =>
  axios.delete(`/file`, { data: idList });

// 타입별 파일 목록 조회
export const fileByType = (parentTable, parentId, type) =>
  axios.get(`/file/${parentTable}/${parentId}?type=${type}`);
