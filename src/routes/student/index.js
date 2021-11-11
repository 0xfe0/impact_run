const router = require('express').Router();

//import the model
let Students = require('./db').students;


/**
 * @api {get} /ping Ping
 * @apiName Ping
 * @apiPermission None
 * @apiGroup General
 * 
 * @apiSuccess ping "its's up!"
 * 
 */
router.get('/', (req, res, next) => {
  return res.json({ ping: "It's up!" });
});

module.exports = router;