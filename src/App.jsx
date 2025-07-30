import React from 'react'
import Landingpage from './vendorDashboard/pages/Landingpage'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import PageNotFOund from './vendorDashboard/components/PageNotFOund'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Landingpage/>}/>
        <Route path='/*' element={<PageNotFOund/>}/>
      </Routes>
      
      </div>
  )
}

export default App