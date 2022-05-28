import express from 'express';
import Pdf from '../models/pdf.js';
import Embed from '../models/embed.js';
import PdfImg from '../models/pdfImg.js';
import Bin from '../models/pdf.js';
const router = express.Router();
import {spawn} from 'node:child_process';
import {Base64} from 'js-base64';
import {writeFile} from 'node:fs';
import fs from 'fs';
import pdfjs from 'pdfjs-dist';
import { fromPath } from "pdf2pic";


export const getPdfs = async (req,res) =>{
    try{
	if(!req.userId) return res.json({message: "unauthenticated"});
	const pdf = await Pdf.find({userId: req.userId}).select('name');
	res.status(200).json(pdf);
    }catch(err){
	res.status(400).json("error: " + err);
    }
};

export const getPdfData = async (req,res) =>{
    try{
	if(!req.userId) return res.json({message: "unauthenticated"});
        console.log(req.body.id)
	const pdf = await Pdf.findById(req.body.id).select('selectedFile');
	res.status(200).json(pdf);
    }catch(err){
	res.status(400).json("error: " + err);
    }
};

export const createPdf = async (req,res) => {
    if(!req.userId) return res.json({message: "unauthenticated"});
    const {name, base64} = req.body;
    const userId = req.userId;
    const newPdf = new Pdf({ name, userId , selectedFile: base64});
    try {
        console.log("trying to embed")
        let base64Pdf = base64.split(';base64,').pop();
        // console.log(base64)
        writeFile(name, base64Pdf, 'base64', error => {
            if(error){
                console.log(error)
                throw error;
            }
            else
            {
                console.log("success");
                var loadingTask = pdfjs.getDocument(name);
                loadingTask.promise.then(async function(pdf) {
                    console.log(pdf.numPages);
                    for (let i = 0; i < pdf.numPages; i++) {
                        pdf.getPage(i + 1).then(async function(page) {
                            var viewport = page.getViewport({ scale: 1});
                            console.log(i);
                            const options = {
                                density: 100,
                                saveFilename: name.substring(0, -4),
                                savePath: "./images",
                                format: "png",
                                width: viewport.width,
                                height: viewport.height
                            };
                            // const pageBase64 = await fromPath(name, options).bulk(i + 1, true);
                            console.log(pageBase64);
                            const newPdfImg = new PdfImg({pageNum: i, pdfId: newPdf._id, selectedFile: pageBase64})
                            await newPdfImg.save();
                            
                        });
                    }
                });
            }
        })

        


        const python = await spawn('python3', ['../python/embed.py', name]);
        await new Promise( (resolve) => {
            python.on('close', resolve);
        });
        await fs.readFile(name.split(".")[0] + ".pt", "base64", async (err, buf)=>{
            if(err){
                console.log(err)
            }else{
                await newPdf.save();
                const newEmbed = new Embed({name: name.split(".")[0], pdfId: newPdf._id, selectedFile: buf})
                await newEmbed.save();
                res.status(201).json({newPdf, newEmbed});
                console.log("uploaded pdf and embed")
            }
        }) ;
        // Upload vetorized




    }catch(err){
        console.log(err)
        res.status(400).json("error: " + err);
    }
};

export const deletePdf = async (req, res) =>{
    try{
	if(!req.userId) return res.json({message: "unauthenticated"});
	const userId = req.userId;
	const pdf = await Pdf.findById(req.params.id);
	if(pdf.users.filter(user => user === req.userId).length !== 0){
            pdf.users = pdf.users.filter(user => user !== req.userId)
            if(pdf.users.length === 0){
                let message;
	        const bins = await Bin.find({pdfId: pdf._id});
                for(let i = 0; i < bins.length; i++){
                    message = await Bin.findByIdAndDelete(bins[i]._id);
                }
	        message = await Pdf.findByIdAndDelete(req.params.id);
            }else{
	        const message =await pdf.save();
	        res.json('pdf deleted');
            }
	    res.status(200).json(req.params.id)
	}else{
	    res.status(400).json({message: "not the user"});
	}
    }catch(err){
	res.status(400).json("error: " + err);
    }
};
