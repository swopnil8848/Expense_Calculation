import axios from 'axios'

export const newTransaction = (doc) => async (dispatch) =>{
    try{
        dispatch({type:'NEW_TRANSACTIONS'})
        const config = { headers: { "Content-Type": "application/json" }}
        const data = axios.post('http://localhost:3000/api/v1/Balance/transaction',doc,config)
        // console.log(data)
        dispatch({type:'NEW_TRANSACTIONS_SUCCESS',payload:data})
    }catch(error){
        console.log(error)
        dispatch({type:'NEW_TRANSACTIONS_FAIL',payload:error.response})
    }
}

export const monthsTransaction = () => async (dispatch) =>{
    try{
        dispatch({type:'GET_MONTHS_TRANSACTION'})
        const data =await axios.get('http://localhost:3000/api/v1/Balance/transaction/month')
        console.log(data,"data of months transaction")
        dispatch({type:'GET_MONTHS_TRANSACTION_SUCCESS',payload:data})
    }catch(error){
        console.log(error)
        dispatch({type:'GET_MONTHS_TRANSACTION_FAIL',payload:error.response})
    }
}