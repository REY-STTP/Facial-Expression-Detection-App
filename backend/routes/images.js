const express = require('express')
const multer = require('multer')
const {
  getImages,
  getImageById,
  uploadImage,
  deleteImage,
  updateImage
} = require('../controllers/imageController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
const upload = multer({ dest: 'uploads/' })

// require auth for all workout routes
router.use(requireAuth)

// GET All Images Routes
router.get('/', getImages)

// GET a Image By ID Routes
router.get('/:id', getImageById)

// POST a New Image Routes
router.post('/', upload.single('file'), uploadImage)

// DELETE a Image By ID Routes
router.delete('/:id', deleteImage)

// UPDATE a Image By ID Routes
router.patch('/:id', upload.single('file'), updateImage)


module.exports = router