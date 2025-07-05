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

const Workspace = () => {
    return (
        <div style={{width:'100%', height:'100vh'}}>
            {/* navbar */}
            <div style={{paddingInline:'24px', width:'100%', height:'60px', borderBlockEnd:'1px solid rgba(0, 0, 0, 0.11)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>

              </div>
              <div style={{display:'flex', justifyContent:'center', alignItems:'center', paddingInline:'8px', gap:'6px'}}>
                <div style={{marginBlock:'4px', boxShadow:'0 1px 4px rgba(0, 0, 0, 0.3)', fontSize:'12px', color:'white', background:'purple', fontWeight:600, width:'36px', height:'36px', border:'2px solid #ffffff', borderRadius:'120', display:'flex', justifyContent:'center', alignItems:'center', borderRadius:'120px'}}>
                YR
                </div>
                <div>
                  <p style={{fontSize:'14px'}}>Yash Raghuvanshi</p>
                </div>
                  {/* <p style={{fontSize:'12px', marginTop:'2px', color:'#00000089'}}>Admin</p> */}
                  <p style={{marginInline:'2px', backgroundColor:'purple', paddingInline:'8px', paddingBlock:'4px', borderRadius:'12px', fontSize:'12px', marginTop:'2px', color:'#ffffff'}}>Admin</p>
                <button style={{border:'none', background:'none', cursor:'pointer'}}>
                  <FaAngleDown size={16} color="#00000096"/>
                </button>
              </div>
            </div>
            <div style={{display:'flex', width:'100%'}}>
              {/* sidenav */}
              <div style={{width:'72px', height:'100vh', opacity:.7, borderInlineEnd:'1px solid rgba(0,0,0,0.11', display:'flex', flexDirection:'column', alignItems:'center', gap:32, marginTop:62}}>
                <IoGrid size={28}/>
                <MdSpaceDashboard size={28}/>
                <RiTeamFill size={28}/>
                <IoIosSettings size={28}/>
              </div>
              {/* mainwindow */}
              <div style={{width:'100%', height:'100vh'}}>
                  <div style={{paddingInline:60, paddingTop:24}}>
                    <h2 style={{fontSize:24}}>Your Organizations</h2>

                    <div style={{marginTop:'12px', gap:'8px', display:'flex'}}>
                      <button style={{paddingInline:'20px', paddingBlock:'12px', border:'1px solid #00000036', borderRadius:'10px', boxShadow:'0 2px 2px rgba(0, 0, 0, 0.05)', marginBlock:'8px', cursor:'pointer'}}>Create New Organization</button>
                      <div style={{position:'relative'}}>
                        <input type="text" placeholder="Search Here..." style={{width:'320px', paddingLeft:'28px', paddingRight:'12px', paddingBlock:'12px', border:'1px solid #00000036', borderRadius:'10px', boxShadow:'0 2px 2px rgba(0, 0, 0, 0.05)', marginBlock:'8px', cursor:'pointer'}} />
                        <CiSearch color="#00000090" style={{position:'absolute', left:8, top:'36%'}}/>
                      </div>
                    </div>

                    <OrgCard />
                    <OrgCard />
                    <OrgCard />

                  </div>

              </div>
            </div>
        </div>
    )
}

export default Workspace