const express = require('express');
const router = express.Router();

const {obtenerUsuarios, nuevoUsuario } = require('../models/usuario.model.js');


//modifica los datos del usuario
/**
 * @swagger
 * 
 * /users/{id}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id a editar
 *        required: true
 *        type: string
 *
 *      summary: modifica un usuario ya creado
 *      tags: [Usuarios]
 *      requestBody:
 *          description: los atributos del usuario a modificar
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/usuario'
 *      responses:
 *          200:
 *              description: usuario modificado
 *          400:
 *              description: entrada no valida
 *          401:
 *              description: acceso denegado
 */

router.put('/:id', (req,res) => {
    const real = obtenerUsuarios().some(r => r.id == req.params.id);
    if(real){
        const nUsuario = req.body;
        obtenerUsuarios().forEach(usuario => {
            if(usuario.id == req.params.id){
                usuario.email = nUsuario.email ? nUsuario.email : usuario.email;
                usuario.username = nUsuario.username ? nUsuario.username : usuario.username;
                usuario.password = nUsuario.password ? nUsuario.password : usuario.password;
                usuario.telefono = nUsuario.telefono ? nUsuario.telefono : usuario.telefono;
                usuario.direccion = nUsuario.direccion ? nUsuario.direccion : usuario.direccion;
                res.json(obtenerUsuarios().find(r => r.id == req.params.id));
            }
        });
    }else {
        res.status(404).json('Usuario desconocido');
    }
});

router.use('/', (req, res, next) => {
    if(obtenerUsuarios().some(u => u.username === req.auth.user && u.isAdmin == true)){
        return next();
    }else{
        return res.status(401).json(' No estas atorizado para realizar esta accion');
    };
});

/**
 * @swagger
 * 
 * /users/{id}:
 *  delete:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id del usuario a eliminar
 *        required: true
 *        type: integer
 *
 *      summary: elimina un usario ya creado (solo habilitada para administrador)
 *      tags: [Usuarios]
 *      requestBody:
 *          description: no necesitas ingresar atributos del usuario a eliminar, con el id es suficiente.
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/usuario'
 *      responses:
 *          200:
 *              description: usuario modificado
 *          400:
 *              description: entrada no valida
 *          401:
 *              description: acceso denegado
 */

router.delete('/:id', (req, res) => {
    const real = obtenerUsuarios().some(r => r.id === parseInt(req.params.id));
    if(real){
        obtenerUsuarios().splice(req.params.id-1,1)
        res.json(obtenerUsuarios());
    } else {
        res.status(400).json("id desconocido");
    }
});

/**
 * @swagger
 * /users:
 *  get:
 *      summary: Obtener todos los usuarios del sistema (solo habilitada para administrador)
 *      tags: [Usuarios]
 *      responses:
 *          200:
 *              description: Lista de usuarios del sistema (solo habilitada para el administrador)
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/usuario'
 */

router.get('/', (req,res) => {
    res.json(obtenerUsuarios());
});

/**
 * @swagger
 * name: Usuarios
 * description: User CRUD, signup and login.
 * components:
 *  schemas:
 *      usuario:
 *          type: object
 *          required:
 *              -email
 *              -username
 *              -password
 *              -telefono
 *              -direccion
 *          properties:
 *              email:
 *                  type: string
 *                  description: correo del usuario
 *              username:
 *                  type: string
 *                  description: alias unico del usuario
 *              password:
 *                  type: string
 *                  description: clave de acceso del usuario
 *              telefono:
 *                  type: number
 *                  description: numero contacto del usuario
 *              direccion:
 *                  type: string
 *                  description: destino de los domicilios solicitados por el usuario
 *
 */


module.exports = router;
