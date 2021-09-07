var express = require('express');
var router = express.Router();
  
  router.post('/agregarejercicios', async(req, res, next) => {
    try {
      if(req.body.ejercicio != "" && req.body.descripcion != "" && req.body.repeticion != "") {
        await ejerciciosModel.insertEjercicios(req.body);
        res.redirect('/admin/ejercicios');
  
      } else {
        res.render('admin/agregarejercicios', {
          layout: 'admin/layoutejercicios',
          error: true,
          message: 'Todos los campos son requeridos'
        });
      }
    }catch (error) {
      console.log(error)
      res.render('admin/agregarejercicio', {
        layout: 'admin/layoutejercicios',
        error: true,
        message: 'No se cargo la novedad'
      });
    };
  });
  
  module.exports = router;