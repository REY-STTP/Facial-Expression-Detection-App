const mongoose = require('mongoose')

const Schema = mongoose.Schema

const imageSchema = new Schema({
  filename: {
    type: String,
    required: true
  },
  ekspresi_wajah: {
    Marah: { type: Number, required: false },
    Jijik: { type: Number, required: false },
    Takut: { type: Number, required: false },
    Bahagia: { type: Number, required: false },
    Netral: { type: Number, required: false },
    Sedih: { type: Number, required: false },
    Terkejut: { type: Number, required: false }
  },
  user_id: {
      type: String,
      required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Image', imageSchema)