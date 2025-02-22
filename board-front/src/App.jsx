import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Insert from './pages/board/Insert'
import List from './pages/board/List'
import Read from './pages/board/Read'
import Update from './pages/board/Update'
import Home from './pages/Home'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board" element={<List />} />
        <Route path="/board/:id" element={<Read />} />
        <Route path="/board/insert" element={<Insert />} />
        <Route path="/board/update/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
