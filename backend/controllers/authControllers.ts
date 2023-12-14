/// <reference types="node" />
import jwt from 'jsonwebtoken'
import {User} from '../models/UserModel'
// import { promisify } from 'util'
import { LocalStorage } from 'node-localstorage';

const localStorage = new LocalStorage('./localStorageData');


const signToken = payload =>{
    return jwt.sign({payload},process.env.JWTSECRET,{expiresIn:process.env.JWTEXPIRESIN})
}


// insted of catching validation error in backend we can do it in forntend
// sth like if res.message== validation error then show this in the frontend
const createSendToken = (user,statusCode,res)=>{
    const payload = { id : user.id , name : user.name }

    const token = signToken(payload)

    // const options = {
    //     expires: new Date(
    //       Date.now() + parseInt(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
    //     ),
    //     httpOnly: true,
    // };
    console.log("this is before the jwt")
    localStorage.setItem('jwt',token );
    console.log("this is afyer the jwt",localStorage.getItem('jwt'))
    
      res.status(statusCode).json({
        success: true,
        user,
        token,
      });
}

export const signup = async (req,res,next)=>{
    try{
        const newUser = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            passwordConfirm:req.body.passwordConfirm,
        })
    
        await newUser.save()

        console.log("newUser",newUser);
    
        const url = `${req.protocol}://${req.get('host')}/me`;
        console.log("url",url);
    
        createSendToken(newUser,200,res);
    }catch(error){
        // console.log(error.code);
        if(error.code===11000){
            return res.status(400).json({
                success:false,
                message:'duplicate field value'
            })
        }
        return res.status(400).json({
            success:false,
            message:error
        })
    }
}



export const login = async(req,res,next)=>{
    try{
        const {email,password} = req.body

        if(!email || !password){
            console.log("no email or password")
            res.status(400).json({
                success:false,
                message:"please enter email and password"
            })
        }

        const user = await User.findOne({email}).select('+password')

        if(!user || !await user.correctPassword(password)){
            return res.status(400).json({
                success:false,
                message:"iccorect email or password"
            })
        }

        const payload = {
            id:user.id,
        }
        console.log("user logged in sucessfully")
        
        createSendToken(payload,201,res)
    }catch(error){
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"sth went wrong please try again"
        })
    }
}

export const protect =async (req,res,next)=>{
    try{
        const token = localStorage.getItem('jwt');

        console.log("this is the token::>>",token);
    
        if(!token){
            return res.status(403).json({
                success:false,
                message:'unauthorized/n please loging to get access'
            })
        }
    
        const decoded = jwt.verify(token,process.env.JWTSECRET)
    
        const freshUser = await User.findById(decoded.payload.id);

        console.log("freshUser",User);

        req.user= freshUser;
    
        next()
    }catch(error){
        console.log(error);
        res.status(400).josn({
            success:false,
            message:error
        })
    }
}

export const getME = async(req,res,next) =>{
    const user = req.user;
    console.log("decoded::>",user)
    res.status(200).json({
        success:true,
        data:user,
    })
}