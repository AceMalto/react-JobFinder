import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Jobs from './pages/Jobs'

function App() {

  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path='/' element={<Jobs/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
