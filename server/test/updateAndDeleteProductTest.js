const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const Product = require('../models/product-model')
const fs = require('fs')

chai.use(chaiHttp)

describe('Delete product', function() {
    this.timeout(15000)

    before(() => {
        return Product.create({
            _id: '5d62c764687deb3148df538b',
            name: 'asd',
            description: 'just test',
            image: 'some link',
            stock: 2
        })
    })

    it('should update item successfully', done => {
        chai.request(app)
            .put('/product/5d62c764687deb3148df538b')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .field('name', 'flower')
            .field('description', 'blue flower bouquet')
            .field('stock', '12')
            .attach('image', fs.readFileSync(__dirname + '/testfile/flower.png'), 'flower.png')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.haveOwnProperty('name')
                expect(res.body).to.haveOwnProperty('description')
                expect(res.body).to.haveOwnProperty('image')
                expect(res.body).to.haveOwnProperty('stock')
                done()
            })
    })

    it('should delete item successfully', done => {
        chai.request(app)
            .delete('/product/5d62c764687deb3148df538b')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.haveOwnProperty('message')
                expect(res.body.message).to.equal('Product removed successfully')
                done()
            })
    })
})