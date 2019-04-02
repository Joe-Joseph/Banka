import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../app'

const { expect } = chai
chai.use(chaiHttp)
  let token
  //now let's login the user before we run any tests
  before("User Signup", (done) => {
    const user = {
        firstName : "Joseph",
        lastName : "joe",
        email: 'joe@gmail.com', 
        password: '123456'
      }
      chai.request(app)
      .post('/api/v1/auth/signup')
      .set("Content-type","application/json")
      .set("Accept","application/json")
      .send(user)
      .end((err, res) =>{
          console.log(res.body)
        token = res.body.token
        expect(res.body.status).to.equal(201)
        expect(res.body).to.have.property('status')
        expect(res.body).to.have.property('message')
        expect(res.body).to.have.property('data')
        expect(res.body).to.be.an('object')
        done();
      });
  });

describe('Signup', () =>{
    it('All fields are required', () => {
        chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
            firstName : "",
            lastName : "",
            email : "",
            password : ""
        })
        .end((err, res) => {
            expect(res.body.status).to.be.equal(400)
            expect(res.body).to.have.property('error')
            expect(res.body).to.have.property('status')
            expect(res.body).to.be.an('object')
        })
    })
    
    it('First name length must be at least 3 characters long', () => {
        chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
            firstName : "ab",
        })
        .end((err, res) => {
            expect(res.body.status).to.be.equal(400)
            expect(res.body).to.have.property('error')
            expect(res.body).to.have.property('status')
            expect(res.body).to.be.an('object')
        })
    })

    it('Last name length must be at least 3 characters long', () => {
        chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
            firstName : "Joseph",
            lastName : "",
        })
        .end((err, res) => {
            expect(res.body.status).to.be.equal(400)
            expect(res.body).to.have.property('error')
            expect(res.body).to.have.property('status')
            expect(res.body).to.be.an('object')
        })
    })

    it('Email must be valid email', () => {
        chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
            firstName : "Joseph",
            lastName : "Joe",
            email : "joseph",
        })
        .end((err, res) => {
            expect(res.body.status).to.be.equal(400)
            expect(res.body).to.have.property('error')
            expect(res.body).to.have.property('status')
            expect(res.body).to.be.an('object')
        })
    })

    it('Password length must be at least 6 characters long', () => {
        chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
            firstName : "Joseph",
            lastName : "Joe",
            email : "joseph@gmail.com",
            password : "123"
        })
        .end((err, res) => {
            expect(res.body.status).to.be.equal(400)
            expect(res.body).to.have.property('error')
            expect(res.body).to.have.property('status')
            expect(res.body).to.be.an('object')
        })
    })

    it('Password length must be at least 6 characters long', () => {
        chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
            firstName : "Joseph",
            lastName : "Joe",
            email : "jos@gmail.com",
            password : "1234567"
        })
        .end((err, res) => {
            expect(res.body.status).to.be.equal(201)
            expect(res.body).to.have.property('message')
            expect(res.body).to.have.property('status')
            expect(res.body).to.have.property('data')
            expect(res.body).to.be.an('object')
        })
    })

    it('Email already registered', () => {
        chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
            firstName : "Joseph",
            lastName : "Joe",
            email : "joe@gmail.com",
            password : "1234567"
        })
        .end((err, res) => {
            expect(res.body.status).to.be.equal(400)
            expect(res.body).to.have.property('status')
            expect(res.body).to.have.property('error')
            expect(res.body).to.be.an('object')
        })
    })
})