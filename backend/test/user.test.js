import supertest from 'supertest';
import {app} from '../index.js';

describe('test suite for user API', ()=> {
	describe('create user', () =>{
		it("return 200 when creating a new user", async() => {
			const {statusCode} = await supertest(app).post("/user/signup").send({
				familyName: "Nguyen",
				givenName: "Hai",
				email: "hhai2105@gmail.com",
				password: "123456789",
				imageUrl: "123456789",
			})
			expect(statusCode).toBe(200)
		})
		it("return 400 when email already exists", async() => {
			const {statusCode} = await supertest(app).post("/user/signup").send({
				familyName: "Nguyen",
				givenName: "Hai",
				email: "hhai2105@gmail.com",
				password: "123456789",
				imageUrl: "123456789",
			})
			expect(statusCode).toBe(400)
		})
	})
	describe('user login', () =>{
		it("return 200 when logged into a new user", async() => {
			const {statusCode} = await supertest(app).post("/user/signin").send({
				email: "hhai2105@gmail.com",
				password: "123456789",
			})
			expect(statusCode).toBe(200)
		})

		it("return 404 when wrong credentials", async() => {
			const {statusCode} = await supertest(app).post("/user/signin").send({
				email: "hhai2105@gmail.com",
				password: "1234",
			})
			expect(statusCode).toBe(404)
		})

		it("return 404 when user doesn't exist", async() => {
			const {statusCode} = await supertest(app).post("/user/signin").send({
				email: "hhai2105@gmail.com1",
				password: "1234",
			})
			expect(statusCode).toBe(404)
		})

	})
	describe('delete user', () =>{
		it("return 200 when deleted user", async() => {
			const {statusCode} = await supertest(app).post("/user/delete").send({
				email: "hhai2105@gmail.com",
			})
			expect(statusCode).toBe(200)
		})
		it("return 404 when trying to login to non existent user", async() => {
			const {statusCode} = await supertest(app).post("/user/signin").send({
				email: "hhai2105@gmail.com",
				password: "123456789",
			})
			expect(statusCode).toBe(404)
		})
	})

	it.todo('it is empty')
})
