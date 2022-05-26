import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
	familyName: {type: String, required: true},
	givenName: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	imageUrl: {type: String, required: false}
}, {
	timestamps: true,
});

const User = mongoose.model('User', userSchema);
export default User 

