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

const ReportCard = ({tasktitle, taskstatus, guideremark, progress, assignedto}) => {
    return (
    <div style={{boxShadow:'0 2px 12px rgba(0, 0, 0, 0.08)', width:'100%', display:'flex', marginBlock:'8px', gap:'48px', paddingInline:'32px', paddingBlock:'20px', border:'2px solid #00000016', borderRadius:'12px', alignItems:'center'}}>
        <div>
            <p style={{fontSize:'18px', fontWeight:500}}>📝Log Book</p>
            <div style={{color:'#00000070', display:'flex', alignItems:'center', gap:'4px', marginTop:'12px'}}>
                <FaRegUser size={12}/>
                <p style={{fontSize:12}}>Jay Sonar</p>
            </div>
        </div>
        <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
            <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
            {taskstatus == 1 && <p style={{fontSize:'12px', backgroundColor:'#FFC1C4', paddingInline:'6px', paddingBlock:'4px', color:'black', borderRadius:'6px', fontWeight:500}}>Not Started</p>}
            {taskstatus == 2 && <p style={{fontSize:'12px', backgroundColor:'#EACEFE', paddingInline:'6px', paddingBlock:'4px', color:'black', borderRadius:'6px', fontWeight:500}}>In Progress</p>}
            {taskstatus == 3 && <p style={{fontSize:'12px', backgroundColor:'#B2F2AD', paddingInline:'6px', paddingBlock:'4px', color:'black', borderRadius:'6px', fontWeight:500}}>Completed</p>}
            </div>

            <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
            {guideremark == 1 && <p style={{fontSize:'12px', backgroundColor:'#EAEAEA', paddingInline:'6px', paddingBlock:'4px', color:'black', borderRadius:'6px', fontWeight:500}}>Not Review</p>}
            {guideremark == 2 && <p style={{fontSize:'12px', backgroundColor:'#FDECC9', paddingInline:'6px', paddingBlock:'4px', color:'black', borderRadius:'6px', fontWeight:500}}>Suggestions Given</p>}
            {guideremark == 3 && <p style={{fontSize:'12px', backgroundColor:'#C9DBFE', paddingInline:'6px', paddingBlock:'4px', color:'black', borderRadius:'6px', fontWeight:500}}>Perfect</p>}
            </div>

            <div style={{fontSize:'12px', paddingInline:'6px', paddingBlock:'4px', color:'#00000080', borderRadius:'6px', display:'flex', alignItems:'center', gap: '4px', fontWeight:500, border:'2px solid #00000022'}}><FaRegComment /> <p style={{color:'black'}}>0</p></div>
            
            <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
            <div style={{width:'120px', position:'relative'}}>
                <div style={{width:'100%', height:'6px', backgroundColor:'#00000036', borderRadius:'8px'}}></div>
                <div style={{width:`${progress}%`, height:'6px',top:0, left:0, position:'absolute', zIndex:12, backgroundColor:'black', borderRadius:'8px'}}></div>
            </div>
            <p style={{color:'#00000085', fontSize:12}}>{progress}%</p>
            </div>

        </div>
    </div>
    )
}

export default ReportCard