import { SiFiles } from "react-icons/si";
import { FaCircle } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { FaCrown } from "react-icons/fa6";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";


const ProjectCard = ({title = 'Project Batch 2025', count = 4, status = 1, lastupdated = new Date(), guidename = 'no guide assigned'}) => {
    return (
        <div style={{boxShadow:'0 2px 12px rgba(0, 0, 0, 0.08)', width:'450px', display:'flex', marginBlock:'8px', gap:'12px', paddingInline:'12px', paddingBlock:'24px', border:'1px solid #00000036', borderRadius:'12px', alignItems:'center'}}>
            <div style={{border:'2px solid #00000036', borderRadius:120, width:'48px', height:'48px', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <AiOutlineFundProjectionScreen color="black" size={22}/>
            </div>
            <div>
            <div style={{display:'flex', alignItems:'center', gap:'4px'}}>
                <p style={{fontSize:'18px', fontWeight:500}}>{title}</p>
                
                {status == 1 && <p style={{fontSize:'10px', backgroundColor:'red', paddingInline:'6px', paddingBlock:'4px', color:'white', borderRadius:'12px', fontWeight:500}}>Not Started</p>}
                {status == 2 && <p style={{fontSize:'10px', backgroundColor:'orange', paddingInline:'6px', paddingBlock:'4px', color:'white', borderRadius:'12px', fontWeight:500}}>In Progress</p>}
                {status == 3 && <p style={{fontSize:'10px', backgroundColor:'green', paddingInline:'6px', paddingBlock:'4px', color:'white', borderRadius:'12px', fontWeight:500}}>Complete</p>}

            </div>

            <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
                <div style={{color:'#00000080', display:'flex', alignItems:'center', gap:'4px', marginTop:'8px',  backgroundColor:'#80008016', borderRadius:'8px', paddingInline:'6px', paddingBlock:'2px'}}>
                    <FaCrown size={12} color="purple"/>
                    <p style={{fontSize:12, color:'purple'}}>{guidename}</p>
                </div>
                <div style={{color:'#00000080', display:'flex', alignItems:'center', gap:'4px', marginTop:'8px'}}>
                    <FaCircle size={2}/>
                    <p style={{fontSize:12}}>Last Update On {lastupdated.toDateString()} </p>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ProjectCard;