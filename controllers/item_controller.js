const Item = require('../models/item')

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
    console.log('server side getItem - req.body is...', req.body);
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
    console.log('we are at server side createItem');
    console.log('received req.user is...', req.user)
    req.body.itemDetails.sponsor = req.user.id; // sponsor's id
    let newItem = new Item(req.body.itemDetails);
    Item.addItem(newItem, (err, item) => {
      if (err) {
        res.json({success: false, msg: 'Failed to add item'})
      } else {
        res.json({success: true})
      }
    })
  },

  bidItem: (req, res, next) => {

  }
}

module.exports = itemController
