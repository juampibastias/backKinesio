var express = require('express');
var router = express.Router();
  
  router.post('/agregar', async(req, res, next) => {
    try {
      if(req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
        await novedadesModel.insertNovedades(req.body);
        res.redirect('/admin/novedades');
  
      } else {
        res.render('admin/agregar', {
          layout: 'admin/layout',
          error: true,
          message: 'Todos los campos son requeridos'
        });
      }
    }catch (error) {
      console.log(error)
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true,
        message: 'No se cargo la novedad'
      });
    };
  });
  
  module.exports = router;