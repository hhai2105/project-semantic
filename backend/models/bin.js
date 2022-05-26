import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const binSchema = new Schema({
    workspaceId: {type: String, required: true},
    name: {type: String, required: true},
    notes: []
}, {
	timestamps: false
});

const Bin = mongoose.model('Bin', binSchema);

export default Bin 
