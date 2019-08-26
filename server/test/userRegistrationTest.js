const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user-model')

chai.use(chaiHttp)

describe("user registration test" , function() {
    this.timeout(20000)

    after(()=> {
        return User.deleteMany()
    })

    describe("register successfully", () => {
        it("should return new user data", done => {
            const user = {
                name: "john",
                email: "john@mail.com",
                password: "jon123"
            }
            chai.request(app)
                .post('/user/register')
                .send(user)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(201);
                    expect(res).to.be.an('object')
                    expect(res.body).to.haveOwnProperty('_id')
                    expect(res.body).to.haveOwnProperty('name')
                    expect(res.body).to.haveOwnProperty('email')
                    expect(res.body).to.haveOwnProperty('token')
                    expect(res.body).to.haveOwnProperty('cart')
                    expect(res.body._id).to.be.a('string')
                    expect(res.body.name).to.be.a('string')
                    expect(res.body.name).equal(user.name)
                    expect(res.body.email).to.be.a('string')
                    expect(res.body.email).equal(user.email)
                    expect(res.body.token).to.be.a('string')
                    expect(res.body.cart).to.be.an('array')
                    done()
                })
        });        
    });
    
    describe("registration validation error", () => {
        it("should return error if email is already registered", done => {
            const user = {
                name: "john",
                email: "john@mail.com",
                password: "jon123"
            }
            chai.request(app)
                .post('/user/register')
                .send(user)
                .end((err, res) => {
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an("array")
                    expect(res.body).to.include('This email is already registered')
                    done()
                })
        })


        it("should return error if email is invalid", done => {
            const user = {
                name: "john",
                email: "jonmail",
                password: "jon123"
            }
            chai.request(app)
                .post('/user/register')
                .send(user)
                .end((err, res) => {
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an("array")
                    expect(res.body).to.include('This email is not valid')
                    done()
                })
        })

        it("should return error if empty", done => {
            const user = {
                name: "",
                email: "",
                password: ""
            }
            chai.request(app)
                .post('/user/register')
                .send(user)
                .end((err, res) => {
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an("array")
                    expect(res.body).to.include('Please enter your name')
                    expect(res.body).to.include('Please enter your email')
                    expect(res.body).to.include('Please enter your password')
                    done()
                })
        })
    })
});