import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../app'

const { expect } = chai
chai.use(chaiHttp)

describe('Signup', () =>{
    it('Allow user to signup', () => {
        chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
            firstName : "Joseph",
            lastName : "joe",
            email: 'joe@gmail.com', 
            password: '123456'
        })
        .end((err, res) =>{
            expect(res.body.status).to.equal(201)
            expect(res.body).to.have.property('status')
            expect(res.body).to.have.property('message')
            expect(res.body).to.have.property('data')
            expect(res.body).to.be.an('object')
            
        })
        
    });

    it('All fields are required', () => {
        chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
            firstName : "",
            lastName : "",
            email: "", 
            password: ""
        })
        .end((err, res) =>{
         
            expect(res.body.status).to.equal(400)
            expect(res.body).to.have.property('status')
            expect(res.body).to.have.property('error')
            expect(res.body).to.be.an('object')
            
        });
        
     })

     it('Email exist', () => {
        chai.request(app)
        .post('/api/v1/auth/signup')
        .set("Content-type","application/json")
        .set("Accept","application/json")
        .send({
            firstName : "Mugabo",
            lastName : "Mark",
            email: 'joe@gmail.com', 
            password: '123456'
        })
        .end((err, res) =>{
            expect(res.body.status).to.equal(400)
            expect(res.body).to.have.property('status')
            expect(res.body).to.have.property('error')
            expect(res.body).to.be.an('object')
        })
        
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
      .send(user)
      .end((err, res) =>{
          // console.log(res.body)
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
      .send({
          email: '', 
          password: ''
        })
      .end((err, res) =>{
          // console.log(res.body)
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
    .send({
        email: 'joseph@gmail.com', 
        password: '123456'
        })
    .end((err, res) =>{
        // console.log(res.body) 
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
    .send({
        email: 'joe@gmail.com', 
        password: '12345678'
        })
    .end((err, res) =>{
        // console.log(res.body) 
        expect(res.body.status).to.equal(400)
        expect(res.body).to.have.property('status')
        expect(res.body).to.have.property('error')
        expect(res.body).to.be.an('object')
        done();
    })
  })
})
