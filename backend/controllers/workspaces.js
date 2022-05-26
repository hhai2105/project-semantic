import express from 'express';
import Workspace from '../models/workspace.js';
import Bin from '../models/workspace.js';
const router = express.Router();

export const getWorkspaces = async (req,res) =>{
    try{
	if(!req.userId) return res.json({message: "unauthenticated"});
	const workspace = await Workspace.find({users: req.userId});
	res.status(200).json(workspace);
    }catch(err){
	res.status(400).json("error: " + err);
    }
};

export const createWorkspace = async (req,res) => {
    if(!req.userId) return res.json({message: "unauthenticated"});
    const name = req.body.name;
    const users = [req.userId];
    const newWorkspace = new Workspace({ name, users });
    try {
	await newWorkspace.save();
	res.status(201).json(newWorkspace);
    }catch(err){
	res.status(400).json("error: " + err);
    }
};

export const deleteWorkspace = async (req, res) =>{
    try{
	if(!req.userId) return res.json({message: "unauthenticated"});
	const userId = req.userId;
	const workspace = await Workspace.findById(req.params.id);
	if(workspace.users.filter(user => user === req.userId).length !== 0){
            workspace.users = workspace.users.filter(user => user !== req.userId)
            if(workspace.users.length === 0){
                let message;
	        const bins = await Bin.find({workspaceId: workspace._id});
                for(let i = 0; i < bins.length; i++){
                    message = await Bin.findByIdAndDelete(bins[i]._id);
                }
	        message = await Workspace.findByIdAndDelete(req.params.id);
            }else{
	        const message =await workspace.save();
	        res.json('workspace deleted');
            }
	    res.status(200).json(req.params.id)
	}else{
	    res.status(400).json({message: "not the user"});
	}
    }catch(err){
	res.status(400).json("error: " + err);
    }
};

export const updateWorkspace = async (req, res) =>{
    try{

	if(!req.userId) return res.json({message: "unauthenticated"});
	const name = req.body.name;
	const userId = req.userId;
	workspace = await Workspace.findById(req.params.id);
	if(workspace.userId === userId){
	    const workspace = await Workspace.findById(req.params.id);
	}else{
	    res.status(400).json({message: "not the user"});
	}
	workspace.name = req.body.name;
	message =await workspace.save();
	res.json('workspace updated');
    }catch(err){
	res.status(400).json("error: " + err);
    }
};
