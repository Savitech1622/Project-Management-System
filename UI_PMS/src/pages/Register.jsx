import { useState } from "react";
import { supabase } from "../../supabaseConfig";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [hide, setHide] = useState(false);
    const navigation = useNavigate();
    let [initialName, setInitialName] = useState(true);
    let [initialEmail, setInitialEmail] = useState(true);
    let [initialPassword, setInitialPassword] = useState(true);

    const createUser = async () => {
        try {
            if (name.length == 0 || email.length == 0 || password.length == 0)
            {
                showVal();
                clearForm();
                return;
            }

            const { data: t_sys_users, error } = await supabase
                .from('t_sys_users')
                .insert({
                    name: name,
                    email: email,
                    password: password
                })
                .select()

            if (error) {
                throw error
            }

            if (t_sys_users.length > 0) {
                console.log('User Created Successfull')
                navigation('/workspace');
            } else {
                console.log('User Creation Failed')
            }

        } catch (ex) {
            console.log('Error Occurred At createUser: ' + ex.message);
        } finally {
            clearForm();
        }
    }

    const showVal = () => {
        setInitialName(false);
        setInitialEmail(false);
        setInitialPassword(false);
    }

    const clearForm = () => {
        setName("");
        setEmail("");
        setPassword("");
    }

    const togglePasswordVisibility = () => {
        setHide(prev => !prev); // Toggle hide state to show/hide password
    }

    return (
        <div style={{ width: '100%', height: '100vh', backgroundColor: '#ffffff', display: 'flex', justifyContent: 'center'}}>
            <div style={{ width: '50%', height: '100vh' }}>
                <img src="https://cdn.wallpapersafari.com/52/98/5oPLsu.jpg" style={{ width: '100%', height: '100vh', objectFit: 'cover' }} alt="bg" />
            </div>
            <div style={{ width: '50%', height: '100vh', padding: 100, display: 'flex', justifyContent: 'start', alignItems: 'start', flexDirection: 'column' }}>
                <div>
                    <h2 style={{ fontSize: 36 }}>Create New Account</h2>
                    <p style={{ color: '#00000062' }}>Sign up to your account</p>
                </div>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '22px', marginTop: 60 }}>
                    <div style={{ width: '80%', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label htmlFor="">Your Name</label>
                        <input value={name} onChange={(e) => {setName(e.target.value); (e.target.value.length > 0 && setInitialName(false))}} placeholder="Enter your Name" type="text" style={{ paddingInline: 12, paddingBlock: 12, borderRadius: 8, border: '2px solid rgba(0, 0, 0, 0.13)' }} />
                        {
                            !initialName && name.length === 0 &&
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <FaInfoCircle color="red" />
                                <p style={{ color: 'red' }}>Please enter your name</p>
                            </div>
                        }
                    </div>
                    <div style={{ width: '80%', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label htmlFor="">Your Email</label>
                        <input value={email} onChange={(e) => {setEmail(e.target.value); (e.target.value.length > 0 && setInitialEmail(false))}} placeholder="Enter your Email" type="text" style={{ paddingInline: 12, paddingBlock: 12, borderRadius: 8, border: '2px solid rgba(0, 0, 0, 0.13)' }} />
                        {
                            !initialEmail && email.length === 0 &&
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <FaInfoCircle color="red" />
                                <p style={{ color: 'red' }}>Please enter email</p>
                            </div>
                        }
                    </div>
                    <div style={{ width: '80%', display: 'flex', flexDirection: 'column', gap: '6px'}}>
                        <label htmlFor="">Password</label>
                        <div style={{position:'relative'}}>
                            <input
                            value={password}
                            onChange={(e) => {setPassword(e.target.value); (e.target.value.length > 0 && setInitialPassword(false))}}
                            placeholder="Enter your Password"
                            type={hide ? "text" : "password"} 
                            style={{ paddingLeft: 12, paddingRight:32 ,paddingBlock: 12, width: '100%', borderRadius: 8, border: '2px solid rgba(0, 0, 0, 0.13)' }}
                            />
                            <button
                                onClick={togglePasswordVisibility}
                                style={{
                                    position: 'absolute',
                                    right: 12,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    border: 'none',
                                    backgroundColor: 'transparent',
                                    cursor: 'pointer'
                                }}
                            >
                                {hide ? <FaRegEye /> : <FaRegEyeSlash />} 
                            </button>
                        </div>
                        {
                            !initialPassword && password.length === 0 &&
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <FaInfoCircle color="red" />
                                <p style={{ color: 'red' }}>Please enter password</p>
                            </div>
                        }
                    </div>
                    <div style={{ width: '80%', display: 'flex', marginTop: 12, flexDirection: 'column', gap: '6px' }}>
                        <button onClick={() => createUser()} style={{ paddingInline: 8, fontSize: 16, paddingBlock: 12, color: 'white', backgroundColor: 'black', borderRadius: 8, border: '2px solid rgb(0, 0, 0)' }}>Create User</button>
                    </div>

                    <div style={{ width: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20, gap: '6px' }}>
                        <p style={{ color: '#00000062' }}>Already have an account?</p>
                        <a onClick={(e) => {e.preventDefault; navigation('/')}} style={{ color: 'black', cursor:'pointer', fontWeight: 600, textDecoration: 'none' }}>Sign In</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
