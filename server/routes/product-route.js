const router = require('express').Router()
const path = require('path')
const ProductController = require('../controllers/product-controller')


const {sendUploadToGCS} = require('../middlewares/googleBucket')

const Multer = require('multer')
const multer = Multer({
        storage: Multer.MemoryStorage,
        limits: {
          fileSize: 5 * 1024 * 1024
        },
        fileFilter: function (req, file, callback) {
            var ext = path.extname(file.originalname);
            if(ext !== '.png' && ext !== '.jpg' &&  ext !== '.jpeg') {
                return callback(new Error('Only images are allowed'))
            }
            callback(null, true)
        }
      })

router.get('/', ProductController.getProduct)
router.post('/', multer.single('image'), sendUploadToGCS, ProductController.addProduct)
router.put('/:id', multer.single('image'), sendUploadToGCS, ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)

module.exports = router