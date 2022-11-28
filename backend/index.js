import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import pdfRouter from './routes/pdf.js';
import searchRouter from './routes/search.js';
import userRouter from './routes/user.js';
import swaggerDocs from './utils/swagger.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use(express.json());
app.use('/pdfs', pdfRouter);
app.use('/user', userRouter);
app.use('/search', searchRouter);

mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true})
	.then(() => console.log("mongoDB database connection established successfully"))
	.catch(err => console.log("cant connect to mongoDB database, error: " + err));

app.listen(port, async () => {
	console.log('Server is running on port: ' + port);
	swaggerDocs(app, port)
});
