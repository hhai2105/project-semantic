import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import express from 'express';
import User from '../models/user.js';
const router = express.Router();


export const signIn = async (req, res) => {
    const {email, password} = req.body;
    try{
	const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(404).json({message: "user doesn't exist"});
	const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
	if(!isPasswordCorrect) return res.status(404).json({message: "invalid credentials"});
	const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "1h"});
	res.status(200).json({result: existingUser, token})
    }catch(err){
	res.status(404).json(err)
    }
}

export const signUp = async (req,res) => {
    const {givenName, familyName, email ,password} = req.body;
    const imageUrl = "";
    const newUser = new User({ familyName, givenName, email, password, imageUrl });
    try {
	const existingUser = await User.findOne({email});
	if (existingUser) return res.status(400).json("email already existed");
	const hashedPassword = await bcrypt.hash(password, 12);
	const result = await User.create({email, password: hashedPassword, familyName, givenName, imageUrl});
	const token = jwt.sign({ email: result.email, id: result._id}, 'test', {expiresIn: "1h"});
	res.status(201).json({result, token});
    }catch(err){
	res.status(400).json("error: " + err);
    }
};
