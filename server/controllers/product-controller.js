const Product = require('../models/product-model')

class ProductController {
    static addProduct(req, res, next) {
        const newProduct = {
            name: req.body.name,
            description: req.body.description,
            image: req.file.cloudStoragePublicUrl,
            stock: Number(req.body.stock)
        }

        Product.create(newProduct)
            .then(product => {
                res.status(201).json(product)
            })
            .catch(next)
    }

    static getProduct(req, res, next) {
        Product.find()
            .then(products => {
                res.json(products)
            })
            .catch(next)
    }

    static updateProduct(req, res, next) {
        const newProduct = {
            name: req.body.name,
            description: req.body.description,
            image: req.file.cloudStoragePublicUrl,
            stock: Number(req.body.stock)
        }
        Product.findByIdAndUpdate(req.params.id, {
            $set: newProduct
        }, {new: true})
            .then(updated => {
                res.json(updated)
            })
            .catch(next)
    }

    static deleteProduct(req, res, next) {
        Product.findByIdAndDelete(req.params.id)
            .then(() => {
                res.json({message: 'Product removed successfully'})
            })
            .catch(next)
    }
}

module.exports = ProductController