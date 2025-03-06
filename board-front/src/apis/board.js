import axios from 'axios';
axios.defaults.baseURL = '/api'

// 목록 
export const list = () => axios.get('/board')

// 조회
export const select = (id) => axios.get(`/board/${id}`)

// 등록
// export const insert = (title, writer, content) => axios.post('/board', {title, writer, content}) 
export const insert = (formData, headers) => axios.post('/board', formData, headers) 

// 수정
export const update = (formData, headers) => axios.put(`/board`, formData, headers)

// 삭제
export const remove = (id) => axios.delete(`/board/${id}`)