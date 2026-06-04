import React from 'react'
import { Routes, Route } from 'react-router';
import Homepage from './pages/Homepage';
import CreatePage from './pages/CreatePage';
import NoteDetailPage from './pages/NoteDetailPage';
import './index.css';
import LoginPage from "./pages/LoginPage";
import SignupPage from './pages/SignupPage';  

const App =   () => {
  return (
    <div className="relative h-full w-full">

      <div className="absolute inset-0 -z-10 h-full w-full item-center px-5 py-24 [background:radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#00FF9D]/20 to-[#00FF9D]/5">

      </div>
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        
      </Routes>
    </div>
  )
}

export default App