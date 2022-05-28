import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PdfImgSchema = new Schema({
    pdfId: {type: String, required: true},
    pageNum: {type: String, required: true},
    selectedFile: {type: String, required: true}
}, {
    timestamps: true
});

const PdfImg = mongoose.model('PdfImg', PdfImgSchema);

export default PdfImg 
