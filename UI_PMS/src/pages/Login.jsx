import { useState } from "react"
import { supabase } from "../../supabaseConfig";

const Login = () => {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    const signInUser = async() => {
        try 
        {
            let { data: t_sys_users, error } = await supabase
            .from('t_sys_users')
            .select('*').eq('email', email).eq('password', password)
            
            if(t_sys_users.length > 0)
            {
                console.log('Login Successfull')
            }
            else{
                console.log('Login Failed')
            }

            clearForm();
        }
        catch(ex)
        {
            console.log('Error Occured At signInUser: '+ex.message);
        }
    }

    const clearForm = () => {
        setEmail("");
        setPassword("");
    }
    return (
        <div style={{width: '100%', height:'100vh', backgroundColor:'#ffffff', display: 'flex', justifyContent:'center'}}>
            <div style={{width:'50%', height:'100vh'}}>
                <img src="https://cdn.wallpapersafari.com/52/98/5oPLsu.jpg"  style={{width:'100%', height:'100vh', objectFit:'cover'}} alt="bg" />
            </div>
            <div style={{width:'50%', height:'100vh', padding: 100, display:'flex', justifyContent:'start', alignItems:'start', flexDirection:'column'}}>
                <div>
                    <h2 style={{fontSize: 36}}>Welcome Back</h2>
                    <p style={{color:'#00000062'}}>Sign in your account</p>
                </div>
                <div style={{width:'100%', display:'flex', flexDirection:'column', gap:'22px', marginTop:60}}>
                    <div style={{width:'80%', display:'flex', flexDirection:'column', gap:'6px'}}>
                        <label htmlFor="">Your Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" type="text" style={{paddingInline:12, paddingBlock:12, borderRadius:8, border:'2px solid rgba(0, 0, 0, 0.13)'}}/>
                    </div>
                    <div style={{width:'80%', display:'flex', flexDirection:'column', gap:'6px'}}>
                        <label htmlFor="">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" type="text" style={{paddingInline:12, paddingBlock:12, borderRadius:8, border:'2px solid rgba(0, 0, 0, 0.13)'}}/>
                    </div>
                    <div style={{width:'80%', display:'flex', justifyContent:'end', alignItems:'center'}}>
                        <a href="#" style={{color:'#00000062', textDecoration:'none', marginTop:'-4px'}}>Forgot Password ?</a>
                    </div>
                    <div style={{width:'80%', display:'flex',marginTop:12, flexDirection:'column', gap:'6px'}}>
                        <button onClick={() => signInUser()} style={{paddingInline:8, fontSize:16, paddingBlock:12, color:'white', backgroundColor:'black', borderRadius:8, border:'2px solid rgb(0, 0, 0)'}}>Submit</button>
                    </div>

                    <div style={{width:'80%', display:'flex', justifyContent:'center', alignItems:'center',marginTop:20, gap:'6px'}}>
                        <p style={{color:'#00000062'}}>Don't have any account?</p>
                        <a href="#" style={{color:'black', fontWeight:600, textDecoration:'none'}}>Register</a>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Login