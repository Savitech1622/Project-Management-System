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

const OrgDetails = () => {
  let [orgList, setOrgList] = useState([]);
  let [guideList, setGuideList] = useState([]);
  let [userTeamList, setUserTeamList] = useState([]);
  let [loading, setLoading] = useState(false);
  let [popup, setPopup] = useState(false);
  let [initialProjectName, setInitialProjectName] = useState(true);
  let [projectName, setProjectName] = useState('');
  let [guide, setGuide] = useState(0);
  let [userTeam, setUserTeam] = useState(0);
  let [search, setSearch] = useState('');
  let [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();
  const { orgId } = useParams();
  // const {userid, refresh, setRefresh} = useMyStore();
  const { userid } = useMyStore();

  useEffect(() => {
    getTeamData();
    getGuideData();
    getUserTeamData();
  }, [refresh]);

  const createNewProject = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('t_sys_teams')
        .insert({ project_name: projectName, project_desc: '', org_id: orgId, created_by: userid, status: 1, modified_date: new Date().toISOString(), marks: 0, guide: guide, userteam: userTeam })
        .select()

      if (error) {
        setLoading(false);
        setPopup(false);
        throw error;
      }

      if (data.length > 0) {
        setPopup(false);
        setRefresh(() => refresh = refresh + 1);
      }

    }
    catch (ex) {
      console.log('Error Occured At createNewProject: ' + ex.message);
    }
    finally {
      clearForm();
      setLoading(false);
    }
  }

  const clearForm = () => {
    setProjectName('');
  }

  const getGuideData = async() => {
    try
    {
      setLoading(true);

      let { data: t_sys_users, error } = await supabase
        .from('t_sys_users')
        .select('*').eq('role', 'guide')

      if(error)
      {
        setLoading(false);
        throw error;
      }

      if(t_sys_users.length > 0)
      {
        setGuideList(t_sys_users);
      }
      else
      {
        setGuideList([]);
      }

    }
    catch(ex)
    {
      console.log('Error Occured At getGuideData: '+ex.message);
    }
    finally
    {
      setLoading(false);
    }
  }

  const getUserTeamData = async() => {
    try
    {
      setLoading(true);

      let { data: t_sys_user_team, error } = await supabase
        .from('t_sys_user_team')
        .select('*').eq('approved', true)

      if(error)
      {
        setLoading(false);
        throw error;
      }

      if(t_sys_user_team.length > 0)
      {
        setUserTeamList(t_sys_user_team);
      }
      else
      {
        setUserTeamList([]);
      }

    }
    catch(ex)
    {
      console.log('Error Occured At getUserTeamData: '+ex.message);
    }
    finally
    {
      setLoading(false);
    }
  }

  const getTeamData = async () => {
    try {
      setLoading(true);

      let { data: t_sys_teams, error } = await supabase
        .from('t_sys_teams')
        .select(`*, guide_user: guide(id, name)`).eq('org_id', orgId);

      if (error) {
        setLoading(false);
        throw error;
      }

      if (t_sys_teams.length > 0) {
        setOrgList(t_sys_teams);
      }
      else {
        setOrgList([]);
      }

    }
    catch (ex) {
      console.log('Error Occured At getTeamData: ' + ex.message);
    }
    finally {
      setLoading(false);
    }

  }

  const filteredOrg = orgList.filter((org) =>
    org.project_name.toLowerCase().includes(search.toLowerCase())
  )

  const handleOrgClick = (teamID, orgName) => {
    navigate(`/workspace/org/${orgId}/team/${teamID}`);
  };

  return (
    <div style={{ width: '100%', height: '100vh'}}>
      {/* popup start */}
      {popup && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'start', width: '100%', position: 'absolute', zIndex: 99, height: '100vh', backgroundColor: '#00000036', backdropFilter: 'blur(2px)' }}>
        <div style={{ width: '40%', height: '500px', borderRadius: '12px', marginTop:48,marginLeft:-52,  position: 'relative', boxShadow: '0 0 2px #00000036', backgroundColor: 'white' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBlock: '22px', paddingInline: '22px', borderBottom: '1px solid #00000036' }}>
            <h2 style={{ fontSize: 24 }}>Create Team</h2>
            <button onClick={() => { setPopup(false); setInitialProjectName(true) }} style={{ border: 'none', cursor: 'pointer', background: 'none' }}>
              <IoCloseSharp size={28} />
            </button>
          </div>

          <div style={{ paddingBlock: '22px', paddingInline: '22px', }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label htmlFor="" style={{fontSize:14}}>Project Name</label>
              <input value={projectName} onChange={(e) => { setProjectName(e.target.value); (e.target.value.length > 0 && setInitialProjectName(false)) }} placeholder="Enter your Project Name" type="text" style={{ paddingInline: 12, paddingBlock: 12, borderRadius: 8, border: '2px solid rgba(0, 0, 0, 0.13)' }} />
              {
                !initialProjectName && projectName.length === 0 &&
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FaInfoCircle color="red" />
                  <p style={{ color: 'red' }}>Please enter project name</p>
                </div>
              }
            </div>

            <div style={{ width: '100%', marginTop:16, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label htmlFor="" style={{fontSize:14}}>Assign Guid</label>
              <select
                id="guid-select"
                value={guide}
                onChange={(e) => {
                  setGuide(e.target.value);
                }}
                style={{
                  paddingInline: 16,
                  paddingBlock: 12,
                  borderRadius: 8,
                  border: '2px solid rgba(0, 0, 0, 0.13)',
                  fontSize: 14,
                }}
              >
                <option value="">-- Assign a guid --</option>
                {
                  guideList.map((val, ind) => {
                    return (
                      <option value={val.id}>
                        {val.name}
                      </option>
                    )
                  })
                }
               
              </select> 
            </div>

            <div style={{ width: '100%', marginTop:16, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label htmlFor="" style={{fontSize:14}}>Select Team</label>
              <select
                id="team-select"
                value={userTeam}
                onChange={(e) => {
                  setUserTeam(e.target.value);
                }}
                style={{
                  paddingInline: 16,
                  paddingBlock: 12,
                  borderRadius: 8,
                  border: '2px solid rgba(0, 0, 0, 0.13)',
                  fontSize: 14,
                }}
              >
                <option value="">-- Select team --</option>
                {
                  userTeamList.map((val, ind) => {
                    return (
                      <option value={val.id}>
                        {val.name}
                      </option>
                    )
                  })
                }
               
              </select> 
            </div>

            

          </div>

          <div style={{ width: '100%', display: 'flex', position: 'absolute', bottom: 0, justifyContent: 'end', alignItems: 'center', paddingBlock: '22px', paddingInline: '22px', borderTop: '1px solid #00000036' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => { setPopup(false); setInitialProjectName(true) }} style={{ paddingInline: '20px', paddingBlock: '12px', border: '1px solid #00000036', borderRadius: '10px', boxShadow: '0 2px 2px rgba(0, 0, 0, 0.05)', marginBlock: '8px', cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => createNewProject()} style={{ paddingInline: '20px', color: 'white', backgroundColor: 'black', paddingBlock: '12px', border: '1px solid #00000036', borderRadius: '10px', boxShadow: '0 2px 2px rgba(0, 0, 0, 0.05)', marginBlock: '8px', cursor: 'pointer' }}>Create</button>
            </div>
          </div>

        </div>
      </div>
      }
      {/* popup end */}


      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ width: '100%' }}>

          <div style={{ paddingInline: 60, paddingTop: 24 }}>
            <h2 style={{ fontSize: 24 }}>Your Teams</h2>

            <div style={{ marginTop: '12px', gap: '8px', display: 'flex' }}>
              <button onClick={() => setPopup(true)} style={{ paddingInline: '20px', paddingBlock: '12px', border: '1px solid #00000036', borderRadius: '10px', boxShadow: '0 2px 2px rgba(0, 0, 0, 0.05)', marginBlock: '8px', cursor: 'pointer' }}>Create Your Team</button>
              <div style={{ position: 'relative' }}>
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search Here..." style={{ width: '320px', paddingLeft: '28px', paddingRight: '12px', paddingBlock: '12px', border: '1px solid #00000036', borderRadius: '10px', boxShadow: '0 2px 2px rgba(0, 0, 0, 0.05)', marginBlock: '8px', cursor: 'pointer' }} />
                <CiSearch color="#00000090" style={{ position: 'absolute', left: 8, top: '36%' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '12px' }}>
              {
                filteredOrg?.map((val, ind) => {
                  return (
                    <>
                      <div onClick={() => handleOrgClick(val.id, val.project_name)} style={{ cursor: 'pointer' }}>
                        <ProjectCard title={val.project_name} guidename={val?.guide_user?.name}/>
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

export default OrgDetails