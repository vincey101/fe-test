import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Farmerinfo from './components/farmerinfo/Farmerinfo.jsx'
import Bankdetails from './components/bankdetails/Bankdetails.jsx'
import Fingerprint from './components/fingerprint/Fingerprint.jsx'
import Farmreg from './components/farmreg/Farmreg.jsx'
import './app.scss'
import Verification from './pages/verification/Verification.jsx'
import Login from './pages/login/Login.jsx'


export default function App() {

  return (
    <div>

      <Router>
        <Routes>
          <>
            <Route path='/' element={<Farmerinfo  />} />
            <Route path='/bankdetails' element={<Bankdetails />} />
            <Route path='/security' element={<Fingerprint />} />
            <Route path='/farm' element={<Farmreg />} />
            <Route path='/verification' element={<Verification />} />
            <Route path='/login' element={<Login />} />


          </>

        </Routes>
      </Router>
    </div>

  )
}


