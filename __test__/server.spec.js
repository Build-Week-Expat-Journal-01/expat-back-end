const request = require('supertest');
const server = require('../api/server');

describe('server.js', () => {
  it('that the testing enviroment is set up', () => {
    expect(process.env.DB_ENV).toBe('testing');
  })

  describe('GET /', () => {
    let res = {};
    beforeAll(async () => {
      res = await request(server).get('/');
    })
    it('should return status code 200', () => {
      expect(res.status).toBe(200);
    })
    it('should return a JSON object', () => {
      expect(res.type).toBe('application/json');
    })
    it('should return { message: "Build Week: Expat Journal 1." }', () => {
      expect(res.body).toEqual({ message: "Build Week: Expat Journal 1." });
    })
  })
})