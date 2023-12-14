export const NewTransactionReducer = (state = { doc:{} }, action) => {
    switch(action.type){
        case "NEW_TRANSACTIONS":
            return{
                loading:true,
                isAuthenticated:false
            }
        case "NEW_TRANSACTIONS_SUCCESS":
            return{
                ...state,
                loading:false,
                doc:{...action.payload}
            }
        case "NEW_TRANSACTIONS_FAIL":
            return{
                ...state,
                loading:false,
                doc:null,
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

export const TransactionReducer = (state = { doc:{} }, action) => {
    switch(action.type){
        case "GET_ALL_TRANSACTIONS":
   
            return{
                loading:true,
                isAuthenticated:false
            }
        case "GET_ALL_TRANSACTIONS_SUCCESS":
            return{
                ...state,
                loading:false,
                doc:{...action.payload}
            }
        case "GET_ALL_TRANSACTIONS_FAIL":
            return{
                ...state,
                loading:false,
                doc:null,
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

export const newTransactionReducer = (state = { transaction: {} }, action) => {
    switch (action.type) {
      case 'NEW_TRANSACTION_REQUEST':
        return {
          ...state,
          loading: true,
        };
      case 'NEW_TRANSACTION_SUCCESS':
        return {
          loading: false,
          success: action.payload.success,
          transaction: action.payload.transaction,
        };
      case 'NEW_TRANSACTION_FAIL':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case 'CLEAR_ERRORS':
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };

export const monthsTransactionReduer = (state={data:{}},action)=>{
    switch(action.type){
        case "GET_MONTHS_TRANSACTION":    
            return{
                loading:true,
            }
        case "GET_MONTHS_TRANSACTION_SUCCESS":
            return{
                ...state,
                loading:false,
                data:{...action.payload}
            }
        case "GET_MONTHS_TRANSACTION_FAIL":
            return{
                ...state,
                loading:false,
                data:null,
                error:action.payload
            }
        default:
            return state;
    }
}