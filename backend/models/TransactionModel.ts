import mongoose, { mongo } from 'mongoose'
import { User } from './UserModel'

const ExpenseModel =new mongoose.Schema({
    amount:{
        type:Number,
        required:true,
        default:false
    },
    type:{
      type:String,
      enum:["income","expense"],
      required:true  
    },
    descreption:{
        type:String,
        required:true,
        default:""
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        required:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:User,
        required:[true,"balance must belong to a user"]
    }
})

export const Transaction = mongoose.model("Transaction",ExpenseModel)