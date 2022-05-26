import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const pdfSchema = new Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    selectedFile: {type: Buffer, required: true}
}, {
    timestamps: true
});

const Pdf = mongoose.model('Pdf', pdfSchema);

export default Pdf 
