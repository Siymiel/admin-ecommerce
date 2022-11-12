import React from 'react'
import { useDispatch } from 'react-redux';
import  { adminLogin } from '../../redux/apiCalls'
import {Helmet} from "react-helmet";

const Login = () => {
    const dispatch = useDispatch()

    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")

    const handleClick = (e) => {
        e.preventDefault();
        adminLogin(dispatch, { username, password })
    }

    return (
        <div>
            <Helmet>
                <title>Admin -Login</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/light.css" />
            </Helmet>
            <input type="text"  placeholder='username' onChange={e => setUsername(e.target.value)}/>
            <input type="password"  placeholder='password' onChange={e => setPassword(e.target.value)}/>
            <button type="submit" onClick={handleClick}>Login</button>
        </div>
    )
}

export default Login 