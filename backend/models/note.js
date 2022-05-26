import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    binId: {type: String},
    note: {type: String },
    file: {type: String },
    due: {type: Date}
}, {
	timestamps: true,
});

const Note = mongoose.model('Note', noteSchema);
export default Note

