import React, { useRef, useState } from 'react'
import {Login} from '../Action/UserAction'
import { useDispatch } from 'react-redux';

const LoginSignUp = () => {
  const loginForm = useRef(null);
  const [loginEmail,setLoginEmail] = useState('');
  const [loginPassword,setLoginPassword] = useState('');

  const dispatch = useDispatch();
  const loginSubmit = (e) =>{
    e.preventDefault()
    dispatch(Login(loginEmail,loginPassword))
  }

  return (
    <div>

        <form ref={loginForm} onSubmit={loginSubmit}>
            email
            <input 
              type="email"  
              name='email'
              required
              value={loginEmail} 
              onChange={(e)=>setLoginEmail(e.target.value)}
            />

            password
            <input 
              type="password"
              name='password' 
              required
              value={loginPassword}
              onChange={(e)=>setLoginPassword(e.target.value)}
            />
            
            <input type="submit" value="Register" className="signUpBtn" />
        </form>
    </div>
  )
}

export default LoginSignUp