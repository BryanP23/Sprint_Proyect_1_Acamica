const express = require("express");
const pRoute = express.Router();
const { getPagos, addPagos } = require("../models/pagos.model.js");
const {obtenerUsuarios} = require("../models/usuario.model.js")

//ruta para obtener los medios de pago 
/**
 * @swagger
 * /mediosDePago:
 *  get:
 *      summary: obtiene todos los medios de pago disponibles
 *      tags: [Medios De Pago]
 *      responses:
 *          200:
 *              description: Medios de pago disponibles obtenidos con exito
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/payment'
 *          401:
 *              description: solo disponible para usuarios logueados
 */

pRoute.get('/', (req,res) => {
   res.json(getPagos());
});

pRoute.use('/', (req, res, next) => {
  real = obtenerUsuarios().some(u => u.username === req.auth.user && u.isAdmin == true);

  if(real){
      return next();
  }else{
      return res.status(401).json('No estas autorizado');
  };
});

//ruta para agregar medios de pago

/**
 * @swagger
 * /mediosDePago:
 *  post:
 *      summary: Agrega un nuevo medio de pago a la aplicacion (solo habilitado para el administrador)
 *      tags: [Medios De Pago]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/payment'
 *      responses:
 *          201:
 *              description: Medio de pago agregado exitosamente
 *          400:
 *              description: Datos no validos
 *          401:
 *              description: logueo de administrador inválido
 */

pRoute.post('/', (req,res) => {
  const { medioDePago } = req.body;
  if(medioDePago){
      addPagosgetPagos(medioDePago)
      res.json(getPagos())
  }else{
      res.status(404).json('ingresa el medio de pago para continuar')
  }

});

// ruta para actualizar medios de pago
/**
 * @swagger
 * 
 * /mediosDePago/nuevoMedioDePago/{id}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id del medio de pago a editar
 *        required: true
 *        type: integer
 *
 *      summary: modifica un medio de pago ya creado (solo habilidato para administrador)
 *      tags: [Medios De Pago]
 *      requestBody:
 *          description: El medio de pago  modificado 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/payment'
 *      responses:
 *          200:
 *              description: medio de pago modificado
 *          400:
 *              description: entrada no valida
 *          401:
 *              description: acceso denegado
 */

pRoute.put('/nuevoMedioDePago/:id', (req,res) => {
  const mediosDePago = getPagos().find( m => m.id == req.params.id);
  mediosDePago.medioDePago = req.body.medioDePago;
  res.json(getPagos());
});

// ruta para eliminar un medio de pago
/**
 * @swagger
 * 
 * /mediosDePago/{id}:
 *  delete:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id del medio de pago a eliminar
 *        required: true
 *        type: integer
 *
 *      summary: elimina un medio de pago ya creado (solo habilidato para administrador)
 *      tags: [Medios De Pago]
 *      requestBody:
 *          description: El medio de pago ha eliminar
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/payment'
 *      responses:
 *          200:
 *              description: medio de pago eliminado
 *          400:
 *              description: entrada no valida
 *          401:
 *              description: acceso denegado
 */
pRoute.delete('/:id', (req,res) => {
  const real = getPagos().some(r => r.id == parseInt(req.params.id));
  if (real){
    getPagos().splice(getPagos().lastIndexOf(getPagos().find(r => r.id === parseInt(req.params.id))),1);
    res.json(getPagos());
  } else {
    res.status(400).json(' id desconocido');
  };
});

/**
 * @swagger
 * tags:
 *  name: 'Medios De Pago'
 *  descripcion: en relacion con los medios de pago de la aplicacion
 * 
 * components:
 *  schemas:
 *      payment:
 *          type: object
 *          required:
 *              -medioDePago
 *          properties:
 *              medioDePago:
 *                  type: string
 *      productResponse:
 *          type: object
 *          required:
 *              -medioDePago
 *          properties:
 *              medioDePago:
 *                  type: string
 *
 */


module.exports = pRoute;
