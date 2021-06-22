var express = require('express');
var router = express.Router();
var User =  require('../models/User');


/* GET users listing. */
router.get('/', function(req, res, next) {


  new User().with(['roles', 'role']).get().then((users) => {

    res.json(users)

  }).catch((err) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(400)
    res.render('error', err)
  });

});

router.get('/:id', function(req, res, next) {
  new User({}, req, res).with(['role']).find(req.params.id).then((user) => {
    res.json(user);
  })
});

module.exports = router;
