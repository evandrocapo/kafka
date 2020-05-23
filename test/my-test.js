const request = require('supertest');
const app = require('../app');
const address = "localhost:3000";
const sinon = require('sinon');

describe('my-test', () => {
  it("should send a message to kafka producer", function(done) {
    request(address)
      .get('/kafka-p?mensagem=A message to test it')
      .expect(200)
      .end(done);
      sinon.restore();
  });

  it("should create a kafka consumer", function(done) {
    request(address)
      .get('/kafka-c')
      .expect(200)
      .end(done);
  });
});
