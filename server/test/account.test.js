import chai from 'chai'
import chaiHttp from 'chai-http'
import jwt from 'jsonwebtoken'
import app from '../app'

const { expect } = chai
chai.use(chaiHttp)
const payload = {
    id : 1,
    firstName: 'joseph',
    lastName: 'joe',
    email: 'joe@gmail.com'
}

let token = jwt.sign(payload, 'YOU_OWN_YOUR_OWN', {expiresIn : '24h'});

before("User signup",(done)=>{
        const user = {
            firstName : "joseph",
            lastName : "joe",
            email : "joe1@gmail.com",
            password : "123456"
        };
    chai.request(app)
    .post("/api/v1/auth/signup")
    .send(user)
    .end((err,res)=>{
        expect(res.body).to.be.an("object")
        expect(res.body).to.have.property("status")
        expect(res.body.status).to.be.equal(201)
        done()
    })
})

describe('Create account', () =>{
  it('Create account', () =>{
      chai.request(app)
      .post('/api/v1/accounts')
      .set('Authorization',token)
      .send({
          accountNumber : 123456,
          type : "current",
          status:"activate",
          openingBalance : 300000
      })
      .end((err, res) =>{
         //console.log(res.body)
         expect(res.body).to.be.an('object');
         expect(res.body.status).to.deep.equal(201);
         expect(res.body.message).to.be.a('string')
      })
  })
})