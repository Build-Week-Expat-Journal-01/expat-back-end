const request = require('supertest');
const server = require("../api/server");
const db = require("../data/dbConfig");

describe("/login", () => {
  beforeEach(async () => {
    // re-runs the seeds and starts with fresh database of our seeds
    await db.seed.run();
  });

  it("POST /api/auth/login", async () => {
    const user = { username: 'testing01', password: '123456789'}
    const response = await request(server).post('/api/auth/login').send(user);
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body.token).toBeDefined();
    expect(response.body.message).toBe('Welcome back, testing01.')
  });
});