const router = require('express').Router();


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