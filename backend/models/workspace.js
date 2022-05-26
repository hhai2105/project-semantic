import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const workspaceSchema = new Schema({
    users: [],
    bins: [],
    name: {type: String, required: true}
}, {
	timestamps: false
});

const Workspace = mongoose.model('Workspace', workspaceSchema);

export default Workspace
