import express from 'express';
import Pdf from '../models/pdf.js';
import Embed from '../models/embed.js';
import Bin from '../models/pdf.js';
import {spawn} from 'node:child_process';
import {Base64} from 'js-base64';
import {writeFile} from 'node:fs';
import fs from 'fs';
const router = express.Router();


export const search = async (req,res) =>{
    try{
        if(!req.userId) return res.json({message: "unauthenticated"});
        const embed = await Embed.find({userId: req.userId});
        const nameArray = []
        const directory = process.cwd() + "/" + req.userId + "/";
        try{
            fs.mkdirSync(directory)
        }catch(err){
        }
        for (let i = 0; i < embed.length; i++) {
            const embedname =  embed[i].name;
            writeFile(directory + embedname + ".pt", embed[i].selectedFile, 'base64', error => {
                if(error){
                    console.log(error)
                    throw error;
                }
            })
            nameArray.push(embedname + ".pt")
        }
        console.log("finished embedding")
        var file = fs.createWriteStream('corpusnames.txt');
        file.on('error', function(err) { 
            console.log(err)
            throw err
        });
        nameArray.forEach(function(v) { file.write(v + '\n'); });
        file.end();

        const query = req.body.query
        const python = await spawn('python3', ['../python/search.py', 'corpusnames.txt', directory, query]);
        python.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        python.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });
        await new Promise( (resolve) => {
            python.on('close', resolve);
        });
    } catch(err) {
        console.log(err)
	res.status(400).json("error: " + err);
    }
};
