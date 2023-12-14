import mongoose, { mongo } from 'mongoose';

const Current_Balance_Schema = new mongoose.Schema({
    balance:{
        type:Number,
        required:true,
        default:0
    },
    month:{
        type:Number,
        required:true,
        default: () => new Date().getMonth()
    },
    User:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,'balance must belong to a user']
    }
},
{
    timestamps: true // Enable the timestamps option
}
)

export const Balance = mongoose.model('Balance',Current_Balance_Schema)
    