import mongoose,{Document} from "mongoose";
import bcrypt from 'bcrypt'

export enum UserRoles {
    ADMIN="ADMIN",
    USER="USER",
}

// export enum UserRoles {
//     ADMIN = "ADMIN",
//     USER = "USER",
// }

export interface IUser extends Document{
    name:String,
    email:String,
    role:UserRoles,
    balance:Number,
    password:String,
    passwordConfirm:String,
    passwordChangedAt:Date,
    passwordResteToken:String,
    passwordResetExpires:Date,
    active:Boolean,
    correctPassword:(pass:string)=>boolean

}

const UserModel = new mongoose.Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        requierd:true
    },
    role:{
        type:String,
        enum:UserRoles,
        default:UserRoles.USER
    },
    balance:{
        type:Number,
        default:0,
        required:true
    },
    password:{
        type:String,
        required:[true,'plese provide a password'],
        minlength:8,
        select:false
    },
    passwordConfirm:{
        type:String,
        required:[true,'please confirm your password'],
        validate:function(el){
            return el === this.password;
        },
        message:'passwords are not same'
    },
    passwordChangedAt:Date,
    passwordResteToken:String,
    passwordResetExpires:Date,
    active:{
        type:Boolean,
        default:true
    }
})

UserModel.pre('save',async function (next){
    if(!this.isModified('password')) next();
    this.password = await bcrypt.hash(this.password,10);
    this.passwordConfirm = undefined;
    this.passwordChangedAt =new Date(Date.now() - 1000)
    next();
})

UserModel.pre("save",async function(next){
    if(!this.isModified('password')) next()
    this.passwordChangedAt =new Date(Date.now() - 1000)
})

UserModel.methods.correctPassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password)
}

export const User = mongoose.model('User',UserModel);