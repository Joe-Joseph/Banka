import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../app'

const { expect } = chai
chai.use(chaiHttp)

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
        })
    })
    
})