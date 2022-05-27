import express from 'express';
import Pdf from '../models/pdf.js';
import Embed from '../models/embed.js';
import Bin from '../models/pdf.js';
const router = express.Router();
import {spawn} from 'node:child_process';
import {Base64} from 'js-base64';
import {writeFile} from 'node:fs';
import fs from 'fs';


export const search = async (req,res) =>{
    try{
        if(!req.userId) return res.json({message: "unauthenticated"});
        
        const pdf = await Pdf.find({userId: req.userId}).select('name');
        const nameArray = []
        for (let i = 0; i < pdf.length; i++) {
            const embedname = pdf[i].substring(0, -4)
            const embedData = await Embed.find({name: embedname}).select('selectedFile')
            
            writeFile(embedname + ".tf", embedData, 'base64', error => {
                if(error){
                    console.log(error)
                    throw error;
                }
            })
            nameArray.push(embedname + ".tf")
        }


        var fs = require('fs');

        var file = fs.createWriteStream('corpusnames.txt');
        file.on('error', function(err) { 
            console.log(err)
            throw err
        });
        nameArray.forEach(function(v) { file.write(v + '\n'); });
        file.end();

        const query = req.query
        const python = await spawn('python3', ['../python/search.py', 'corpusnames.txt', query]);
        await new Promise( (resolve) => {
            python.on('close', resolve);
        });





        res.status(200).json(pdf);
    } catch(err) {
	    res.status(400).json("error: " + err);
    }
};