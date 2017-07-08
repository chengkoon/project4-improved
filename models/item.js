const mongoose = require('mongoose')

// Item Schema

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sponsor: { type: mongoose.Schema.Types.ObjectId, ref: 'Sponsor' },
  sponsorName: { type: String, required: true },
  logoURL: { type: String, required: false },
  companyURL: { type: String, required: false },
  productURL: { type: String, required: true },
  imgURL: { type: String, required: false },
  description: { type: String, minlength: [100, 'minimum description should be 100 characters long'], required: true },
  selectedStartDate: { type: String, required: true }, // momentjs
  selectedStartTime: { type: String, required: true }, // momentjs
  selectedEndDate: { type: String, required: true }, // momentjs
  selectedEndTime: { type: String, required: true }, // momentjs
  bidStartMS: { type: Number, required: true }, // momentjs
  bidEndMS: { type: Number, required: true }, // momentjs
  // receipientCharity: { type: mongoose.Schema.Types.ObjectId, ref: 'Charity' }
  bids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bid' }],
  winningBid: { type: mongoose.Schema.Types.ObjectId, ref: 'Bid' },
  receipientCharity: { type: String, required: true }
})

const Item = module.exports = mongoose.model('Item', ItemSchema)

module.exports.getAllItems = function (condition, callback) {
  Item.find(condition).exec(callback)
}
