import { GiFiles } from "react-icons/gi";
import { SiFiles } from "react-icons/si";
import { FaCircle } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import OrgCard from "../component/OrgCard";
import { IoGrid } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useMyStore } from "../store/myStore";
import { supabase } from "../../supabaseConfig";
import { IoCloseSharp } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProjectCard from "../component/ProjectCard";

const UserManagement = () => {
    let [userList, setUserList] = useState([]);
    let [loading, setLoading] = useState(false);
    let [popup, setPopup] = useState(false);
    let [initialProjectName, setInitialProjectName] = useState(true);
    let [projectName, setProjectName] = useState('');
    let [search, setSearch] = useState('');
    let [refresh, setRefresh] = useState(0);
    const navigate = useNavigate();
    const { orgId, teamId } = useParams();
    // const {userid, refresh, setRefresh} = useMyStore();
    const {userid} = useMyStore();

    useEffect(() => {
      getUserData();
    }, [refresh]);

    const createNewProject = async() => {
      try 
      {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('t_sys_teams')
          .insert({project_name: projectName, project_desc: '', org_id: orgId, created_by: userid, status: 1, modified_date: new Date().toISOString(), marks: 0})
          .select()

        if(error)
        {
          setLoading(false);
          setPopup(false);
          throw error;
        }

        if(data.length > 0)
        {
          setPopup(false);
          setRefresh(() => refresh = refresh + 1);
        }
          
      }
      catch(ex)
      {
        console.log('Error Occured At createNewProject: '+ex.message);
      }
      finally
      {
        clearForm();
        setLoading(false);
      }
    }

    const clearForm = () => {
      setProjectName('');
    }

    const getUserData = async() => {
      try
      {
        setLoading(true);

        let { data: t_sys_users, error } = await supabase
          .from('t_sys_users')
          .select('*')
          

        if(error)
        {
          setLoading(false);
          throw error;
        }

        if(t_sys_users.length > 0)
        {
          setUserList(t_sys_users);
        }
        else
        {
          setUserList([]);
        }

      }
      catch(ex)
      {
        console.log('Error Occured At getUserData: '+ex.message);
      }
      finally
      {
        setLoading(false);
      }
    }

    const filteredOrg = userList.filter((org) =>
      org.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div style={{width:'100%', height: '100vh'}}>
              <div style={{width:'100%'}}>
                  <div style={{paddingInline:60, paddingTop:24}}>
                    <h2 style={{fontSize:24}}>Manage My Users</h2>
                    <div style={{ marginTop: '12px', gap: '8px', display: 'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid #00000020', paddingBottom:'16px' }}>
                      <div> 
                          <h2 style={{fontSize:18, fontWeight:400}}>All Users: {userList.length}</h2>
                      </div>
                      <div style={{gap: '8px', display: 'flex' }}>
                        <div style={{ position: 'relative' }}>
                          <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search Here..." style={{ width: '320px', paddingLeft: '28px', paddingRight: '12px', paddingBlock: '12px', border: '1px solid #00000036', borderRadius: '10px', boxShadow: '0 2px 2px rgba(0, 0, 0, 0.05)', marginBlock: '8px', cursor: 'pointer' }} />
                          <CiSearch color="#00000090" style={{ position: 'absolute', left: 8, top: '36%' }} />
                        </div>
                        <button onClick={() => setPopup(true)} style={{ paddingInline: '20px', paddingBlock: '12px', border: '1px solid #00000036', backgroundColor:'black', color:'white', borderRadius: '10px', boxShadow: '0 2px 2px rgba(0, 0, 0, 0.05)', marginBlock: '8px', cursor: 'pointer' }}>Create User</button>
                      </div>
                  </div>

                  <div style={{marginTop:24}}>
                    {/* header */}
                    <div style={{display:'flex', gap:12, border:'1px solid #00000026', backgroundColor:'#00000012', borderRadius:8, paddingBlock:12, paddingInline:12}}> 
                        <div style={{width:'320px'}}>
                          <h2 style={{fontSize:12, fontWeight:400, borderRight:'1px solid #00000036'}}>Username</h2>
                        </div>
                        <div style={{width:'120px'}}>
                          <h2 style={{fontSize:12, fontWeight:400}}>Created From</h2>
                        </div>
                    </div>
                    {/* body */}
                    <div style={{ height: '60vh', overflowY: 'auto' }}>
                    {
                      filteredOrg.map((val, ind) => {
                        return (
                          <div style={{display:'flex', gap:12, borderBottom:'1px solid #00000026', paddingBlock:8, paddingInline:12}}> 
                            <div style={{width:'320px', display:'flex', gap:8, alignItems:'center'}}>
                                <div style={{marginBlock:'4px', boxShadow:'0 1px 4px rgba(0, 0, 0, 0.3)', fontSize:'10px', color:'white', background:'purple', fontWeight:600, width:'30px', height:'30px', border:'2px solid #ffffff', borderRadius:'120', display:'flex', justifyContent:'center', alignItems:'center', borderRadius:'120px'}}>
                                  {val.name.split(' ').length > 1 ? val.name.split(' ')[0][0]+val.name.split(' ')[1][0]: val.name[0]}
                                </div>
                                <div style={{display:'flex', flexDirection:'column'}}>
                                  <h2 style={{fontSize:12, fontWeight:400}}>{val.name}</h2>
                                  <h2 style={{fontSize:10, fontWeight:400, color:'#00000078'}}>{val.email}</h2>
                                </div>
                            </div>
                            <div style={{width:'120px'}}>
                            </div>
                        </div>
                        )
                      })
                    }
                    </div>
                  </div>
                </div>
              </div>


        </div>
    )
}

export default UserManagement