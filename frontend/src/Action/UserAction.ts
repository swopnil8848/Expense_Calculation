// import { Dispatch,Action } from '@reduxjs/toolkit';
import axios from 'axios'

export const Login = (email:string,password:string) =>async (dispatch)=>{
    try{
        dispatch({type:"LOGIN_REQUEST"})

        const config = { headers: { "Content-Type": "application/json" }};
        console.log("email,password",email,password);
        // const {data} = await axios.post(
        //     'http://localhost:3000/api/v1/user/login',
        //     { email:email, password:password },
        //     config
        // );

        // const data = fetch({
        //     // ...config,
        //     headers: { "Content-Type": "application/json" },
        //     url:"http://localhost:3000/api/v1/user/login",
        //     body:JSON.stringify({ email:email, password:password }),


        // })

        const data = fetch("http://localhost:3000/api/v1/user/login", {
            method:"POST",
            body:JSON.stringify({ email:email, password:password }),
            headers:{ "Content-Type": "application/json" }
        })
        .then(response => {
            // Handle the response
            // Parse JSON, check for status code, etc.
            return response.json(); // This is just an example, you can parse the response based on your needs
        })


        dispatch({type:"LOGIN_SUCCESS",payload:data})
    } catch (error) {
        console.log(error)
        dispatch({ type: "LOGIN_FAIL", payload: error });
      }
}  

export const getMe = () => async(dispatch)=>{
    try{
        dispatch({type:"GET_USER"})
        const {data} = await axios.get('http://localhost:3000/api/v1/user/me')
        console.log(data);
        dispatch({type:"GET_USER_SUCCESS",payload:data})
    }catch(error){
        console.log(error)
        dispatch({type:"GET_USER_FAIL",payload:error})
    }
}

export const getAllTransactions = () => async(dispatch) =>{
    try{
        dispatch({type:'GET_ALL_TRANSACTIONS'})
        const doc = await axios.get('http://localhost:3000/api/v1/Balance/transaction/all')
        // console.log("doc in getAllTransactions action",doc)
        dispatch({type:'GET_ALL_TRANSACTIONS_SUCCESS',payload:doc})
    }catch(error){
        console.log(error,'error in getAllTransactions action')
        dispatch({type:"GET_ALL_TRANSACTIONS_FAIL",payload:error})
    }
}