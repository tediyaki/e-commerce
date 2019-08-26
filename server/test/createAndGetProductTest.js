const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const Product = require('../models/product-model')
const fs = require('fs')

chai.use(chaiHttp)

describe('create and get product', function() {
    this.timeout(30000)

    after(() => {
        return Product.deleteMany()
    })

    describe('successful create then get product', () => {

        it('should return product data after created', done => {

            chai.request(app)
                .post('/product')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .field('name', 'flower')
                .field('description', 'blue flower bouquet')
                .field('stock', '22')
                .attach('image', fs.readFileSync(__dirname + '/testfile/flower.png'), 'flower.png')
                .end((err, res) => {
                    expect(res).to.have.status(201)
                    expect(res.body).to.haveOwnProperty('name')
                    expect(res.body).to.haveOwnProperty('description')
                    expect(res.body).to.haveOwnProperty('image')
                    expect(res.body).to.haveOwnProperty('stock')
                    done()
                })
                
        })    
        
        it('should get all product', done => {
            chai.request(app)
                .get('/product')
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
        })

    })

    describe('create product error', () => {
        it('should return error when file is not image', done => {
            chai.request(app)
                .post('/product')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .field('name', 'flower')
                .field('description', 'blue flower bouquet')
                .field('stock', '22')
                .attach('image', fs.readFileSync(__dirname + '/testfile/test.txt'), 'test.txt')
                .end((err, res) => {
                    expect(res.body).to.equal("Only images are allowed")
                    done()
                })
        })

        it('should return error when file is not image', done => {
            chai.request(app)
                .post('/product')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .field('name', 'flower')
                .field('description', 'blue flower bouquet')
                .field('stock', '-2')
                .attach('image', fs.readFileSync(__dirname + '/testfile/flower.png'), 'flower.png')
                .end((err, res) => {
                    expect(res.body).to.include("Invalid stock number")
                    done()
                })
        })

        it('should return error if name or description is empty', done => {
            chai.request(app)
                .post('/product')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .field('name', '')
                .field('description', '')
                .field('stock', '22')
                .attach('image', fs.readFileSync(__dirname + '/testfile/flower.png'), 'flower.png')
                .end((err, res) => {
                    expect(res).to.have.status(400)
                    expect(res.body).to.include("Please enter product name")
                    expect(res.body).to.include("Please enter product description")
                    done()
                })
        })
    })
})