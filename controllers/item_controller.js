const Item = require('../models/item')
const Bid = require('../models/bid')
const agenda = require('../agenda.js')

agenda.define('determine winner', function(job, done) {
  Item.findOneAndUpdate({
    _id: job.attrs.data.itemId
  }, {
    imgURL: 'winner process structure is up'
  }, (err, item) => {
    if (err) throw err
    else {
      job.remove(function(err) {
        if (!err) console.log('Successfully removed item-winner job from collection');
      })
      done();
    }
  })
 });

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
    // if (!req.user.type !== 'Sponsor') return false;
    req.body.itemDetails.sponsor = req.user.id; // sponsor's id
    let newItem = new Item(req.body.itemDetails);
    console.log('we are at createItem server side, newItem is...', newItem);
    Item.addItem(newItem, (err, item) => {
      if (err) {
        res.json({success: false, msg: 'Failed to add item'})
      } else {
        let timeToExecJob = new Date(item.bidEndMS)
        agenda.schedule(timeToExecJob, 'determine winner', { itemId: item._id })
        agenda.start()
        res.json({success: true})
      }
    })
  },

  bidItem: (req, res, next) => {
    console.log('we are at server side bidItem', req.user);
    let newBid = new Bid({
      amount: req.body.bidAmount,
      item: req.params.id,
      bidder: req.user.id
    })
    Bid.addBid(newBid, (err, bid) => {
      if (err) console.log('server - bid err is...', err);
      else {
        Item.findOneAndUpdate({
          _id: req.params.id
        }, {
          $push: { bids: bid._id }
        }, (err, item) => {
          if (err) throw err
          else console.log('we are done and item is...', item);
        })
      }
    })
  },

  determineWinner: (req, res, next) => {
    console.log('we are at determineWinner - server', req.body);
    Item.findOne({_id: req.body.itemId})
    .populate('bids', '_id amount')
    .exec((err, items) => {
      console.log('items.bids are...', items.bids);
      console.log('typeof items.bids are...', typeof items.bids);
      let consolidatedBids = {} // object of bid amount paired with no. of occurrence
      // let arrayOfAllBidAmounts = []
      for (let bid of items.bids) {
        if (!consolidatedBids[bid.amount]) {
          consolidatedBids[bid.amount] = 1
          // arrayOfAllBidAmounts.push(bid.amount)
        } else {
          consolidatedBids[bid.amount]++
        }
      }
      // check for unique bid
      let arrayOfBidOccurrence = Object.values(consolidatedBids)
      console.log('array is ', arrayOfBidOccurrence);
      Array.min = function( array ){
        return Math.min.apply( Math, array );
      };
      let smallestOccurrence = Array.min(arrayOfBidOccurrence)

      // find out which bid amount occurred that number of time(s)
      for (let bid in consolidatedBids) {
        if (consolidatedBids[bid] === smallestOccurrence) {
          
        }
      }
    })
  }
}

module.exports = itemController
