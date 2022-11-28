import express from 'express';
import { GetAll,  SignIn, SignUp} from '../controllers/users.js';

const router = express.Router();

/**
 * @swagger
 * /user/getall/:
 *   get:
 *     description: Get all users
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: successfully retrieve users
 *       404:
 *         description: no user found
 */
router.route('/getall').get(GetAll);

/**
 * @swagger
 * /user/signin/:
 *   post:
 *     description: Login to the application
 *     tags: [Users]
  *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                      -email 
 *                      -password 
 *                  properties:
 *                      email:
 *                          type: string
 *                          description: user's email
 *                      password:
 *                          type: string
 *                          description: user's password
 *                  example:
 *                      email: abc@xyz.com
 *                      password: "123456789"
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: successfully logged in, return JWT token
 *       404:
 *         description: log in failed
 */
router.route('/signin').post(SignIn);

/**
 * @swagger
 * /user/signup:
 *   post:
 *     tags: [Users]
 *     description: Sign a user up for the application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Return success message, and JWT token
 *       400:
 *         description: failed to sign up user
 */
router.route('/signup').post(SignUp);

export default router;
