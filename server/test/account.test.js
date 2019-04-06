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

// Test for creating account
describe('Create account', () =>{
    it('Account type should be saving or current', () =>{
        chai.request(app)
        .post('/api/v1/accounts')
        .set('Authorization',token)
        .send({
            accountNumber : 123456,
            type : "ok",
            status:"activate",
            openingBalance : 300000
        })
        .end((err, res) =>{
           expect(res.body).to.be.an('object')
           expect(res.body.status).to.deep.equal(400)
           expect(res.body.error).to.be.a('string')
           expect(res.body).to.have.property('error')
           expect(res.body).to.have.property('status')
        })
    })

    it('Account status should be dormant or activate', () =>{
        chai.request(app)
        .post('/api/v1/accounts')
        .set('Authorization',token)
        .send({
            accountNumber : 123456,
            type : "current",
            status:"ok",
            openingBalance : 300000
        })
        .end((err, res) =>{
           expect(res.body).to.be.an('object')
           expect(res.body.status).to.deep.equal(400)
           expect(res.body.error).to.be.a('string')
           expect(res.body).to.have.property('error')
           expect(res.body).to.have.property('status')
        })
    })

    it('Opening balance is required', () =>{
        chai.request(app)
        .post('/api/v1/accounts')
        .set('Authorization',token)
        .send({
            accountNumber : 123456,
            type : "current",
            status:"ok"
        })
        .end((err, res) =>{
           expect(res.body).to.be.an('object')
           expect(res.body.status).to.deep.equal(400)
           expect(res.body.error).to.be.a('string')
           expect(res.body).to.have.property('error')
           expect(res.body).to.have.property('status')
        })
    })
 
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
            expect(res.body).to.be.an('object')
            expect(res.body.status).to.deep.equal(201)
            expect(res.body.message).to.be.a('string')
        })
    })

    it('Already exist', () =>{
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
            expect(res.body).to.be.an('object')
            expect(res.body.status).to.deep.equal(400)
            expect(res.body.error).to.be.a('string')
            expect(res.body).to.have.property('error')
            expect(res.body).to.have.property('status')
        })
    })

    it('Create account without entering status', () =>{
        chai.request(app)
        .post('/api/v1/accounts')
        .set('Authorization',token)
        .send({
            accountNumber : 1111122,
            type : "current",
            openingBalance : 300000
        })
        .end((err, res) =>{
            expect(res.body).to.be.an('object')
            expect(res.body.status).to.deep.equal(201)
            expect(res.body.message).to.be.a('string')
            expect(res.body).to.have.property('message')
            expect(res.body).to.have.property('status')
        })
    })

    it('Invalid Token', () =>{
        chai.request(app)
        .post('/api/v1/accounts')
        .set('Authorization', "safsdafs")
        .send({
            accountNumber : 123456,
            type : "current",
            status:"activate",
            openingBalance : 300000
        })
        .end((err, res) =>{
            expect(res.body).to.be.an('object')
            expect(res.body.status).to.deep.equal(401)
            expect(res.body.error).to.be.a('string')
        })
    })

    it('Unauthorized', () =>{
        chai.request(app)
        .post('/api/v1/accounts')
        .send({
            accountNumber : 123456,
            type : "current",
            status:"activate",
            openingBalance : 300000
        })
        .end((err, res) =>{
            expect(res.body).to.be.an('object')
            expect(res.body.status).to.deep.equal(401)
            expect(res.body.error).to.be.a('string')
        })
    })
})

    // Test for updating account

describe('Update account', () =>{
    it('Acount not found', () =>{
        chai.request(app)
        .patch('/api/v1/accounts/12345678')
        .set('Authorization', token)
        .send({
            status:"activate"
        })
        .end((err, res) =>{
            expect(res).to.be.an('object');
            expect(res.status).to.deep.equal(404)
            expect(res.body.error).to.be.a('string')
            expect(res.body).to.have.property('error')
            expect(res.body).to.have.property('status')
        })
    })

    it('Account Status should be activate or dormant', () =>{
        chai.request(app)
        .patch('/api/v1/accounts/123456')
        .set('Authorization', token)
        .send({
            status:"ok"
        })
        .end((err, res) =>{
            expect(res.body).to.be.an('object')
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.a('string')
            expect(res.body).to.have.property('error')
            expect(res.body).to.have.property('status')
        })
    })

    it('Updated suucessfully', () =>{
        chai.request(app)
        .patch('/api/v1/accounts/123456')
        .set('Authorization', token)
        .send({
            status:"dormant"
        })
        .end((err, res) =>{
            expect(res.body).to.be.an('object')
            expect(res.status).to.be.equal(200)
            expect(res.body.message).to.be.a('string')
            expect(res.body).to.have.property('message')
            expect(res.body).to.have.property('status')
        })
    })
})

describe("Delete Account", () => {
    it('Account not found', () =>{
        chai.request(app)
        .delete('/api/v1/accounts/12378967')
        .set('Authorization', token)
        .end((err, res) =>{
            expect(res.body).to.be.an('object')
            expect(res.status).to.be.equal(404)
            expect(res.body.error).to.be.a('string')
            expect(res.body).to.have.property('error')
            expect(res.body).to.have.property('status')
        })
    })

    it('Account not found', () =>{
        chai.request(app)
        .delete('/api/v1/accounts/123456')
        .set('Authorization', token)
        .end((err, res) =>{
            expect(res.body).to.be.an('object')
            expect(res.status).to.be.equal(200)
            expect(res.body.message).to.be.a('string')
            expect(res.body).to.have.property('message')
            expect(res.body).to.have.property('status')
        })
    })
})
