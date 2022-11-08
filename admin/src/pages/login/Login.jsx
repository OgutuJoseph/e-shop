import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { adminLogin } from '../../redux/apiCalls';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        adminLogin(dispatch, {username, password});
    };

    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <h3 style={{ padding: '10px' }} >Admin Login</h3>
            <br />
            <input style={{ padding: '10px' }} type='text' placeholder='Username' onChange={e => setUsername(e.target.value)} />
            <br />
            <input style={{ padding: '10px' }} type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
            <br />
            <button style={{ padding: '10px', width: '100px' }} onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login