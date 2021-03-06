const express = require('express');
const jwt = require('express-jwt');
const router = express.Router();
const itemController = require('../controllers/item_controller');

const cloudinary = require('cloudinary');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  // cloud_name: "drkrmbkx3",
  api_key: process.env.CLOUDINARY_API_KEY,
  // api_key: "495267452236955",
  api_secret: process.env.CLOUDINARY_API_SECRET
  // api_secret: "s9zSYSSICdA_EOOPR2I5Ve-lwIo"
});
router.post('/item/determineWinner', itemController.determineWinner);
router.get('/items', itemController.getItems);
router.get('/item/:id', itemController.getItem);

router.post('/item/newImage', upload.single('myFile'), function(req, res) {
  console.log('we are in /newImage');
    cloudinary.uploader.upload(req.file.path, function(result) {
      console.log('result is...', result);
      res.send(result);
    });
});
router.post('/item/newLogo', upload.single('myFile'), function(req, res) {
  console.log('we are in /newImage');
    cloudinary.uploader.upload(req.file.path, function(result) {
      console.log('result is...', result);
      res.send(result);
    });
});

router.get('/item/winner/:id', itemController.getWinnerDetails);
router.get('/item/bids/:id', itemController.getAllBidsDetails);
router.post('/item/:id/bid', jwt({secret: process.env.secret}), itemController.bidItem);
router.post('/items/create', jwt({secret: process.env.secret}), itemController.createItem);


module.exports = router
