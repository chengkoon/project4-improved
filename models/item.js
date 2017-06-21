const mongoose = require('mongoose')

// Bid Item Schema

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sponsor: { type: mongoose.Schema.Types.ObjectId, ref: 'Sponsor' },
  productURL: { type: String, required: true },
  imgURL: { type: String, required: true },
  description: { type: String, required: true },
  bidStart: { type: String, required: true }, // momentjs
  bidEnd: { type: String, required: true} , // momentjs
  // receipientCharity: { type: mongoose.Schema.Types.ObjectId, ref: 'Charity' }
  receipientCharity: { type: String, required: true }
})

const Item = module.exports = mongoose.model('Item', ItemSchema)

module.exports.addItem = function (newItem, callback) {
  newItem.save(callback)
}

module.exports.getAllItems = function (condition, callback) {
  Item.find(condition).limit(4).exec(callback);
}
