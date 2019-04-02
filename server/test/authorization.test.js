import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../app'

const { expect } = chai
chai.use(chaiHttp)
  let token
  // Signup a user before we run any tests
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
          // console.log(res.body)
        token = res.body.token
        if(res.body.status === 201){
            expect(res.body.status).to.equal(201)
            expect(res.body).to.have.property('status')
            expect(res.body).to.have.property('message')
            expect(res.body).to.have.property('data')
            expect(res.body).to.be.an('object')
        }
        if(res.body.status === 400){
            expect(res.body.status).to.be.equal(400)
            expect(res.body).to.have.property('error')
            expect(res.body).to.have.property('status')
            expect(res.body).to.be.an('object')
        }
        
        done();
      });
  });

describe('Signup', () =>{
    it('Allow user to signup', () => {
        chai.request(app)
        .post('/api/v1/auth/signup')
        .set("Content-type","application/json")
        .set("Accept","application/json")
        .send({
            firstName : "Mugabo",
            lastName : "Mark",
            email: 'mark@gmail.com', 
            password: '123456'
        })
        .end((err, res) =>{
            token = res.body.token
            if(res.body.status === 201){
                expect(res.body.status).to.equal(201)
                expect(res.body).to.have.property('status')
                expect(res.body).to.have.property('message')
                expect(res.body).to.have.property('data')
                expect(res.body).to.be.an('object')
            }
        })
        
    })

    it('All fields are required', () => {
        chai.request(app)
        .post('/api/v1/auth/signup')
        .set("Content-type","application/json")
        .set("Accept","application/json")
        .send({
            firstName : "",
            lastName : "",
            email: "", 
            password: ""
        })
        .end((err, res) =>{
            token = res.body.token
            if(res.body.status === 201){
                expect(res.body.status).to.equal(400)
                expect(res.body).to.have.property('status')
                expect(res.body).to.have.property('error')
                expect(res.body).to.be.an('object')
            }
        })
        
     })

     it('Email exist', () => {
        chai.request(app)
        .post('/api/v1/auth/signup')
        .set("Content-type","application/json")
        .set("Accept","application/json")
        .send({
            firstName : "Mugabo",
            lastName : "Mark",
            email: 'mark@gmail.com', 
            password: '123456'
        })
        .end((err, res) =>{
            token = res.body.token
            if(res.body.status === 400){
                expect(res.body.status).to.equal(400)
                expect(res.body).to.have.property('status')
                expect(res.body).to.have.property('error')
                expect(res.body).to.be.an('object')
            }
        })
        
    })

describe("signin", () =>{
    it("User Signin", (done) => {
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
          // console.log(res.body)
        token = res.body.token
        expect(res.body.status).to.equal(200)
        expect(res.body).to.have.property('status')
        expect(res.body).to.have.property('message')
        expect(res.body).to.have.property('data')
        expect(res.body).to.be.an('object')
        done();
      })
  })

  it("All field are required", (done) =>{
      chai.request(app)
      .post('/api/v1/auth/signin')
      .set("Content-type","application/json")
      .set("Accept","application/json")
      .send({
          email: '', 
          password: ''
        })
      .end((err, res) =>{
          // console.log(res.body)
        token = res.body.token
        expect(res.body.status).to.equal(400)
        expect(res.body).to.have.property('status')
        expect(res.body).to.have.property('error')
        expect(res.body).to.be.an('object')
        done();
      })
    })

    it("Incorrect email" , (done) =>{
    chai.request(app)
    .post('/api/v1/auth/signin')
    .set("Content-type","application/json")
    .set("Accept","application/json")
    .send({
        email: 'joseph@gmail.com', 
        password: '123456'
        })
    .end((err, res) =>{
        // console.log(res.body)
        token = res.body.token
        expect(res.body.status).to.equal(400)
        expect(res.body).to.have.property('status')
        expect(res.body).to.have.property('error')
        expect(res.body).to.be.an('object')
        done();
    })
  })

  it("Incorrect Password" , (done) =>{
    chai.request(app)
    .post('/api/v1/auth/signin')
    .set("Content-type","application/json")
    .set("Accept","application/json")
    .send({
        email: 'joe@gmail.com', 
        password: '12345678'
        })
    .end((err, res) =>{
        // console.log(res.body)
        token = res.body.token
        expect(res.body.status).to.equal(400)
        expect(res.body).to.have.property('status')
        expect(res.body).to.have.property('error')
        expect(res.body).to.be.an('object')
        done();
    })
  })
})
})