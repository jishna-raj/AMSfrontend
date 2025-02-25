
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './components/Login'
import Register from './components/Register'
import ParentLogin from './components/ParentLogin'
import ParentReg from './components/ParentReg'
import HeroPage from './pages/HeroPage'
import LoginPage from './pages/LoginPage'
import { Route, Routes } from 'react-router-dom'
import Reg from './pages/Reg'

function App() {


  return (
    <>
  <Routes>
  <Route path='/' element={<HeroPage/>}/>
  <Route path='/user-login' element={<Login/>}/>
  <Route path='/admin-reg' element={<Reg admin/>} />
  <Route path='/admin-log' element={<LoginPage admin/>}/>
  <Route path='/reg-worker' element={<Reg/>}/>
  <Route path='/login-worker' element={<LoginPage/>}/>
  <Route path='/user-login' element={<Login/>}/>
  <Route path='/user-reg' element={<Register/>}/>
  <Route path='/parent-login' element={<ParentLogin/>}/>
  <Route path='/parent-register' element={<ParentReg/>}/>
  <Route path='/home' element={<Home/>}/>
 </Routes> 

 

    </>
  )
}

export default App
