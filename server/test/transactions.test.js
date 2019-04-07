import chai from 'chai'
import chaiHttp from 'chai-http'
import jwt from 'jsonwebtoken'
import app from '../app'

const { expect } = chai
chai.use(chaiHttp)

const payload  = {
    firstName : "Joseph",
    lastName : "Joe",
    email : "joe1@gmail.com",
    password : "123456"
}

let token = jwt.sign(payload, 'YOU_OWN_YOUR_OWN', { expiresIn : '24h' })

before('Signin', () =>{
    const user = {
        email : "joe1@gmail.com",
        password : "123456"
    }
    chai.request(app)
    .post('/api/v1/auth/signin')
    .send(user)
    .end((err, res) =>{
        expect(res.body).to.be.an("object")
        expect(res.body).to.have.property("status")
        expect(res.body.status).to.be.equal(200)
    })
})

// Test for transactions
describe('Credit account', () =>{
    it('Should credit account', () =>{
        chai.request(app)
        .get('/api/v1/accounts')
        .set('Authorization', token)
        .end((err, res) =>{
            chai.request(app)
            .post('/api/v1/accounts/' + res.body.data[0].accountNumber + '/credit')
            .set('Authorization', token)
            .send({ 
                amount : 300000,
                cashier : 2
             })
            .end((err, res) =>{
                expect(res.body.status).to.be.equal(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('status')
                expect(res.body).to.have.property('data')
            })
        })
    })

    it('Should debit account', () =>{
        chai.request(app)
        .get('/api/v1/accounts')
        .set('Authorization', token)
        .end((err, res) =>{
            chai.request(app)
            .post('/api/v1/accounts/' + res.body.data[0].accountNumber + '/debit')
            .set('Authorization', token)
            .send({ 
                amount : 10000,
                cashier : 2
             })
            .end((err, res) =>{
                expect(res.body.status).to.be.equal(201)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('status')
                expect(res.body).to.have.property('data')
            })
        })
    })

    it('Insuficient balance', () =>{
        chai.request(app)
        .get('/api/v1/accounts')
        .set('Authorization', token)
        .end((err, res) =>{
            chai.request(app)
            .post('/api/v1/accounts/' + res.body.data[0].accountNumber + '/debit')
            .set('Authorization', token)
            .send({ 
                amount : 400000,
                cashier : 2
             })
            .end((err, res) =>{
                expect(res.body.status).to.be.equal(400)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('status')
                expect(res.body).to.have.property('error')
            })
        })
    })

    it('amount and cashier are required', () =>{
        chai.request(app)
        .get('/api/v1/accounts')
        .set('Authorization', token)
        .end((err, res) =>{
            chai.request(app)
            .post('/api/v1/accounts/' + res.body.data[0].accountNumber + '/debit')
            .set('Authorization', token)
            .end((err, res) =>{
                expect(res.body.status).to.be.equal(400)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('status')
                expect(res.body).to.have.property('error')
            })
        })
    })

    it('Amount and cashier are required', () =>{
        chai.request(app)
        .get('/api/v1/accounts')
        .set('Authorization', token)
        .end((err, res) =>{
            chai.request(app)
            .post('/api/v1/accounts/' + res.body.data[0].accountNumber + '/credit')
            .set('Authorization', token)
            .end((err, res) =>{
                expect(res.body.status).to.be.equal(400)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('status')
                expect(res.body).to.have.property('error')
            })
        })
    })

    it('Account not found', () =>{
        chai.request(app)
        .get('/api/v1/accounts')
        .set('Authorization', token)
        .end((err, res) =>{
            chai.request(app)
            .post('/api/v1/accounts/13/credit')
            .set('Authorization', token)
            .send({ 
                amount : 10000,
                cashier : 2
             })
            .end((err, res) =>{
                expect(res.body.status).to.be.equal(404)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('status')
                expect(res.body).to.have.property('error')
            })
        })
    })

    it('Account not found', () =>{
        chai.request(app)
        .get('/api/v1/accounts')
        .set('Authorization', token)
        .end((err, res) =>{
            chai.request(app)
            .post('/api/v1/accounts/13/debit')
            .set('Authorization', token)
            .send({ 
                amount : 10000,
                cashier : 2
             })
            .end((err, res) =>{
                expect(res.body.status).to.be.equal(404)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('status')
                expect(res.body).to.have.property('error')
            })
        })
    })

    it('Amount should be number', () =>{
        chai.request(app)
        .get('/api/v1/accounts')
        .set('Authorization', token)
        .end((err, res) =>{
            chai.request(app)
            .post('/api/v1/accounts/' + res.body.data[0].accountNumber + '/credit')
            .set('Authorization', token)
            .send({ 
                amount : "number please",
                cashier : 2
             })
            .end((err, res) =>{
                expect(res.body.status).to.be.equal(400)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('status')
                expect(res.body).to.have.property('error')
            })
        })
    })

    it('Cashier should be number', () =>{
        chai.request(app)
        .get('/api/v1/accounts')
        .set('Authorization', token)
        .end((err, res) =>{
            chai.request(app)
            .post('/api/v1/accounts/' + res.body.data[0].accountNumber + '/credit')
            .set('Authorization', token)
            .send({ 
                amount : 100000,
                cashier : "Number please"
             })
            .end((err, res) =>{
                expect(res.body.status).to.be.equal(400)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('status')
                expect(res.body).to.have.property('error')
            })
        })
    })
})
