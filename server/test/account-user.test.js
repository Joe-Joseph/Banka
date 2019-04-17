import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);
const payload = {
  id: 1,
  firstName: 'joseph',
  lastName: 'joe',
  email: 'joe@gmail.com',
};

const token = jwt.sign(payload, 'YOU_OWN_YOUR_OWN', { expiresIn: '24h' });

before('User signup', (done) => {
  const user = {
    firstName: 'joseph',
    lastName: 'joe',
    email: 'user@gmail.com',
    password: '123456',
  };
  chai.request(app)
    .post('/api/v1/auth/signup')
    .send(user)
    .end((err, res) => {
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.be.equal(201);
      done();
    });
});
// Test get for welcome
describe('Not allowed', () => {
  it('Only Admin or cashier can update account status', () => {
    chai.request(app)
      .patch('/api/v1/accounts/1')
      .set('Authorization', token)
      .send({
        status: 'dormant',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(401);
        expect(res.body.error).to.be.a('string');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('status');
      });
  });

  it('Only Admin or cashier can update account status', () => {
    chai.request(app)
      .delete('/api/v1/accounts/1')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(401);
        expect(res.body.error).to.be.a('string');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('status');
      });
  });

  it('Only cashier can credit account', () => {
    chai.request(app)
      .post('/api/v1/accounts/1/credit')
      .set('Authorization', token)
      .send({
        amount: 300000,
        cashier: 2,
      })
      .end((err, res) => {
        expect(res.body.status).to.be.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
      });
  });

  it('Only cashier can debit account', () => {
    chai.request(app)
      .post('/api/v1/accounts/1/debit')
      .set('Authorization', token)
      .send({
        amount: 0,
        cashier: 2,
      })
      .end((err, res) => {
        expect(res.body.status).to.be.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
      });
  });
});
