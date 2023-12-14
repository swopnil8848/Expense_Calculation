import React, { useState,useEffect } from 'react'
import {AiFillPieChart} from 'react-icons/ai'
import {AiOutlineAreaChart} from 'react-icons/ai'
import {AiOutlineBarChart} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { getMe } from '../Action/UserAction'
import Transactions from './Transactions'
import { newTransaction,monthsTransaction } from '../Action/TransactionAction'

const Home = () => {
  const dispatch = useDispatch()

//   const [user,setUser] = useState({});
//   const [loading,setLoading]= useState('true');

  const { user, loading, isAuthenticated } = useSelector((state) => state.user)
  
  const {user:userData,loading:userLoad} = useSelector((state) => state.user1)

  const {loading:monthData,data} = useSelector((state)=>state.monthsTransaction)
    console.log("data of the month",data);
    console.log("the loading of the monthData",monthData)
  const [Form,setForm] = useState(false);
  const [select,setSelect] = useState("date");
  const [active,setActive] = useState(false)

  useEffect(() => {
      dispatch(getMe())
      dispatch(monthsTransaction())
    console.log("months data::> ",data);
  }, [dispatch])

  enum TransactionType {
    Income = 'income',
    Expense = 'expense',
  }

  interface FormData {
    amount: number;
    type: TransactionType;
    descreption: string;
  }

//   const TransactionForm: React.FC = () => {
    // State to store form data
    const [formData, setFormData] = useState<FormData>({
      amount: 0,
      type: TransactionType.Income,
      descreption: '',  
    });

      // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'amount' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActive(false)
    dispatch(newTransaction(formData));
    // Do something with the form data, e.g., send it to a server or process it further
  };

// const handleGetMe = () => {
//     // Dispatch the 'getMe' action
//     dispatch(getMe(dispatch));
//   };
  

  return (
    <div>
        {
            monthData?"loading...":
            <div className='home bg-slate-100 shadow-sm shadow-gray-50 mx-20 relative h-screen'>
                <div className={`${active?'vissible':'hidden'}`}>
                    <div className='w-full h-screen z-max absolute bg-blue-50 bg-opacity-80 z-20'>
                        <div className='absolute top-1/3 left-1/2 transition-duration: 150ms transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-fit rounded-lg bg-blue-300 border border-orange-600 shadow-lg shadow-blue-400'>
                        <form onSubmit={handleSubmit} className='flex flex-col justify-around'>

                            <h1 className='m-2 font-semibold p-4 text-xl flex justify-center border-b border-gray-300'>
                                Create New Transaction
                            </h1>

                            <label className='flex my-3 justify-evenly'>
                                <div className='font-semibold my-auto'>
                                    Amount:
                                </div>
                                <div>
                                    <input className='w-64 h-10 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500' type="number" name="amount" value={formData.amount} onChange={handleInputChange} />
                                </div>
                            </label>

                            <label className='flex my-3 justify-evenly'>
                                <div className='font-semibold my-auto'>
                                    Type:
                                </div>
                                <div>
                                    <select 
                                        className='w-64 h-10 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500'
                                        name="type" value={formData.type} onChange={handleInputChange}
                                    >
                                    <option value={TransactionType.Income}>Income</option>
                                    <option value={TransactionType.Expense}>Expense</option>
                                    </select>
                                </div>
                            </label>

                            <label className='flex my-3 justify-evenly'>
                                <div className='font-semibold my-auto'>
                                    Description:
                                </div>
                                <div>
                                    <input 
                                        className='w-64 h-10 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500'
                                        type="text" name="descreption" value={formData.descreption} onChange={handleInputChange} 
                                    />
                                </div>
                            </label>

                            <div className='flex justify-center'>   
                                <button className='m-8 p-4 w-full bg-blue-900 text-xl rounded-3xl font-semibold text-gray-100 mx-16 shadow-xl shadow-blue' type="submit">Submit</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>


                <div className='flex justify-around h-28 text-center mt-12'>
                    <div className='total_balance_container rounded-lg border border-black w-full m-5'>
                        <h1 className='font-bold'>Balance:{userData?.data?.balance||0} </h1>
                    </div>
                    <div className='spent_balance_container rounded-md border border-black w-full m-5'>
                        <h1 className='font-bold'>Income/month:{data?.data?.incomeAmount||0}</h1>
                    </div>
                    <div className='income_balance_container rounded-md border border-black w-full m-5'>
                        <h1 className='font-bold'>Expense/month:{data?.data?.expenseAmount||0}</h1>
                    </div>
                </div>

                <div onClick={()=>setForm(true)}
                className='Transactions flex justify-around my-4 border border-black shadow-md shadow-gray-500 rounded-lg mx-4'>

                    <div className='flex justify-items-end w-1/3 ml-5'>
                        <div className='text-3xl shadow-lg shadow-gray-300 w-fit h-fit my-auto rounded-full mx-5 hover:bg-gray-200 p-1'><AiFillPieChart/></div>
                        <div className='text-3xl shadow-lg shadow-gray-300 w-fit h-fit my-auto rounded-full mx-5 hover:bg-gray-200 p-1'><AiOutlineAreaChart/></div>
                        <div className='text-3xl shadow-lg shadow-gray-300 w-fit h-fit my-auto rounded-full mx-5 hover:bg-gray-200 p-1'><AiOutlineBarChart/></div>
                    </div>

                    <div className='my-auto mx-2 w-1/3'>
                        <select className='w-32 h-fit text-center hover:bg-gray-200' name="all" value={select} onChange={(e)=>{
                            setSelect(e.target.value)}}>
                            <option value="date">Date</option>
                            <option value="price">Price</option>
                        </select>
                    </div>

                    <button className='flex text-center my-aut p-4 m-1 rounded-lg mx-auto w-1/3 hover:bg-gray-200'
                        onClick={()=>setActive(true)}
                    >            
                        <div className='new_transaction'>
                            <h1 className='font-bold'>New Transaction</h1>
                        </div>
                        <div className=' '>
                            +
                        </div>
                    </button>
                </div>
            <div className='-z-10'>
                <Transactions reload={active}/>
            </div>
        </div>
        }
    </div>
    
  )
}

export default Home