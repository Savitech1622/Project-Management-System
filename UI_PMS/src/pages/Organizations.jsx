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

const Organizations = () => {
    let [orgList, setOrgList] = useState([]);
    let [loading, setLoading] = useState(false);
    let [popup, setPopup] = useState(false);
    let [initialOrgName, setInitialOrgName] = useState(true);
    let [orgName, setOrgName] = useState('');
    let [search, setSearch] = useState('');
    let [refresh, setRefresh] = useState(0);
    const navigate = useNavigate();

    // const {userid, refresh, setRefresh} = useMyStore();
    const {userid, setOrgTitle} = useMyStore();

    useEffect(() => {
      getOrgData();
    }, [refresh]);

    const createNewOrg = async() => {
      try 
      {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('t_sys_orgs')
          .insert({orgname: orgName, created_by: userid, teamcount: 0})
          .select()

        if(error)
        {
          setLoading(false);
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
        console.log('Error Occured At createNewOrg: '+ex.message);
      }
      finally
      {
        clearForm();
        setLoading(false);
      }
    }

    const clearForm = () => {
      setOrgName('');
    }

    const getOrgData = async() => {
      try
      {
        setLoading(true);

        let { data: t_sys_orgs, error } = await supabase
        .from('t_sys_orgs')
        .select('*').eq('created_by', userid);

        if(error)
        {
          setLoading(false);
          throw error;
        }

        if(t_sys_orgs.length > 0)
        {
          setOrgList(t_sys_orgs);
        }
        else
        {
          setOrgList([]);
        }

      }
      catch(ex)
      {
        console.log('Error Occured At getOrgData: '+ex.message);
      }
      finally
      {
        setLoading(false);
      }
      
    }

    const filteredOrg = orgList.filter((org) => 
        org.orgname.toLowerCase().includes(search.toLowerCase())
    )

    const handleOrgClick = (orgId, orgName) => {
      setOrgTitle(orgName);
      navigate(`/workspace/org/${orgId}`);
    };

    const handleUserClick = (orgId) => {
      navigate(`/workspace/manageuser`);
    };

    return (
        <div style={{width:'100%', height:'100vh'}}>
              {/* popup start */}
            {popup && <div style={{display:'flex', justifyContent:'center', alignItems:'start', width:'100%',position:'absolute', zIndex:99, height:'100vh', backgroundColor:'#00000036', backdropFilter:'blur(2px)'}}>
                  <div style={{width:'40%', height:'500px', borderRadius:'12px', marginTop:48, position:'relative', boxShadow:'0 0 2px #00000036', backgroundColor:'white'}}>
                      <div style={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', paddingBlock:'22px', paddingInline:'22px', borderBottom:'1px solid #00000036'}}>
                        <h2 style={{fontSize:24}}>Create Organizations</h2>
                        <button onClick={() => {setPopup(false); setInitialOrgName(true)}} style={{border:'none', cursor:'pointer', background:'none'}}>
                          <IoCloseSharp size={28}/>
                        </button>
                      </div>

                      <div style={{paddingBlock:'22px', paddingInline:'22px',}}>
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <label htmlFor="">Organization Name</label>
                                <input value={orgName} onChange={(e) => {setOrgName(e.target.value); (e.target.value.length > 0 && setInitialOrgName(false))}} placeholder="Enter your Organization Name" type="text" style={{ paddingInline: 12, paddingBlock: 12, borderRadius: 8, border: '2px solid rgba(0, 0, 0, 0.13)' }} />
                                {
                                    !initialOrgName && orgName.length === 0 &&
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <FaInfoCircle color="red" />
                                        <p style={{ color: 'red' }}>Please enter organization name</p>
                                    </div>
                                }
                            </div>
                      </div>

                      <div style={{width:'100%', display:'flex', position:'absolute', bottom:0, justifyContent:'end', alignItems:'center', paddingBlock:'22px', paddingInline:'22px', borderTop:'1px solid #00000036'}}>
                        <div style={{display:'flex', gap:'12px'}}>
                          <button onClick={() => {setPopup(false); setInitialOrgName(true)}} style={{paddingInline:'20px', paddingBlock:'12px', border:'1px solid #00000036', borderRadius:'10px', boxShadow:'0 2px 2px rgba(0, 0, 0, 0.05)', marginBlock:'8px', cursor:'pointer'}}>Cancel</button>
                          <button onClick={() => createNewOrg()} style={{paddingInline:'20px', color:'white', backgroundColor:'black', paddingBlock:'12px', border:'1px solid #00000036', borderRadius:'10px', boxShadow:'0 2px 2px rgba(0, 0, 0, 0.05)', marginBlock:'8px', cursor:'pointer'}}>Create</button>
                        </div>
                      </div>

                  </div>
              </div>
              }
            {/* popup end */}
            <div style={{display:'flex', width:'100%'}}>
              <div style={{width:'100%'}}>
                  <div style={{paddingInline:60, paddingTop:24}}>
                    <h2 style={{fontSize:24}}>Your Organizations</h2>

                    <div style={{marginTop:'12px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom: '1px solid rgba(0, 0, 0, 0.10)', paddingBottom:'16px'}}>
                      <div style={{gap:'8px', display:'flex'}}>
                        <button onClick={() => setPopup(true)}  style={{paddingInline:'20px', paddingBlock:'12px', border:'1px solid #00000036', borderRadius:'10px', boxShadow:'0 2px 2px rgba(0, 0, 0, 0.05)', marginBlock:'8px', cursor:'pointer'}}>Create New Organization</button>
                        <div style={{position:'relative'}}>
                          <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search Here..." style={{width:'320px', paddingLeft:'28px', paddingRight:'12px', paddingBlock:'12px', border:'1px solid #00000036', borderRadius:'10px', boxShadow:'0 2px 2px rgba(0, 0, 0, 0.05)', marginBlock:'8px', cursor:'pointer'}} />
                          <CiSearch color="#00000090" style={{position:'absolute', left:8, top:'36%'}}/>
                        </div>
                      </div>
                      <button onClick={() => handleUserClick()} style={{paddingInline:'20px', paddingBlock:'12px', border:'1px solid #00000036', borderRadius:'10px', boxShadow:'0 2px 2px rgba(0, 0, 0, 0.05)', marginBlock:'8px', cursor:'pointer'}}>Manage User</button>
                    </div>

                    <div style={{display:'flex', flexWrap:'wrap', gap:'12px', marginTop:'20px'}}>
                      {
                        filteredOrg?.map((val, ind) => {
                          return (
                            <>
                              <div onClick={() => handleOrgClick(val.id, val.orgname)} style={{cursor:'pointer'}}>
                                <OrgCard title={val.orgname} count={val.teamcount}/>
                              </div>
                            </>
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

export default Organizations