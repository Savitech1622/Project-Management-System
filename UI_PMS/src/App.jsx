
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseConfig';
import { useMyStore } from './store/myStore';
import Login from './pages/Login';
import { Route, Router, Routes } from 'react-router-dom';
import Workspace from './pages/Workspace';
import ChangePassword from './pages/ChangePassword';
import Register from './pages/Register';
import OrgDetails from './pages/OrgDetails';
import Organizations from './pages/Organizations';
import OrgDetailsTeam from './pages/OrgDetails';
import TeamDetails from './pages/TeamDetails';
import UserManagement from './pages/UserManagement';
function App() {
 
  let [title, setTitle] = useState('')

  const getData = async () => {
    let { data: t_sys_config, error } = await supabase
      .from('t_sys_config')
      .select('*')

      setTitle(t_sys_config[0].title)
  }

  useEffect(() => {
    getData();
  }, [])



  return (
    <>
     <Routes>
        <Route path='/' element={<Login/>}/>
         <Route path="/" element={<Workspace />}>
            <Route path="/workspace" element={<Organizations />} />
            <Route path="/workspace/org/:orgId" element={<OrgDetails />} />  
            <Route path="/workspace/org/:orgId/manageuser" element={<UserManagement />} />  
            <Route path="/workspace/org/:orgId/team/:teamId" element={<TeamDetails />} />  
         </Route>
        <Route path='/changepassword' element = {<ChangePassword />}/>
        <Route path='/register' element = {<Register />}/>
     </Routes>
    </>
  )
}

export default App
