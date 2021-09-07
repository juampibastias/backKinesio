var express = require('express');
var router = express.Router();
var ejerciciosModel = require('../../models/ejerciciosModel');
var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

router.get('/', async function(req, res, next) {



    var ejercicios = await ejerciciosModel.getEjercicios();
  
    ejercicios = ejercicios.map(novedad => {
      if(novedad.img_id) {
        const imagen = cloudinary.image(novedad.img_id, {
          width: 100,
          height:100,
          crop:'fill'
        });
        return {
          ...novedad,
          imagen
        }
      } else {
        return {
          ...novedad,
          imagen:''
        }
      }
    });
  
    res.render('admin/ejercicios', {
        layout: 'admin/layoutejercicios',
        usuario: req.session.nombre,
        ejercicios
    
    })
  });
  
  router.get('/agregarejercicios', (req, res, next) => {
    res.render('admin/agregarejercicios', {
      layout: 'admin/layoutejercicios'
      })
  });
  
  router.post('/agregarejercicios', async (req,res,next) => {
    try{
        if(req.body.ejercicio != "" && req.body.descripcion !="" && req.body.repeticion !="") {
            await ejerciciosModel.insertEjercicios(req.body);
            res.redirect('/admin/ejercicios')
        } else {
            res.render('admin/agregarejercicios', {
                layout: 'admin/layoutejercicios',
                error: true,
                message: 'Todos los campos son requeridos'
            })
        }
    } catch (error) {
        console.log(error)
        res.render('admin/agregarejercicios', {
            layout: 'admin/layoutejercicios',
            error: true,
            message: 'No se cargo la novedad'
        });
    }
  });
  
  
  
  router.post('/agregarejercicios', async(req, res, next) => {
    try {
      var img_id = '';
      if(req.files && Object.keys(req.files).length > 0 ) {
        imagen = req.files.imagen;
        img_id = (await uploader(imagen.tempFilePath)).public_id; 
      }
  
  
      if(req.body.ejercicio != "" && req.body.descripcion != "" && req.body.repeticion != "") {
       
        await ejerciciosModel.insertEjercicios({
          ...req.body,
          img_id
        });
  
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
      res.render('admin/agregarejercicios', {
        layout: 'admin/layoutejercicios',
        error: true,
        message: 'No se cargo la novedad'
      });
    };
  });
  
  router.get('/eliminarejercicios/:id', async (req, res, next) => {
    var id = req.params.id;
    let novedad = await ejerciciosModel.getEjerciciosById(id);
    if(novedad.img_id) {
      await (destroy(novedad.img_id));
    }
    await ejerciciosModel.deleteEjerciciosById(id);
    res.redirect('/admin/ejercicios');
  });
  
  router.get('/modificarejercicios/:id', async (req, res, next) => {
    let id = req.params.id;
    console.log(req.params.id);
    let novedad = await ejerciciosModel.getEjerciciosById(id);
  
    console.log(req.params.id);
    res.render('admin/modificarejercicios', {
      layout: 'admin/layoutejercicios',
      novedad
    })
  })
  
  router.post('/modificarejercicios', async(req, res, next) => {
    try {
      
      let img_id = req.body.img_original;
      let borrar_img_vieja = false;
      if (req.body.img_delete === "1") {
        img_id = null;
        borrar_img_vieja = true;
      } else {
        if (req.files && Object.keys(req.files).length > 0) {
          imagen = req.files.imagen;
          img_id = (await uploader(imagen.tempFilePath)).public_id;
          borrar_img_vieja = true;
        }
      }
      if  (borrar_img_vieja && req.body.img_original) {
        await (destroy(req.body.img_original));
      }
      let obj = {
        ejercicio: req.body.ejercicio,
        descripcion: req.body.descripcion,
        repeticion: req.body.repeticion,
        img_id
      }
  
      await ejerciciosModel.modificarEjerciciosById(obj, req.body.id);
      res.redirect('/admin/ejercicios');
    
    } catch (error) {
      console.log(error)
      res.render('admin/modificarejercicios', {
        layout: 'admin/layoutejercicios',
        error: true, 
        message:'No se modifico la novedad'
      })
    }
  })
  
  module.exports = router;