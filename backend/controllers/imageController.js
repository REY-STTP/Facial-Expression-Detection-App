const fs = require('fs')
const axios = require('axios')
const FormData = require('form-data')
const mongoose = require('mongoose')
const Image = require('../models/imageModel')

const FACEPP_API_URL = 'https://api-us.faceplusplus.com/facepp/v3/detect'
const FACEPP_API_KEY = process.env.FACEPP_API_KEY
const FACEPP_API_SECRET = process.env.FACEPP_API_SECRET

const emotionTranslation = {
    anger: 'Marah',
    disgust: 'Jijik',
    fear: 'Takut',
    happiness: 'Bahagia',
    neutral: 'Netral',
    sadness: 'Sedih',
    surprise: 'Terkejut'
}

const translateEmotion = (emotion) => {
    return Object.fromEntries(
        Object.entries(emotion).map(([key, value]) => [emotionTranslation[key] || key, value])
    )
}

const formatImage = (image) => ({
    _id: image._id,
    filename: image.filename,
    ekspresi_wajah: image.ekspresi_wajah,
    createdAt: image.createdAt,
    updatedAt: image.updatedAt,
    __v: image.__v
})

const detectEmotionFromFile = async (filePath) => {
    const form = new FormData()
    form.append('api_key', FACEPP_API_KEY)
    form.append('api_secret', FACEPP_API_SECRET)
    form.append('image_file', fs.createReadStream(filePath))
    form.append('return_attributes', 'emotion')

    const response = await axios.post(FACEPP_API_URL, form, {
        headers: form.getHeaders()
    })

    const faces = response.data.faces
    return faces.length > 0 ? translateEmotion(faces[0].attributes.emotion) : null
}

// Get All Images
const getImages = async (req, res) => {
    try {
        const user_id = req.user._id
        const images = await Image.find({ user_id }).sort({ createdAt: -1 })
        const formattedImages = images.map(formatImage)
        res.status(200).json(formattedImages)
    } catch (err) {
        res.status(500).json({ error: 'Terjadi kesalahan pada server.', details: err.toString() })
    }
}

// GET an Image By ID
const getImageById = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Gambar tidak ditemukan.' })
    }

    try {
        const image = await Image.findById(id)

        if (!image) {
            return res.status(404).json({ error: 'Gambar tidak ditemukan.' })
        }

        res.status(200).json(formatImage(image))
    } catch (err) {
        res.status(500).json({ error: 'Terjadi kesalahan pada server.', details: err.toString() })
    }
}

// POST a New Image
const uploadImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'File gambar tidak ditemukan.' })
    }

    const filePath = req.file.path
    const fileName = req.file.filename

    try {
        const expression = await detectEmotionFromFile(filePath)

        if (expression) {
            const user_id = req.user._id
            const imageDocument = new Image({
                filename: fileName,
                ekspresi_wajah: expression,
                user_id
            })

            const savedImage = await imageDocument.save()

            res.status(200).json({
                message: 'Gambar dan ekspresi berhasil disimpan!',
                ...formatImage(savedImage)
            })
        } else {
            res.status(400).json({ error: 'Tidak ada wajah terdeteksi dalam gambar.' })
        }
    } catch (err) {
        res.status(500).json({ error: 'Terjadi kesalahan pada server.', details: err.toString() })
    } finally {
        fs.unlink(filePath, (err) => {
            if (err) console.error('Gagal menghapus file:', err)
        })
    }
}

// DELETE an Image By ID
const deleteImage = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Gambar tidak ditemukan.' })
    }

    try {
        // Cari gambar berdasarkan ID dan user_id
        const image = await Image.findOneAndDelete({ _id: id, user_id: req.user._id })

        if (!image) {
            return res.status(404).json({ error: 'Gambar tidak ditemukan.' })
        }

        res.status(200).json({
            message: 'Gambar dan ekspresi berhasil dihapus!',
            ...formatImage(image)
        })
    } catch (err) {
        res.status(500).json({ error: 'Terjadi kesalahan pada server.', details: err.toString() })
    }
}

// UPDATE an Image By ID
const updateImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'File gambar tidak ditemukan.' })
    }

    const filePath = req.file.path
    const fileName = req.file.filename

    try {
        // Cari gambar berdasarkan ID dan user_id
        const image = await Image.findOne({ _id: req.params.id, user_id: req.user._id })

        if (!image) {
            return res.status(404).json({ error: 'Gambar tidak ditemukan.' })
        }

        // Deteksi emosi baru
        const expression = await detectEmotionFromFile(filePath)

        if (expression) {
            // Update gambar
            image.filename = fileName
            image.ekspresi_wajah = expression

            const updatedImage = await image.save()

            res.status(200).json({
                message: 'Gambar dan ekspresi berhasil diupdate!',
                ...formatImage(updatedImage)
            })
        } else {
            res.status(400).json({ error: 'Tidak ada wajah terdeteksi dalam gambar baru.' })
        }
    } catch (err) {
        res.status(500).json({ error: 'Terjadi kesalahan pada server.', details: err.toString() })
    } finally {
        fs.unlink(filePath, (err) => {
            if (err) console.error('Gagal menghapus file:', err)
        })
    }
}

module.exports = {
    getImages,
    getImageById,
    uploadImage,
    deleteImage,
    updateImage
}