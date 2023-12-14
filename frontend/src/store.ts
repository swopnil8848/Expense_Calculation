import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { UserReducer, UserReducer2 } from "./Reducer/UserReducer";
import { NewTransactionReducer, TransactionReducer,monthsTransactionReduer } from "./Reducer/TransactionReducer";

const reducer = combineReducers({
    user:UserReducer,
    user1:UserReducer2,
    transaction:TransactionReducer,
    newTransactio:NewTransactionReducer,
    monthsTransaction:monthsTransactionReduer
})

const middleware = [thunk]

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
