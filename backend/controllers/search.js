import express from 'express';
import Pdf from '../models/pdf.js';
import PdfImg from '../models/pdfImg.js';
import Embed from '../models/embed.js';
import {spawn} from 'node:child_process';
import {Base64} from 'js-base64';
import {writeFile} from 'node:fs';
import fs from 'fs';
const router = express.Router();


export const search = async (req,res) =>{
    try{
        if(!req.userId) return res.json({message: "unauthenticated"});
        const embed = await Embed.find({userId: req.userId});
        const nameArray = [];
        const idArray = [];
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
            idArray.push(embed[i].pdfId)
        }
        console.log("finished embedding")
        var nameFile = fs.createWriteStream(req.userId+'corpusnames.txt');
        var idFile = fs.createWriteStream(req.userId+'id.txt');
        nameFile.on('error', function(err) { 
            console.log(err)
            throw err
        });
        idFile.on('error', function(err) { 
            console.log(err)
            throw err
        });
        for(let i = 0; i < nameArray.length; i++){
            nameFile.write(nameArray[i] + "\n");
            idFile.write(idArray[i] + "\n");
        }
        nameFile.end();
        idFile.end();

        const query = req.body.query;
        const python = await spawn('python3', ['../python/search.py', req.userId + 'corpusnames.txt', directory, query, req.userId + 'id.txt']);
        var results = '';
        python.stdout.on('data', function(data) {
            results += data.toString()
        })
        python.stderr.on('data', function(data) {
            console.log(`${data}`)
        })
        await new Promise( (resolve) => {
            python.on('close', resolve);
        });
        results = results.split("\n");
        var respond = [];
        for(let i = 0; i < results.length; i++){
            const string = results[i];
            const result = results[i].split(" ");
            const image = await PdfImg.find({pdfId: result[2], pageNum: result[1]}).select('selectedFile');
            if(image[0]){
                respond.push({image: image[0].selectedFile, string})
            }
        }
        res.status(200).json(respond);
    } catch(err) {
        console.log(err)
        res.status(400).json("error: " + err);
    }
};
