import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../app'
import request from 'supertest'

const { expect } = chai
chai.use(chaiHttp)

let token
  //now let's login the user before we run any tests
  before("User Signin", (done) => {
    const user = {
        email: 'joe@gmail.com', 
        password: '123456'
      }
      chai.request(app)
      .post('/api/v1/auth/signin')
      .set("Content-type","application/json")
      .set("Accept","application/json")
      .send(user)
      .end((err, res) =>{
          console.log(res.body)
        token = res.body.token
        expect(res.body.status).to.equal(400)
        expect(res.body).to.have.property('status')
        expect(res.body).to.have.property('error')
        expect(res.body).to.be.an('object')
        done();
      });
  });

describe('Login', () =>{
    it('All fields are required', () =>{
        chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
            email: '',
            password: ''
        })
        .end((err, res) =>{
            expect(res.body.status).to.be.equal(400)
            expect(res.body).to.have.property('error')
            expect(res.body).to.have.property('status')
            expect(res.body).to.be.an('object')
        })
    })

    it('Email is required', () =>{
        chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
            email: '',
            password: '12345566'
        })
        .end((err, res) =>{
            expect(res.body.status).to.be.equal(400)
            expect(res.body).to.have.property('error')
            expect(res.body).to.have.property('status')
            expect(res.body).to.be.an('object')
        })
    })

    it('Password is required', () =>{
        chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
            email: 'joe@gmail.com',
            password: ''
        })
        .end((err, res) =>{
            expect(res.body.status).to.be.equal(400)
            expect(res.body).to.have.property('error')
            expect(res.body).to.have.property('status')
            expect(res.body).to.be.an('object')
        })
    })

    it('Email should be valid email', () =>{
        chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
            email: 'joseph',
            password: '1234567'
        })
        .end((err, res) =>{
            expect(res.body.status).to.be.equal(400)
            expect(res.body).to.have.property('error')
            expect(res.body).to.have.property('status')
            expect(res.body).to.be.an('object')
        })
    })

    it('Password length must be at least 6 characters long', () =>{
        chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
            email: 'joseph',
            password: '123'
        })
        .end((err, res) =>{
            expect(res.body.status).to.be.equal(400)
            expect(res.body).to.have.property('error')
            expect(res.body).to.have.property('status')
            expect(res.body).to.be.an('object')
        })
    })
   
it('Correct credentials', (done) =>{
    chai.request(app)
    .post("/api/v1/auth/signin")
    .send({
        email: "joe@gmail.com",
        password:"123456"
    })
    .end((err,res)=>{
        if(err){
            done(err);
        }
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("status");
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("data");
        expect(res.body.status).to.be.equal(200);
        done();
    })
})

it('Correct credentials', (done) =>{
    chai.request(app)
    .post("/api/v1/auth/signin")
    .send({
        email: "joe@gmail.com",
        password:"12345689"
    })
    .end((err,res)=>{
        if(err){
            done(err);
        }
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("status");
        expect(res.body).to.have.property("error");
        expect(res.body.status).to.be.equal(400);
        done();
    })
})
  
})