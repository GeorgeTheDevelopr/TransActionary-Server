const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../src/app')

describe('GET /items', () => {
  it('GET / responds with 200 containing items', () => {
    return supertest(app)
      .get('/')
      .expect(200)
  })
})

describe('GET /items:id', () => {
  it('GET / responds with 200 containing item by ID', () => {
    return supertest(app)
      .get('/')
      .expect(200)
  })
})

describe('POST /items', () => {
  it('POST / responds with 401 Missing Bearer Token', () => {
    return supertest(app)
      .post('/items')
      .expect(401)
  })
})

