import './App.css'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './firebaseConfig'
import { Routes, Route } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import LandingPage from './Pages/LandingPage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'

// initialize firebase
export const app = initializeApp(firebaseConfig)

// initialize firebase authentication
export const auth = getAuth(app)

export default function App() {
  return(
    <>
    
    <Routes>
      <Route path='/' element={ <LandingPage /> } />
      <Route path='/login' element={ <LoginPage /> } />
      <Route path='/register' element={ <RegisterPage /> } />
    </Routes>
    </>
  )
}