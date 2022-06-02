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
const options = {
    density: 100,
    saveFilename: "untitled",
    savePath: "./images",
    format: "png",
}


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
        writeFile(name, base64Pdf, 'base64', async error => {
            if(error){
                console.log(error)
                throw error;
            }
            else
            {
                console.log("success");
                console.log("before pdf");
                const pageBase64 = await fromPath(name, options).bulk(-1, true);
                for(let i = 0; i < pageBase64.length; i++){
                    const newPdfImg = new PdfImg({pageNum: i, pdfId: newPdf._id, selectedFile: pageBase64[i].base64});
                    console.log("after pdf");
                    await newPdfImg.save();
                }
            }
        })
        const python = await spawn('python3', ['./python/embed.py', name]); await new Promise( (resolve) => {
            python.on('close', resolve);
        });

        await fs.readFile(name.split(".")[0] + ".pt", "base64", async (err, buf)=>{
            if(err){
                console.log(err)
            }else{
                await newPdf.save();
                const newEmbed = new Embed({name: name.split(".")[0], pdfId: newPdf._id, selectedFile: buf})
                await newEmbed.save();
                res.status(201).json("successfully embedded");
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
        await Pdf.findByIdAndDelete(req.params.id);
        await Embed.deleteMany({pdfId: req.params.id});
        await PdfImg.deleteMany({pdfId: req.params.id});
        res.status(200).json("pdf deleted")
    }catch(err){
	res.status(400).json("error: " + err);
    }
};
