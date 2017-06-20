const mongoose = require('mongoose')

// Bid Item Schema

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true},
  sponsor: { type: mongoose.Schema.Types.ObjectId, ref: 'Sponsor' },
  url: { type: String, required: true},
  description: { type: String, required: true},
  bidStart: { type: String, required: true},
  bidStartUTC: { type: Number, required: true},
  bidEnd: { type: String, required: true},
  bidEndUTC: { type: Number, required: true},
  receipientCharity: { type: mongoose.Schema.Types.ObjectId, ref: 'Charity' }
})

const Item = module.exports = mongoose.model('Item', ItemSchema)

module.exports.addItem = function (newItem, callback) {
  newItem.save(callback)
}
