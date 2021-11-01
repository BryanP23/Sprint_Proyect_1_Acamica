const express = require('express');
const cRoute = express.Router();
const {obtenerUsuarios , nuevoUsuario} = require('../models/usuario.model.js');
const { orders , nOrder } = require('../models/pedidos.models.js');

/**
 * @swagger
 * /cuenta/crearCuenta:
 *  post:
 *      summary: Crea un nuevo usuario en el sistema
 *      tags: [Cuenta]
 *      security: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/crearCuenta'
 *      responses:
 *          201:
 *              description: Usuario creado
 *          400: 
 *              description: Entradas inválidas
 *          401:
 *              description: usuario y contrasena incorrectos
 */


cRoute.post('/crearCuenta', (req,res) => {
    const id = obtenerUsuarios().length+1;
    const {usuario, email, username, password, telefono, direccion} = req.body;
    const verificarEmail = obtenerUsuarios().find(u => u.email === email);
    if(usuario &&  email && username && password && telefono && direccion) {
        if(verificarEmail !== email.value){
            res.status(404).json('el email ingresado ya esta siendo usado');
        }else{
            nuevoUsuario({
            id: id,
            usuario: usuario,
            email: email,
            username: username,
            password: password,
            telefono: telefono,
            direccion: direccion,
            isAdmin: false});
            const idPedido = orders().length+1;
            const pedidoUsuario = {
                id : idPedido,
                orderCost: 0,
                username : username,
                direccion: direccion,
                products :[],
                medioDePago:"efectivo",
                state:"pendiente"
            };
            nOrder(pedidoUsuario);
            res.status(201).json('cuenta creada');
        };
    }else{
       res.status(404).json('aun no has ingresado todos los datos');
    };
});

/**
 * @swagger
 * /cuenta/login:
 *  post:
 *      summary: loguea un usuario creado y da a conocer su id
 *      tags: [Cuenta]
 *      security: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/login'
 *      responses:
 *          201:
 *              description: Usuario creado
 *          400: 
 *              description: Entradas inválidas
 *          401:
 *              description: usuario y contrasena incorrectos
 */

cRoute.post('/login', (req, res) => {
    const { username, password } = req.body;
    if( username && password) {
        const user = obtenerUsuarios().find( r => r.username == req.body.username && r.password == req.body.password);
    if(user){
        res.json(`bienvenido ${username} tu id es el numero : ${user.id}`);
    }else{
        res.json('usuario desconocido');
    };
  } else {
      res.status(404).json('debes ingresar username y password para loguearte');
  };
})

// ruta para crear usuario
/**
 * @swagger 
 * tags: 
 *  name : 'Cuenta'
 *  description: 'Registro e inicio de sesión'
 * 
 * components: 
 *  schemas:
 *      crearCuenta: 
 *          type: object
 *          required:
 *               -usuario
 *               -email
 *               -username
 *               -password
 *               -telefono
 *               -direccion
 *          properties:
 *              usuario:
 *                  type: string
 *              email:
 *                  type: string
 *              username:
 *                  type: string
 *              password:
 *                  type: string
 *              telefono:
 *                  type: number
 *              direccion:
 *                  type: string
 *      productResponse:
 *          type: object
 *          required:
 *               -usuario
 *               -email
 *               -username
 *               -password
 *               -telefono
 *               -direccion
 *          properties:
 *               usuario::
 *                  type: string
 *               email:
 *                  type: string
 *               username:
 *                  type: string
 *               password:
 *                  type: number
 *               telefono:
 *                  type: number
 *               direccion:
 *                  type: string
 *                  $ref: '#/components/schemas/login'
 */

// ruta para loguearse
/**
 * @swagger 
 * tags: 
 *  name : 'Cuenta'
 *  description: 'inicio de sesión'
 * 
 * components:
 *  schemas:
 *      login:
 *          type: object
 *          required:
 *               -username
 *               -password
 *          properties:
 *              username:
 *                  type: string
 *              password:
 *                  type: string
 *      productResponse:
 *          type: object
 *          required:
 *               -username
 *               -password
 *          properties:
 *               username:
 *                  type: string
 *               password:
 *                  type: number
 *                  $ref: '#/components/schemas/login'
 */

module.exports = cRoute;
