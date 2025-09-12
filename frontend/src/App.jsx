import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/profilePage'
import Settings from './pages/Settings'
import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import { useAuthStore } from './store/userAuthStore'
import { useEffect } from 'react'
import {Loader} from 'lucide-react'

import { Toaster } from 'react-hot-toast'


const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser })

  if(isCheckingAuth && !authUser) return(
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin" />
    </div>
  )

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to ="/login" />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/"/>} />
        <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/" />} />
        <Route path="/profile" element={ authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/settings" element={<Settings />} />
       
       {/* Not found page */}
        <Route path="*" element={<h1>404 Not Found!</h1>} />
      </Routes>
      <Toaster />

    </div>
  )
}

export default App
