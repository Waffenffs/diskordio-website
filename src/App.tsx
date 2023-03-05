import './App.css'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './firebaseConfig'
import { Routes, Route } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import LandingPage from './Pages/LandingPage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import { getFirestore} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Diskordio from './Pages/Diskordio'

// initialize firebase
export const app = initializeApp(firebaseConfig)

// initialize firebase authentication
export const auth = getAuth(app)

// initialize firestore
export const db = getFirestore(app)


export default function App() {
  const navigate = useNavigate()

  const [user, setUser] = useState<any | null>(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        // user is signed in
        setUser(user)

        setTimeout(() => {
          navigate('main')
        }, 1000);
      } else {
        // user is signed out
      }
    })
  }, [])

  return(
    <>
    
    <Routes>
      <Route path='/' element={ <LandingPage /> } />
      <Route path='/login' element={ <LoginPage auth={auth} db={db} /> } />
      <Route path='/register' element={ <RegisterPage auth={auth} db={db} /> } />
      <Route path='/main' element={ <Diskordio user={user} db={db} /> }/>
    </Routes>
    </>
  )
}