const users=require('../models/userModel')
const jwt=require('jsonwebtoken')
// register
exports.registerController= async (req,res)=>{
    console.log("Inside registerController");
    const {username,email,password}=req.body
    console.log(username,email,password);

    try{
        const exisitingUser=await users.findOne({email})
        if(exisitingUser){
            res.status(406).json("User Already exist...Please Login!!!")

        }else{
            const newUser=new users({
                username,email,password,github:"",linkedin:"",profilePic:""
            })
            await newUser.save()
            res.status(200).json(newUser)

        }

    }catch(err){
        res.status(401).json(err)

    }

    
   
    
}

// login
exports.loginController= async (req,res)=>{
    console.log("Inside loginController");
    const {email,password}=req.body
    console.log(email,password);

    try{
        const exisitingUser=await users.findOne({email,password})
        if(exisitingUser){
            // token generate
            const token=jwt.sign({userId:exisitingUser._id},process.env.JWTPASSWORD)
            res.status(200).json({
                user:exisitingUser,
                token
            })

        }else{
           
            res.status(404).json("Invalid Email/Password")

        }

    }catch(err){
        res.status(401).json(err)

    }

    
   
    
}

// profile updation