const mongoose = require('mongoose')

// Bid Schema

const BidSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  bidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const Bid = module.exports = mongoose.model('Bid', BidSchema)

module.exports.addBid = function(newBid, callback) {
  newBid.save(callback)
}
