var express = require('express');
var router = express.Router();
var athomeModel = require('./../../models/athomeModel');

router.get('/', async function(req, res, next) {
  var athome = await athomeModel.getAthome();
  res.render('admin/principal', {
  layout: 'admin/layout',
  usuario: req.session.nombre,
  athome
  });
});


 


module.exports = router;