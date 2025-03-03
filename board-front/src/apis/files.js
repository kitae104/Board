import axios from 'axios';

export const download = (id) => axios.get(`/file/download/${id}`, { responseType: 'blob' });