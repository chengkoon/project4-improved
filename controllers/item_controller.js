const Item = require('../models/item')
const Sponsor = require('../models/sponsor')
const Bid = require('../models/bid')
const agenda = require('../agenda.js')

agenda.define('determine winner', function (job, done) {
  // Item.findOneAndUpdate({
  //   _id: job.attrs.data.itemId
  // }, {
  //   imgURL: 'winner process structure is up'
  // }, (err, item) => {
  //   if (err) throw err
  //   else {
  //     job.remove(function (err) {
  //       if (!err) console.log('Successfully removed item-winner job from collection')
  //     })
  //     done()
  //   }
  // })
  itemController.determineWinner(job.attrs.data.itemId)
  job.remove(function (err) {
    if (!err) console.log('Successfully removed item-winner job from collection')
  })
  done()
})

const itemController = {

  getItems: (req, res, next) => {
    Item.getAllItems({}, (err, items) => {
      if (err) res.json({success: false, msg: 'Failed to find items'})
      else {
        console.log('this works as well')
        res.json({items: items})
      }
    })
    // console.log('req from client side is...', req);
    // Item.find({}, (err, items) => {
    //   console.log('items after query are...', items);
    //   res.json({items: items})
    // })
  },

  getItem: (req, res, next) => {
    Item.findById(req.params.id, (err, item) => {
      if (err) res.json({success: false, msg: 'Failed to find item'})
      else {
        console.log('item detail got successfully and it is...', item)
        res.json({item: item})
      }
    })
  },

  createItem: (req, res, next) => {
    req.body.itemDetails.sponsor = req.user.id // sponsor's id

    Item.create(req.body.itemDetails).then(item => {
      let timeToExecJob = new Date(item.bidEndMS)
      agenda.schedule(timeToExecJob, 'determine winner', { itemId: item._id })
      agenda.start()
      return Sponsor.findOneAndUpdate({_id: req.user.id}, {$push: {itemsPosted: item._id}})
    }).then(sponsor => res.json({success: true}))
    .catch(err => {
      if (err) {
        console.log('preparing to return err...and err.errors["description"] is ', err.errors["description"]);
        for (let error in err.errors) {
          console.log('inside for loop, error is ', err.errors[error].message); // error is description
        }
        return res.json({success: false, err: err})
      }
    })
  },

  bidItem: (req, res, next) => {
    console.log('we are at server side bidItem', req.user)
    let newBid = new Bid({
      amount: req.body.bidAmount,
      item: req.params.id,
      bidder: req.user.id
    })
    Bid.addBid(newBid, (err, bid) => {
      if (err) res.json({success: false, msg: 'Bid placed unsuccessfully'})
      else {
        Item.findOneAndUpdate({
          _id: req.params.id
        }, {
          $push: { bids: bid._id }
        }, (err, item) => {
          if (err) throw err
          else res.json({success: true, msg: 'Bid placed successfully'})
        })
      }
    })
  },

  determineWinner: (itemId) => {
    Item.findOne({_id: itemId})
    .populate('bids', '_id amount')
    .exec()
    .then(item => {
      let consolidatedBids = {} // object of bid amount paired with no. of occurrence
      // let arrayOfAllBidAmounts = []
      for (let bid of item.bids) {
        if (!consolidatedBids[bid.amount]) {
          consolidatedBids[bid.amount] = 1
          // arrayOfAllBidAmounts.push(bid.amount)
        } else {
          consolidatedBids[bid.amount]++
        }
      }

      // check for unique bid
      let arrayOfBidOccurrence = Object.values(consolidatedBids)
      Array.min = function (array) {
        return Math.min.apply(Math, array)
      }
      let smallestOccurrence = Array.min(arrayOfBidOccurrence)
      let winningBidAmount = ''
      let currentHighestUniqueBid = 0
      // find out which bid amount occurred that number of time(s)
      for (let bidAmount in consolidatedBids) {
        if ((consolidatedBids[bidAmount] === smallestOccurrence) && (parseFloat(bidAmount) > currentHighestUniqueBid)) {
          currentHighestUniqueBid = parseFloat(bidAmount)
        }
        winningBidAmount = currentHighestUniqueBid
      }
      let arrayOfWinners = [] // 'array' as there could be more than 1 potential winners
      // if there is ZERO unique bid
      for (let bid of item.bids) {
        if (bid.amount === winningBidAmount) {
          arrayOfWinners.push(bid)
        }
      }
      if (arrayOfWinners.length === 1) {
        item.winningBid = arrayOfWinners[0]
      } else {
        item.winningBid = arrayOfWinners[Math.floor(Math.random() * arrayOfWinners.length)]
      }
      item.save()
    }).catch(err => err)
  },
  getWinnerDetails (req, res) {
    Item.findOne({_id: req.params.id})
    .populate({
      path: 'winningBid',
      populate: { path: 'bidder' } // 'nested' population
    })
    .exec()
    .then(item => {
      console.log('getWinnerDetails item is ', item);
      res.json({winningBid: item.winningBid.amount, winner: item.winningBid.bidder.username})
    })
  },
  getAllBidsDetails (req, res) {
    Item.findOne({_id: req.params.id})
    // .populate('bids')
    .populate({
      path: 'bids',
      populate: { path: 'bidder' }
    })
    .exec()
    .then(item => {
      // console.log('getAllBidsDetails item is ', item);
      let output = item.bids.map(bid => {
        let tempObj = {}
        tempObj.bidAmount = bid.amount
        tempObj.bidder = bid.bidder.username
        return tempObj
      })
      res.json({allBids: output})
    })
  }
}

module.exports = itemController
