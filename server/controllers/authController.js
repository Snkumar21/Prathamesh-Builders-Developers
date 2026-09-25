import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const token=id=>jwt.sign (
    {id},
    process.env.JWT_SECRET,
    {expiresIn:'7d'}
);

export const register=async(req,res)=> {
    const { name,email,password } = req.body;
    
    if(
        await Admin.findOne({email})
    )return res.status(409).json(
        {message:'Admin exists'}
    );
    
    const admin=await Admin.create(
        {name,email,password:await bcrypt.hash(password,12)}
    );
    
    res.status(201).json({token:token(admin._id)})
};
    
export const login=async(req,res)=> {
    const {email,password}=req.body;
    const admin=await Admin.findOne({email});
    
    if(!admin||!(await bcrypt.compare
        (password,admin.password)
    ))return res.status(401).json(
        {message:'Invalid credentials'}
    );
    
    res.json({token:token(admin._id),
        admin:{name:admin.name,email:admin.email}})
};