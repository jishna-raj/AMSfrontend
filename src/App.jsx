
import './App.css'

import Home from './pages/Home'
import Login from './components/Login'

import ParentLogin from './components/ParentLogin'
import ParentReg from './components/ParentReg'
import HeroPage from './pages/HeroPage'
import LoginPage from './pages/LoginPage'
import { Route, Routes } from 'react-router-dom'
import Reg from './pages/Reg'
import AdminLayout from './pages/AdminLayout'

import UserManagement from './components/Admin/UserManagement'
import Dashboard from './components/Admin/Dashboard'
import InventoryManagement from './components/Admin/InventoryManagement'

import Staff from './components/Admin/Staff'
import Report from './components/Admin/report'

import Wadd from './components/workers/Wadd'
import Wupdate from './components/workers/Wupdate'
import Child from './components/Child/Child'
import ChildAdd from './components/Child/ChildAdd'
import DisplayChild from './components/Child/DisplayChild'
import ChildUpdate from './components/Child/ChildUpdate'
import Complaints from './components/Admin/Complaints'
import Health from './pages/HealthOfficial/Health'
import HealthComplaint from './pages/HealthOfficial/Healthcomplaint'
import WorkerDashboard from './pages/workerjob/WorkerDashboard'
import WorkerBB from './pages/workerjob/WorkerBB'

import Addpregnant from './pages/workerjob/pregnant/Addpregnant'
import Pregnant from './pages/workerjob/pregnant/Pregnant'
import Updatepregnant from './pages/workerjob/pregnant/Updatepregnant'
import Mother from './pages/workerjob/lactinating/Mother'
import AddMother from './pages/workerjob/lactinating/AddMother'
import UpdateMother from './pages/workerjob/lactinating/UpdateMother'
import ChildBAdd from './pages/workerjob/Children/childBadd'
import ChildBupdate from './pages/workerjob/Children/ChildBupdate'
import ChildManagement from './pages/workerjob/Children/ChildManagement'
import Notification from './pages/workerjob/Notification'
import ParentChild from './components/Child/ParentChild'
import BeneNotification from './pages/workerjob/BeneNotification'


function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<HeroPage />} />
        <Route path='/health-login' element={<Login />} />
        <Route path='/admin-reg' element={<Reg admin={true} />} />
        <Route path='/admin-log' element={<LoginPage admin={true} />} />
        <Route path='/reg-worker' element={<Reg />} />
        <Route path='/login-worker' element={<LoginPage />} />
        <Route path='/parent-login' element={<ParentLogin />} />
        <Route path='/parent-register' element={<ParentReg />} />
        <Route path='/home' element={<Home />} />

        {/* admin */}

        <Route path="/admin" element={<AdminLayout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<UserManagement />} />

        <Route path="/inventory" element={<InventoryManagement />} />


        <Route path='/staff' element={<Staff />} />
        <Route path='/reports' element={<Report />} />

        <Route path='/add-worker' element={<Wadd />} />
        <Route path='/update-worker/:id' element={<Wupdate />} />
        <Route path='/child/:id' element={<Child />} />
        <Route path='/display-child' element={<DisplayChild />} />
        <Route path='/add-child' element={<ChildAdd />} />
        <Route path='/update-child/:id' element={<ChildUpdate />} />

        <Route path='/parent-child/:id' element={<ParentChild />} />


        <Route path='/complaints' element={<Complaints />} />
        <Route path='/add-complaint' element={<HealthComplaint />} />
        <Route path='/health-page' element={<Health />} />

        <Route path='/worker-beneficiary' element={<WorkerBB />} />
        <Route path="/lactating" element={<Mother />} />
        <Route path="/pregnant" element={<Pregnant />} />
        <Route path='/add-pregnant' element={<Addpregnant />} />
        <Route path='/update-pregnant/:id' element={<Updatepregnant />} />
        <Route path='/add-lact' element={<AddMother />} />
        <Route path='/update-lact/:id' element={<UpdateMother />} />
        <Route path='/worker' element={<WorkerDashboard/>}/>
        <Route path='/message' element={<Notification/>}/>

        <Route path='/benemessage' element ={<BeneNotification/>}/>

        <Route path='/admin-beneficiary' element={<WorkerBB />} />
        <Route path='/child-beneficiary' element={<ChildManagement/>}/>
        <Route path='/add-childbeneficiary' element={<ChildBAdd/>}/>
        <Route path='/update-childbeneficiary/:id' element={<ChildBupdate/>}/>

        




      </Routes>
      {/* 
   <ChildManagement/> */}
      {/*  <ChildBupdate/> */}

      {/* <WorkerDashboard/> */}
      






    </>
  )
}

export default App
