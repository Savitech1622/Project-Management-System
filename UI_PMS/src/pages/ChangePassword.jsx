import { useState } from "react";
import { supabase } from "../../supabaseConfig";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useMyStore } from "../store/myStore";

const ChangePassword = () => {
    let [newPassword, setNewPassword] = useState('');
    let [password, setPassword] = useState('');
    let [newHide, setNewHide] = useState(false);
    let [hide, setHide] = useState(false);
    const navigation = useNavigate();
    let [initialNewPassword, setInitialNewPassword] = useState(true);
    let [initialPassword, setInitialPassword] = useState(true);
    const {userid} = useMyStore();

    const changePassword = async () => {
        try {
            if (newPassword.length == 0 || password.length == 0)
            {
                showVal();
                clearForm();
                return;
            }

            if (newPassword != password)
            {
                clearForm();
                showVal();
                return;
            }
           
            const { data: t_sys_users, error } = await supabase
            .from('t_sys_users')
            .update({ password: password })
            .eq('id', userid)
            .select();

            if (error) {
                throw error
            }

            if (t_sys_users.length > 0) {
                console.log('Password Change Successfull')
                navigation('/');
            } else {
                console.log('Password Change Failed')
            }

        } catch (ex) {
            console.log('Error Occurred At changePassword: ' + ex.message);
        } finally {
            clearForm();
        }
    }

    const showVal = () => {
        setInitialNewPassword(false);
        setInitialPassword(false);
    }

    const clearForm = () => {
        setNewPassword("");
        setPassword("");
    }

    const togglePasswordVisibility = () => {
        setHide(prev => !prev); // Toggle hide state to show/hide password
    }

    const newTogglePasswordVisibility = () => {
        setNewHide(prev => !prev); // Toggle hide state to show/hide password
    }

    return (
        <div style={{ width: '100%', height: '100vh', backgroundColor: '#ffffff', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '50%', height: '100vh' }}>
                <img src="https://cdn.wallpapersafari.com/52/98/5oPLsu.jpg" style={{ width: '100%', height: '100vh', objectFit: 'cover' }} alt="bg" />
            </div>
            <div style={{ width: '50%', height: '100vh', padding: 100, display: 'flex', justifyContent: 'start', alignItems: 'start', flexDirection: 'column' }}>
                <div>
                    <h2 style={{ fontSize: 36 }}>Forgot Password</h2>
                    <p style={{ color: '#00000062' }}>Change your password</p>
                </div>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '22px', marginTop: 60 }}>
                    <div style={{ width: '80%', display: 'flex', flexDirection: 'column', gap: '6px'}}>
                        <label htmlFor="">New Password</label>
                        <div style={{position:'relative'}}>
                            <input
                            value={newPassword}
                            onChange={(e) => {setNewPassword(e.target.value); (e.target.value.length > 0 && setInitialNewPassword(false))}}
                            placeholder="New Password"
                            type={newHide ? "text" : "password"} 
                            style={{ paddingLeft: 12, paddingRight:32 ,paddingBlock: 12, width: '100%', borderRadius: 8, border: '2px solid rgba(0, 0, 0, 0.13)' }}
                            />
                            <button
                                onClick={newTogglePasswordVisibility}
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
                                {newHide ? <FaRegEye /> : <FaRegEyeSlash />} 
                            </button>
                        </div>
                        {
                            !initialNewPassword && newPassword.length === 0 &&
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <FaInfoCircle color="red" />
                                <p style={{ color: 'red' }}>Please enter new password</p>
                            </div>
                        }
                    </div>

                    <div style={{ width: '80%', display: 'flex', flexDirection: 'column', gap: '6px'}}>
                        <label htmlFor="">Password</label>
                        <div style={{position:'relative'}}>
                            <input
                            value={password}
                            onChange={(e) => {setPassword(e.target.value); (e.target.value.length > 0 && setInitialPassword(false))}}
                            placeholder="Confirm Password"
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
                                <p style={{ color: 'red' }}>Please enter confirm password</p>
                            </div>
                        }
                    </div>
                  
                    <div style={{ width: '80%', display: 'flex', marginTop: 12, flexDirection: 'column', gap: '6px' }}>
                        <button onClick={() => changePassword()} style={{ paddingInline: 8, fontSize: 16, paddingBlock: 12, color: 'white', backgroundColor: 'black', borderRadius: 8, border: '2px solid rgb(0, 0, 0)' }}>Change Password</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ChangePassword;
