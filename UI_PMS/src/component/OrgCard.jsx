import { SiFiles } from "react-icons/si";
import { FaCircle } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";

const OrgCard = ({title = 'Project Batch 2025', count = 4}) => {
    return (
        <div style={{cursor:'pointer', boxShadow:'0 2px 12px rgba(0, 0, 0, 0.08)', width:'450px', display:'flex', marginBlock:'24px', gap:'12px', paddingInline:'12px', paddingBlock:'24px', border:'1px solid #00000036', borderRadius:'12px', alignItems:'center'}}>
            <div style={{border:'2px solid #00000036', borderRadius:120, width:'48px', height:'48px', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <SiFiles color="black" size={22}/>
            </div>
            <div>
            <p style={{fontSize:'18px', fontWeight:500}}>{title}</p>
            <div style={{color:'#00000080', display:'flex', alignItems:'center', gap:'4px', marginTop:'8px'}}>
                <FaCircle size={8}/>
                <p>{count} Items</p>
            </div>
            </div>
        </div>
    )
}

export default OrgCard;