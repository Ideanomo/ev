const supertest = require('supertest');
const app = require('./../server/express');
const http = require('http');
let request;
let server = http.createServer(app);

describe('GET api/clients', () => {
    beforeAll(async () => {
        request = await supertest(server)
    })

    test('It should return 200', async () => {
        request.get('/api/clients')
            .expect(200)
    })

    test('It should specify json as content type in http header', async () => {
        request.post('/api/clients').send({
            name: "name",
            email: "name@name.info",
            company: "company",
            password: "password"
        })
            .expect('Content-Type', /json/)
            .expect(200)
    })

    test('It should return 400 if name email and password not entered at signup', () => {
        request.post('/api/users').send({
            name: "username"
        })
            .expect(400)
    })
})