const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user-model')

chai.use(chaiHttp)

describe("user login test", function() {
    this.timeout(20000)

    before(() => {
        return User.create({
            name: "Test",
            email: "test@email.com",
            password: "test123"
        })
    })

    after(()=> {
        return User.deleteMany()
    })

    describe("succesful login", () => {
        it("should return user info", done => {
            const user = {
                email: "test@email.com",
                password: "test123"
            }
            chai.request(app)
                .post("/user/login")
                .type('form')
                .send(user)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200);
                    expect(res).to.be.an('object')
                    expect(res.body).to.haveOwnProperty('_id')
                    expect(res.body).to.haveOwnProperty('name')
                    expect(res.body).to.haveOwnProperty('email')
                    expect(res.body).to.haveOwnProperty('token')
                    expect(res.body).to.haveOwnProperty('cart')
                    expect(res.body._id).to.be.a('string')
                    expect(res.body.name).to.be.a('string')
                    expect(res.body.email).to.be.a('string')
                    expect(res.body.email).equal(user.email)
                    expect(res.body.token).to.be.a('string')
                    expect(res.body.cart).to.be.an('array')
                    done()
                })
        })
    })

    describe('login validation error', () => {
        it("should return error if wrong email or password", done => {
            const user = {
                email: "test@email.com",
                password: "err404"
            }
    
            chai.request(app)
                .post("/user/login")
                .type('form')
                .send(user)
                .end((err, res) => {
                    expect(res).to.be.an("object")
                    expect(res).to.have.status(400)
                    expect(res.body).to.equal("Wrong email / password")
                    expect(res.body).to.have.lengthOf.at.least(1)
                    done()
                })
        })
    
        it("should return error if email or password is empty", done => {
            const user = {
                email: "",
                password: ""
            }
    
            chai.request(app)
                .post("/user/login")
                .type('form')
                .send(user)
                .end((err, res) => {
                    expect(res).to.be.an("object")
                    expect(res).to.have.status(400)
                    expect(res.body).to.equal("Wrong email / password")
                    expect(res.body).to.have.lengthOf.at.least(1)
                    done()
                })
        })
    })
})