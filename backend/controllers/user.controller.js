import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
export const register = async(req,res)=>
{
    try
    {
        const {name,email,password,username} = req.body;
        if(!name || !email || !password || !username)
            return res.status(400).json({message:"All fields required"})

        const user = await User.findOne({
            email
        });

        if(user) return res.status(400).json({message:"User already exists"});

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            name,
            email,
            password:hashedPassword,
            username
        });

        await newUser.save();
        const profile = new Profile({userId:newUser._id});
        await profile.save();
        return res.json({message:"User registered successfully"});

    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

export const login = async(req,res)=>
{
    try{
        const {email,password}=req.body;
        if(!email||!password)
            return res.status(400).json({message:"All fields are required"});
        const user = await User.findOne({
            email
        });
        if(!user)
            return res.status(404).json({message:"User does not exists"});

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch)
            return res.status(404).json({message:"Invalid credentials"});

        const token = crypto.randomBytes(32).toString("hex");

        await User.updateOne({_id:user._id},{token});

        return res.json({token});
    }catch(error){

    }
}

export const uploadProfilePicture = async(req,res)=>
{
    const {token} = req.body;
    try
    {
        const user = await User.findOne({token:token});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        user.profilePicture = req.file.filename;
        await user.save();
        return res.json({message:"Profile Picture Updated"});
    }catch(error)
    {
        return res.status(500).json({message:error.message});
    }
}

export const updateUserProfile = async(req,res)=>
{
    try
    {
        const {token,...newUserData} = req.body;
        const user = await User.findOne({token:token});
        if(!user)
        {
            return res.status(404).json({message:"User not found"});
        }
        const {username,email} = newUserData;
        const existingUser = await User.findOne({$or:[{username},{email}]});
        if(existingUser)
        {
            if(existingUser || String(existingUser._id)!==String(user._id))
            {
                return res.status(400).json({message:"User already exists"});
            }
        }
        Object.assign(user,newUserData);
        await user.save();

        return res.json({message:"User updated"});
    }catch(error)
    {
        return res.status(500).json({message:error.message});
    }
}

export const getUserAndProfile = async(req,res)=>{
    try
    {
        const {token} = req.body;
        const user = await User.findOne({token:token});
        if(!user)
        {
            return res.status(404).json({message:"User not found"})
        }
        const userProfile = await Profile.findOne({userId:user._id})
        .populate('userId','name email username profilePicture');

        return res.json(userProfile)
    }catch(error)
    {
        return res.status(500).json({message:error.message})
    }
}

export const updateProfileData = async(req,res)=>
{
    try{
        const{token,...newProfileData} = req.body;
        const userProfile = await User.findOne({token:token});
        if(!userProfile)
        {
            return res.status(404).json({message:"User not found"});
        }
        const post_to_update = await Profile.findOne({userId:userProfile._id});
        Object.assign(post_to_update,newProfileData);
        await profile_to_update.save();
        return res.json({message:"User profile update successfully"});
    }catch(error)
    {
        return res.status(500).json({message:error.message})
    }
}