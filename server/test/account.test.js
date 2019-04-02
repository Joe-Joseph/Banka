// import chai from 'chai'
// import chaiHttp from 'chai-http'
// import app from '../app'

// const { expect } = chai
// chai.use(chaiHttp)

// chai.use(chaiHttp);
// chai.use(chaiHttp);

// let token;

// before("User Login",(done)=>{
//         const user = {
//           email: "joe@gmail.com",
//           password: "123456"
//         };
//     chai.request(app)
//     .post("/api/v1/auth/signin")
//     .set("Content-type","application/json")
//     .set("Accept","application/json")
//     .send(user)
//     .end((err,res)=>{
//         if(err){
//             done(err)
//         }
//         token=res.body.token;
//         expect(res.body).to.be.an("object")
//         expect(res.body).to.have.property("status")
//         expect(res.body).to.have.property("error")
//         expect(res.body.status).to.be.equal(400)
//         done()
//     })
// })

// describe('Create account', () =>{
//   it('Correct credentials', (done) =>{
//     chai.request(app)
//     .post("/api/v1/auth/signin")
//     .send({
//         email: "joe@gmail.com",
//         password:"123456"
//     })
//     .end((err,res)=>{
//         if(err){
//             done(err);
//         }
//         expect(res.body).to.be.an("object");
//         expect(res.body).to.have.property("status");
//         expect(res.body).to.have.property("message");
//         expect(res.body).to.have.property("data");
//         expect(res.body.status).to.be.equal(200);
//         done();
//     })
//   })

//     it('Create account', () =>{
//         chai.request(app)
//         .post('/api/v1/accounts')
//         .set("Content-type","application/json")
//         .set("Authorization",token)
//         .send({
//             accountNumber : 123456,
//             firstName : "Joseph",
//             lastName : "Joe",
//             email : "joe@gmail.com",
//             type : "current",
//             openingBalance : 300000
//         })
//         .end((err, res) =>{
//             expect(res.body.status).to.be.equal(401)
//             expect(res.body).to.have.property('error')
//             expect(res.body).to.have.property('status')
//             expect(res.body).to.be.an('object')
//         })
//     })
// })