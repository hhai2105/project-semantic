import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const embedSchema = new Schema({
    pdfId: {type: String, required: true},
    name: {type: String, required: true},
    selectedFile: {type: String, required: true}
}, {
    timestamps: true
});

const Embed = mongoose.model('Embed', embedSchema);

export default Embed 
