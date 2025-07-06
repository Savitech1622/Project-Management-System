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

    useEffect(() => {
      getTeamData();
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

    const getTeamData = async() => {
      try
      {
        setLoading(true);

        let { data: t_sys_teams, error } = await supabase
        .from('t_sys_teams')
        .select('*').eq('org_id', orgId);

        if(error)
        {
          setLoading(false);
          throw error;
        }

        if(t_sys_teams.length > 0)
        {
          setOrgList(t_sys_teams);
        }
        else
        {
          setOrgList([]);
        }

      }
      catch(ex)
      {
        console.log('Error Occured At getTeamData: '+ex.message);
      }
      finally
      {
        setLoading(false);
      }
      
    }

    return (
        <div style={{width:'100%', height:'100vh'}}>
            <div style={{display:'flex', width:'100%'}}>
              {/* mainwindow */}
              <div style={{width:'100%'}}>

                  <div style={{paddingInline:60, paddingTop:24}}>
                    <h2 style={{fontSize:24}}>My Dashboard</h2>
                  </div>

              </div>
            </div>
        </div>
    )
}

export default TeamDetails