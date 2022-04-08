let request = require('supertest');
const app = require("./../server/express");
const http = require("http");
let server = http.createServer(app);

describe('/api/clients', () => {
    beforeAll(async () => {
        request = await request(server)
    })

    describe('GET /', () => {
        test('It should return 200', async () => {
            request.get('/api/clients')
                .expect(200)
        })
    })

    describe('GET /api/clients', () => {
        test('It should return all clients', async () => {
            request.get('/api/clients')
                .expect(200)
        })
    })

    describe('POST /api/clients', () => {
        test('It should specify json as content type in http header ', () => {
            request.post('/api/clients').send({
                name: "name",
                email: "name@name.info",
                company: "company",
                password: "password"
            })
                .expect('Content-Type', /json/)
                .expect(200)
        })
    })

    describe('POST /api/clients', () => {
        test('It should return 400 if name email and password not entered at signup', () => {
            request.post('/api/clients').send({
                name: "name",
            })
                .expect(400)
        })
    })
})
