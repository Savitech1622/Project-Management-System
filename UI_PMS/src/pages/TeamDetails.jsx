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
import { FaRegComment } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import ProjectCard from "../component/ProjectCard";
import TaskCard from "../component/TaskCard";
import BugCard from "../component/BugCard";
import TestCard from "../component/TestCard";
import ReportCard from "../component/ReportCard";

const TeamDetails = () => {
    let [orgList, setOrgList] = useState([]);
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

    let [projectDetails, setProjectDetails] = useState({});
    let [guideDetails, setGuideDetails] = useState({});
    let [memberDetails, setMemberDetails] = useState([]);
    let [taskList, setTaskList] = useState([]);

    useEffect(() => {
      getTeamDetailsData();
      getTaskDetailsData();
    }, [refresh]);


    const clearForm = () => {
      setProjectName('');
    }

    const getTeamDetailsData = async() => {
      try
      {
        setLoading(true);

        let { data: t_sys_teams, error } = await supabase
        .from('t_sys_teams')
        .select(`*, user_team: userteam(id, users), guide_info: guide(id, name)`)
        .eq('org_id', orgId).eq('id', teamId);

        if(error)
        {
          setLoading(false);
          throw error;
        }

        if(t_sys_teams.length > 0)
        {
          console.log(t_sys_teams)
          const project = t_sys_teams[0];
          const projectDetailObj = {
            name: project.project_name,
            status : project.status
          }

          const guideDetailObj = {
            id : project.guide_info.id,
            name: project.guide_info.name
          }

          setGuideDetails(guideDetailObj);

          const members = project?.user_team?.users;
          const memberId = members.map((val, ind) => {
            return (
              val.userid
            )
          })

          
          let { data: t_sys_users, error: user_error } = await supabase
            .from('t_sys_users')
            .select('*').in('id', memberId);

          if(user_error)
            throw user_error;

          if(t_sys_users.length > 0)
          {
            setMemberDetails(t_sys_users);
          }
          else
          {
            setMemberDetails([]);
          }
          setProjectDetails(projectDetailObj);
        }
        else
        {
          setGuideDetails({});
          setProjectDetails({});
        }

      }
      catch(ex)
      {
        console.log('Error Occured At getTeamDetailsData: '+ex.message);
      }
      finally
      {
        setLoading(false);
      }
    }

    const getTaskDetailsData = async() => {
      try
      {
        setLoading(true);
        
        let { data: t_sys_task, error } = await supabase
          .from('t_sys_task')
          .select(`*, username: assigned_to(id, name)`).eq('team_id', teamId);
          
        if(error)
        {
          setLoading(false);
          throw error;
        }

        if(t_sys_task.length > 0)
        {
          console.log(t_sys_task)
          setTaskList(t_sys_task);
        }
        else
        {
          setTaskList([]);
        }

      }
      catch(ex)
      {
        console.log('Error Occured At getTaskDetailsData: '+ex.message);
      }
      finally
      {
        setLoading(false);
      }
    }

    let [showDetails, setShowDetail] = useState(false);

    return (
        <div style={{width:'100%', height:'90vh', overflowY:'scroll'}}>

        {showDetails &&
          <div style={{width:'100%', height:'100vh', backgroundColor:'#00000075', position:'absolute', zIndex:33, top:0, left:0, display: 'flex', justifyContent:'end'}}>
            <div style={{width:'40%', height:'100vh', backgroundColor:'white', zIndex:'50'}}>
              
              <div style={{width:'100%', display:'flex', justifyContent:'end', alignItems:'center', paddingBlock:'16px', paddingInline:'22px', borderBottom:'1px solid #00000036'}}>
                <button onClick={() => setShowDetail(false)} style={{border:'none', cursor:'pointer', background:'none'}}>
                  <IoCloseSharp size={22}/>
                </button>
              </div>

              <div style={{width:'100%', display:'flex', flexDirection:'column', marginBlock:'8px', gap:'48px', paddingInline:'32px', paddingBlock:'20px'}}>
                <div>
                    <p style={{fontSize:'18px', fontWeight:500}}>🎉Login Page</p>
                    <div style={{color:'#00000070', display:'flex', alignItems:'center', gap:'4px', marginTop:'12px'}}>
                        <FaRegUser size={12}/>
                        <p style={{fontSize:12}}>Yash Raghuvanshi</p>
                    </div>
                </div>

            </div>


            </div>
          </div>
        }

            <div style={{display:'flex', width:'100%'}}>
              {/* mainwindow */}
              <div style={{width:'100%'}}>

                  <div style={{paddingInline:60, paddingTop:24, borderBottom:'1px solid #00000016', paddingBottom:'24px'}}>
                    <div style={{display:'flex', gap:'8px', alignItems:'center'}}>
                        <h2 style={{fontSize:24}}>{projectDetails?.name || ''}</h2>
                        {projectDetails?.status == 1 && <p style={{fontSize:'12px', backgroundColor:'red', paddingInline:'6px', paddingBlock:'4px', color:'white', borderRadius:'12px', fontWeight:500}}>Not Started</p>}
                        {projectDetails?.status == 2 && <p style={{fontSize:'12px', backgroundColor:'orange', paddingInline:'6px', paddingBlock:'4px', color:'white', borderRadius:'12px', fontWeight:500}}>In Progress</p>}
                        {projectDetails?.status == 3 && <p style={{fontSize:'12px', backgroundColor:'green', paddingInline:'6px', paddingBlock:'4px', color:'white', borderRadius:'12px', fontWeight:500}}>Complete</p>}
                    </div>
                    <div style={{display:'flex', flexDirection:'column'}}>
                      <h2 style={{fontSize:16, color:'#00000070', fontWeight:400, marginTop:'8px'}}>Members</h2>
                      <div style={{display:'flex', gap:'20px', marginTop:'6px'}}>
                        {
                           (guideDetails!= null && guideDetails?.name) && <>
                                <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
                                  <div style={{marginBlock:'4px', boxShadow:'0 1px 4px rgba(0, 0, 0, 0.3)', fontSize:'10px', color:'white', background:'purple', fontWeight:600, width:'30px', height:'30px', border:'2px solid #ffffff', borderRadius:'120', display:'flex', justifyContent:'center', alignItems:'center', borderRadius:'120px'}}>
                                    {guideDetails?.name?.split(' ').length > 1 ? guideDetails?.name?.split(' ')[0][0]?.toUpperCase()+guideDetails?.name?.split(' ')[1][0]?.toUpperCase(): guideDetails?.name[0]?.toUpperCase()}
                                  </div>
                                  <h2 style={{fontSize:12, fontWeight:400, textAlign:'center', color:'#00000092'}}>{guideDetails.name}</h2>
                                </div>
                              </>
                        }
                        {
                          memberDetails?.map((val, ind) => {
                            return (
                              <>
                                <div>
                                  <div style={{marginBlock:'4px', boxShadow:'0 1px 4px rgba(0, 0, 0, 0.3)', fontSize:'10px', color:'white', background:'purple', fontWeight:600, width:'30px', height:'30px', border:'2px solid #ffffff', borderRadius:'120', display:'flex', justifyContent:'center', alignItems:'center', borderRadius:'120px'}}>
                                    {val.name.split(' ').length > 1 ? val.name.split(' ')[0][0].toUpperCase()+val.name.split(' ')[1][0].toUpperCase(): val.name[0].toUpperCase()}
                                  </div>
                                  <h2 style={{fontSize:12, fontWeight:400, textAlign:'center', color:'#00000092'}}>{val.name.split(' ')[0]}</h2>
                                </div>
                              </>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>

                  <div style={{paddingInline:60, paddingTop:24}}>
                      <h2 style={{fontSize:16, color:'#00000092'}}>Tasks: 10</h2>
                      <div style={{marginTop: 12 }}>
                      {
                        taskList.map((val, ind) => {
                          switch(val.task_type)
                          {
                            case 'Code':
                              return (
                                <>
                                <div onClick={() => setShowDetail(true)} style={{cursor:'pointer'}}>
                                  <TaskCard tasktitle = {val.task_title} assignedto = {val.username.name} taskstatus = {val.task_status} guideremark = {val.guide_remark} progress = {val.progress}/>
                                </div>
                              </>
                              )
                              break;
                            case 'Bug':
                              return (
                                <>
                                <div onClick={() => setShowDetail(true)} style={{cursor:'pointer'}}>
                                  <BugCard tasktitle = {val.task_title} assignedto = {val.username.name} taskstatus = {val.task_status} guideremark = {val.guide_remark} progress = {val.progress}/>
                                </div>
                              </>
                              )
                              break;
                            case 'Test':
                              return (
                                <>
                                <div onClick={() => setShowDetail(true)} style={{cursor:'pointer'}}>
                                  <TestCard tasktitle = {val.task_title} assignedto = {val.username.name} taskstatus = {val.task_status} guideremark = {val.guide_remark} progress = {val.progress}/>
                                </div>
                              </>
                              )
                              break;
                            default :
                              return (
                                 <>
                                <div onClick={() => setShowDetail(true)} style={{cursor:'pointer'}}>
                                  <ReportCard tasktitle = {val.task_title} assignedto = {val.username.name} taskstatus = {val.task_status} guideremark = {val.guide_remark} progress = {val.progress}/>
                                </div>
                              </>
                              )
                          }
                        })
                      }
                      </div>
                  </div>
                  

              </div>
            </div>
        </div>
    )
}

export default TeamDetails