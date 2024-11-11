import { useState } from 'react'

import './App.css'
import { Routes,Route } from 'react-router-dom'
import LandingPage from './LandingPage'
import LandingViewMore from './LandingViewMore'
import Categories from './Categories'
import Authentication from './Authentication'

function App() {
 

  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path='/categories' element={<Categories/>} />
      <Route path='/landingviewmore' element={<LandingViewMore/>} />
      <Route path="/login" element={<Authentication/>} />
      <Route path="/register" element={<Authentication insideRegister={true}/>} />
    </Routes>
     
    </>
  )
}

export default App
