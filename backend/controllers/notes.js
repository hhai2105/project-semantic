import express from 'express';
import Note from '../models/note.js';
import Workspace from '../models/workspace.js';
import Bin from '../models/bin.js';
const router = express.Router();

export const getNotes = async (req,res) =>{
    try{
        let workspaces = await Workspace.find({userId: req.userId})
        workspaces = workspaces.map(workspace => workspace._id)
	let bins = await Bin.find({workspaceId: {$in: workspaces}});
        bins = bins.map(bin => bin._id);
	const notes = await Note.find({binId: {$in: bins}});
	res.status(200).json(notes);
    }catch(err){
	res.status(400).json("error: " + err);
    }
};

export const createNote = async (req,res) => {
    const {note, file, due, binId} = req.body;
    const newNote = new Note({ note, file, due, binId });
    try {
        await newNote.save();
        let bin = await Bin.findById(binId)
        bin.notes.push(newNote._id)
        let message = await bin.save();
        res.status(201).json(newNote);
    }catch(err){
        res.status(400).json("error: " + err);
    }
};

export const deleteNote = async (req, res) =>{
    try{
        const bin = await Bin.findById(req.params.id);
        const workspace = await Workspace.findById(bin.workspaceId);
        workspace.bins = workspace.bins.filter(b => b != req.params.id);
	let message = await workspace.save();
	message = await Bin.findByIdAndDelete(req.params.id);
	res.status(201).json({workspace, bin});
    }catch(err){
        console.log(err)
        res.status(400).json("error: " + err);
    }
};

export const updateNote = async (req, res) =>{
    try{
	let bin = await Bin.findById(req.params.id);
	bin.name = req.body.name;
	message = await bin.save();
	res.json('bin updated');
    }catch(err){
        console.log(err)
	res.status(400).json("error: " + err);
    }
};
