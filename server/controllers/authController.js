import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import { text } from 'express';
import transporter from '../config/nodemailer.js';
import { EMAIL_VERIFY_TEMPLATE,PASSWORD_RESET_TEMPLATE } from '../config/emailTemplates.js';

//all the below business logic is for signup/register  

export const register = async(req, res)=>{
    // fetches from request body
    const {name,password,email} = req.body;

    if(!name ||!email ||!password){
        // if any field missing
        return res.json({success:false , message :'Missing Details'})
    }

    try{
        // to check if user exists
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.json({success:false , message :'User already exixts'})
        }

        // encryption of password
        const hashedPassword = await bcrypt.hash(password,10);

        const user = new userModel({name,email,password : hashedPassword})
        await user.save();
        //upon completion of above new user is crated and saved in the database


        //generate token using jwt for this specific user 
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});

        res.cookie('token',token,{
            httpOnly:true,
            secure: process.env.NODE_ENV==='production',
            sameSite: process.env.NODE_ENV==='production'? 'none': 'strict',
            maxAge: 7*24*60*60*1000 
        })

        // sending welcome email

        console.log("SMTP_USER:", process.env.SMTP_USER);
        console.log("SMTP_PASS:", process.env.SMTP_PASS ? "loaded" : "missing");

        const mailOptions ={
            from : process.env.SENDER_EMAIL,
            to : email,
            subject : 'Welcome to MERN-AUTHENTICATION',
            text : `Welcome to Arman's MERN_AUTHENTICATION app. Your acc has been created with the email : ${email} `
        }
        await transporter.sendMail(mailOptions);
        return res.json({success:true})

    } catch(error){
        //throwa error if error occured
        res.json({success:false, message: error.message})
    }
} 

// Below code is for login functionality
export const login = async (req, res)=>{
    const {password,email} = req.body;

    if(!email||!password){
        return res.json({success:false, message:'Email and password required'})
    }

    try{
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:'Invalid Email'})
        }
        const ismatch = await bcrypt.compare(password,user.password);
        if(!ismatch){
            return res.json({success:false,message:'Invalid password'})
        }
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});

        res.cookie('token',token,{
            httpOnly:true,
            secure: process.env.NODE_ENV==='production',
            sameSite: process.env.NODE_ENV==='production'? 'none': 'strict',
            maxAge: 7*24*60*60*1000 
        });
        
        return res.json({success:true})

    } catch(error){
        res.json({success:false, message: error.message})
    }
}

// above code is for the login functionality

export const logout =async(req,res)=>{
    try{
        res.clearCookie('token',{
            httpOnly:true,
            secure: process.env.NODE_ENV==='production',
            sameSite: process.env.NODE_ENV==='production'? 'none': 'strict',
        })
        return res.json({success:true,message:"Logged out successfully"})

    }
    catch(error){
        res.json({success:false, message: error.message});
    }

}


//send verification otp to user email
export const sendVerifyotp = async (req, res) => {
    try {
        const userId = req.user;   // ✅ use the id added by middleware
        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (user.isAccountVerified) {
            return res.json({ success: false, message: "Account already verified" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyotp = otp;
        user.verifyotpexpireAt = Date.now() + 24 * 60 * 60 * 1000;

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            // text: `Your OTP is ${otp}. Verify your account using this OTP`,
            html : EMAIL_VERIFY_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email)
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: "Verification OTP sent on Email" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};



// After entering the otp now verification happens
export const verifyEmail = async (req, res) => {
    const { otp } = req.body;  // only need OTP from frontend
    const userId = req.user; // ✅ id is injected by middleware

    if (!userId || !otp) {
        return res.json({ success: false, message: "Missing details" });
    }

    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User Not Found" });
        }

        if (user.verifyotp === '' || user.verifyotp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        if (user.verifyotpexpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP Expired" });
        }

        user.isAccountVerified = true;
        user.verifyotp = '';
        user.verifyotpexpireAt = 0;
        await user.save();

        return res.json({ success: true, message: "Email Verification successful" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


// to check if the user is already authenticated or not

export const isAuthenticated =async(req,res)=>{

    try{
        return res.json({success:true});

    }catch(error){
        res.json({success:false,message:error.message});
    }

}


// to send password reset otp

export const sendResetOtp =async(req,res)=>{
    const {email} = req.body;
    if(!email){
        return res.json({success:false,message:"Email is required"});
    }
    try{
        const user = await userModel.findOne({email});
        if(!user){
        return res.json({success:false,message:"User not found"});
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetotp = otp;
        user.resetotpexpireAt = Date.now() + 15  * 60 * 1000;

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Your OTP for resetting your password is ${otp}.Use this OTP to proceed with resetting your password. `,
            html : PASSWORD_RESET_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email)
        };

        await transporter.sendMail(mailOptions);
        return res.json({success:true,message:"OTP sent to your email"});


    }catch(error){
        res.json({success:false,message:error.message});
    }
}

// After reset otp now resetting the password

export const resetPassword =async(req,res)=>{
    const {otp , email , newPassword} = req.body;
    if(!email||!otp||!newPassword){
        return res.json({success:false,message:"Email,OTP,Password are required."});
    }

    try{

        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User not found"});
        }
        if(user.resetotp===""||user.resetotp!==otp){
            return res.json({success:false,message:"Invalid otp "});
        }
        if(user.resetotpexpireAt<Date.now()){
            return res.json({success:false,message:"OTP expired"});
        }
        const hashedPassword = await bcrypt.hash(newPassword,10);
        user.password= hashedPassword;

        user.resetotp='';
        user.resetotpexpireAt=0;

        await user.save();

        return res.json({success:true, message:"password  has been reset successfully "});

    }catch(error){
        return res.json({success:false,message:error.message});
    }
}

export const verifyResetOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.json({ success: false, message: 'Email and OTP required' });

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: 'User not found' });

    if (!user.resetotp || user.resetotp !== otp) return res.json({ success: false, message: 'Invalid OTP' });
    if (user.resetotpexpireAt < Date.now()) return res.json({ success: false, message: 'OTP expired' });

    res.json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
