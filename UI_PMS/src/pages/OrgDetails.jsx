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

const OrgDetails = () => {
    let [orgList, setOrgList] = useState([]);
    let [loading, setLoading] = useState(false);
    let [initialOrgName, setInitialOrgName] = useState(true);
    let [orgName, setOrgName] = useState('');
    let [search, setSearch] = useState('');
    let [refresh, setRefresh] = useState(0);
    const navigate = useNavigate();
    const { orgId } = useParams();
    // const {userid, refresh, setRefresh} = useMyStore();
    const {userid} = useMyStore();

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

    return (
        <div style={{width:'100%', height:'100vh'}}>
            <div style={{display:'flex', width:'100%'}}>
              {/* sidenav */}
              <div style={{width:'72px', height:'100vh', opacity:.7, borderInlineEnd:'1px solid rgba(0,0,0,0.11', display:'flex', flexDirection:'column', alignItems:'center', gap:32, marginTop:62}}>
                <IoGrid size={28}/>
                <MdSpaceDashboard size={28}/>
                <RiTeamFill size={28}/>
                <IoIosSettings size={28}/>
              </div>
              {/* mainwindow */}
              <div style={{width:'100%'}}>

                  <div style={{paddingInline:60, paddingTop:24}}>
                    <h2 style={{fontSize:24}}>Your Teams</h2>

                  </div>

              </div>
            </div>
        </div>
    )
}

export default OrgDetails