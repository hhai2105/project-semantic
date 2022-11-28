import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import express from 'express';
import User from '../models/user.js';
const router = express.Router();

export const DeleteAll = async (req, res) => {
    try{
		const result = await User.deleteMany({})
		res.status(200).json({message: "success", result})
    }catch(err){
		res.status(404).json(err)
    }
}

export const GetAll = async (req, res) => {
    try{
		const users = await User.find()
		res.status(200).json({message: "success", result: users})
    }catch(err){
		res.status(404).json(err)
    }
}

export const SignIn = async (req, res) => {
    const {email, password} = req.body;
    try{
		const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(404).json({message: "user doesn't exist"});
		const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
		if(!isPasswordCorrect) return res.status(404).json({message: "invalid credentials"});
		const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "24h"});
		res.status(200).json({message: "success", token})
    }catch(err){
		res.status(404).json(err)
    }
}

export const SignUp = async (req,res) => {
    const {givenName, familyName, email ,password} = req.body;
    const imageUrl = "";
    const newUser = new User({ familyName, givenName, email, password, imageUrl });
    try {
		const existingUser = await User.findOne({email});
		if (existingUser) return res.status(400).json({error:"email already existed"});
		const hashedPassword = await bcrypt.hash(password, 12);
		const result = await User.create({email, password: hashedPassword, familyName, givenName, imageUrl});
		const token = jwt.sign({ email: result.email, id: result._id}, 'test', {expiresIn: "24h"});
		res.status(200).json({message: "success", token});
    }catch(err){
		res.status(400).json({error: err});
	}
};

export const Delete = async (req, res) => {
    try{
		const {email} = req.body
		const result = await User.deleteOne({email: email})
		res.status(200).json({message: "success", result})
    }catch(err){
		res.status(404).json(err)
    }
}

