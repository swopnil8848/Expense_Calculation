import { compileFunction } from 'vm';
import { Balance } from '../models/CurrentBalanceModel';
import { Transaction } from '../models/TransactionModel';
import { User } from '../models/UserModel';

export const Create_Current_Month_Balance = async (req,res,next)=>{
    try{
        const {cash,Bank,invesment,month} = req.body;
        const user = req.user

        if(!req.user){
            res.status(404).json({
                success:false,
                message:'you are requrired to login first'
            })
        }
        
        const NewBalance = new Balance({
            cash: Number(cash),
            Bank: Number(Bank),
            invesment: Number(invesment),
            month,
            User:user._id
        })
        const current_month = new Date().getMonth()+1;

        if(month>current_month){
            res.status(404).json({
                success:false,
                message:"you can't update future months balance"
            })
        }

        await NewBalance.save();

        res.status(200).json({
            success:true,
            NewBalance
        })

    }catch(error){
        console.log("Error in BalanceControllers",error)
        res.status(400).json({
            succes:false
        })
    }
}

export const edit_balance =async (req,res,next)=>{

    try{
        const {balance} = req.body
        
        if(!req.user){
            res.status(400).json({
                success:false,
                message:"plese login to get access"
            })
        }
    
        const updated_user = await User.findByIdAndUpdate(req.user._id,{balance},{ new: true })
        
        // i need to create new transaction model here to clearify in the forntend that i have customed my balanance on spefic date

        res.status(200).json({
            success:true,
            data:updated_user
        })

    }catch(error){
        console.log("error in edit_balance balanceControllers",error),
        res.status(400).json({
            success:false,
            error
        })
    }
}


// to create new transaction of user
export const newTransaction = async (req,res,next)=>{
    try{
        const {amount,type,descreption}=req.body

        const user = req.user;

        console.log(user);
        console.log("req.body:>>",req.body)

        if(!req.user){
            res.status(400).json({
                success:false,
                message:"you cant perform this action."
            })
        }
        

        const newTransaction = new Transaction({
            amount:Number(amount),
            type:String(type),
            descreption:String(descreption),
            user:req.user._id
        })

        await newTransaction.save();


        let net = 0;
        if(type=="income"){
            net = req.user.balance+=amount
        }
        if(type=="expense"){
            net = req.user.balance-=amount
        }

        await User.findByIdAndUpdate(req.user._id,{balance:net})

        res.status(200).json({
            success:true,
            data:newTransaction
        })
    }catch(error){
        console.log(error)
        res.status(400).json({
            success:false,
            message:error.response  
        })
    }
}

export const getAllTransactions = async (req,res)=>{
    try{
        if(!req.user){
            console.log("unauthorized.. please login first")
        }
        
        const doc = await Transaction.find({user:req.user._id})
        console.log("doc",doc.map((item)=>{console.log(item.createdAt.getMonth()+1)}))

        //income per month calculation
        const dateObject = new Date()
        const currentMonth = dateObject.getUTCMonth();
        console.log(currentMonth)
        const monthsTransaction = []
        doc.map((item)=>{
            if(item.createdAt.getMonth()==currentMonth){
                return monthsTransaction.push(item);
            }
        })

        console.log("months transaction",monthsTransaction)
        //expense per month calculation 

        res.status(200).json({
            success:true,
            doc
        })
    }
    catch(error){
        console.log(error)
        res.json(error)
    }
}

export const transactionPerMonth=async (req,res)=>{
    try{
        if(!req.user){
            console.log("unauthorized.. please login first")
        }
        
        const doc = await Transaction.find({user:req.user._id})
        console.log("doc",doc.map((item)=>{console.log(item.createdAt.getMonth()+1)}))

        //income per month calculation
        const dateObject = new Date()
        const currentMonth = dateObject.getUTCMonth();
        const monthsTransaction = []
        const incomeTransaction = []
        let incomeAmount = 0;
        const expenseTransaction = []
        let expenseAmount = 0;
        doc.map((item)=>{
            if(item.createdAt.getMonth()==currentMonth){
                return monthsTransaction.push(item);
            }
        })

        console.log("months transaction",monthsTransaction)
        //expense per month calculation 

        monthsTransaction.map((item)=>{
            if(item.type=='income'){
                incomeTransaction.push(item);
                incomeAmount=incomeAmount+item.amount
            }else{
                expenseTransaction.push(item);
                expenseAmount=expenseAmount+item.amount
            }
        })

        // we can send transaction per month as incomeTransaction and expenseTransaction
        res.status(200).json({
            success:true,
            incomeAmount,
            expenseAmount
        })
    }catch(error){
        console.log(error)
        res.json(error)
    }
}