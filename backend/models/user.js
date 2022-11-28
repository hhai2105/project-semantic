import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         familyName:
 *           type: string 
 *           description: family name
 *           example: Smith
 *         givenName:
 *           type: string
 *           description: given name
 *           example: John
 *         email:
 *           type: string
 *           description: email
 *           example: abc@xyz.com
 *         password:
 *           type: string
 *           description: password
 *           example: 123456789
 *         imageUrl:
 *           type: string
 *           description: email
 *           example: string
 */

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

