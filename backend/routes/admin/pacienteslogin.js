var express = require('express');
var router = express.Router();
var pacientesModel = require('./../../models/pacientesModel');

router.get('/', function(req,res,next) {
   res.render('admin/pacienteslogin', {
   layout: 'admin/layoutpacientes'
   });
});

router.post('/', async (req, res, next) => {
   try {
      var usuario = req.body.usuario;
      var password = req.body.password;
      var data = await pacientesModel.getUserByUsernameAndPassword(usuario, password);
      if (data != undefined) {
         req.session.id_usuario = data.id;
         req.session.nombre = data.usuario;
         res.redirect('/admin/athome');
      } else {
         res.render('admin/pacienteslogin', {
            layout: 'admin/layoutpacientes',
            error: true
         });
      }
      } catch (error) {
         console.log(error);
   }
});

router.get('/logout', function(req, res, next) {
   req.session.destroy();
   res.render('admin/pacienteslogin', {
      layout: 'admin/layoutpacientes'
   });
});

module.exports = router;