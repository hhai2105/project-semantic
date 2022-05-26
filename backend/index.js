import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import notesRouter from './routes/notes.js';
import binsRouter from './routes/bins.js';
import workspacesRouter from './routes/workspaces.js';
import userRouter from './routes/user.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use(express.json());
app.use('/notes', notesRouter);
app.use('/bins', binsRouter);
app.use('/workspaces', workspacesRouter);
app.use('/user', userRouter);

mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true})
	.then(() => console.log("mongoDB database connection established successfully"))
	.catch(err => console.log("cant connect to mongoDB database, error: " + err));

app.listen(port, () => {
	console.log('Server is running on port: ' + port);
});
