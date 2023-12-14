


export const UserReducer = (state = { user: {} }, action) => {
    switch(action.type){
        case "LOGIN_REQUEST":
        case "GET_USER":
            return{
                loading:true,
                isAuthenticated:false
            }
        case "LOGIN_SUCCESS":
        case "GET_USER_SUCCESS":
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                user:{...action.payload}
            }
        case "LOGIN_FAIL":
        case "GET_USER_FAIL":
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload
            }
        case "CLEAR_ERROR":
            return {
                ...state,
                error:null,
            }
        default:
            return state;
        
    }
}
export const UserReducer2 = (state = { user: {} }, action) => {
    switch(action.type){
        case "GET_USER":
            return{
                loading:true,
                isAuthenticated:false
            }
        case "GET_USER_SUCCESS":
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                user:{...action.payload}
            }
        case "GET_USER_FAIL":
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload
            }
        case "CLEAR_ERROR":
            return {
                ...state,
                error:null,
            }
        default:
            return state;
    }
}