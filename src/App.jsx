import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Farmerinfo from './components/farmerinfo/Farmerinfo.jsx'
import Bankdetails from './components/bankdetails/Bankdetails.jsx'
import Fingerprint from './components/fingerprint/Fingerprint.jsx'
import Farmreg from './components/farmreg/Farmreg.jsx'
import './app.scss'
// import Demo from './components/stepper/Stepper.jsx'


export default function App() {
  return (
    <div>

      <Router>
        <Routes>
          <>
            <Route path='/' element={<Farmerinfo />} />
            <Route path='/bankdetails' element={<Bankdetails />} />
            <Route path='/security' element={<Fingerprint />} />
            <Route path='/farm' element={<Farmreg />} />


          </>

        </Routes>
      </Router>
    </div>

  )
}


