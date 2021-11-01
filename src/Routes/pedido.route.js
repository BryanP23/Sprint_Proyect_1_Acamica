const express = require('express');
const lRoutes = express.Router();
const {getProductos, pushProductos} = require('../models/productos.models.js')
const {Ordenes, nOrden, objetoAmodificar, getStatesUser, getStatesAdmin } = require('../models/pedidos.models.js');
const {obtenerUsuarios} = require('../models/usuario.model.js')
const {getPagos} = require("../models/pagos.model.js");

// ruta ver pedido usuario logueado
/**
 * @swagger
 * /pedidos/verPedido:
 *  get:
 *      summary: obtiene le pedido pendiente del usuario
 *      tags: ['Pedidos']
 *      responses:
 *          200:
 *              description: Pedido pendiente obtenido con exito
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/pedidos'
 *          401:
 *              description: solo disponible para usuarios logueados
 */

lRoutes.get('/verPedido', (req,res) => {
    const pedido = Ordenes().find( p => p.username == req.auth.user && p.state == "pendiente");
    if(pedido){
        res.json(pedido);
    } else {
        res.status(404).json('no se encuentra un pedido, usuario no logueado')
    }

})

// ruta para ver historial de pedido del usuario logueado
/**
 * @swagger
 * /pedidos/verHistorialPedidos:
 *  get:
 *      summary: obtiene todos los pedidos tanto pendientes como confirmados del usuario
 *      tags: ['Pedidos']
 *      responses:
 *          200:
 *              description: Pedidos obtenidos con exito
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/pedidos'
 *          401:
 *              description: solo disponible para usuarios logueados
 */

lRoutes.get('/verHistorialPedidos', (req,res) => {
    const pedido = Ordenes().filter( p => p.username == req.auth.user);
    if(pedido){
        res.json(pedido);
    } else {
        res.status(404).json('no se encuentra un pedido ligado a este usuario')
    }

})

//ruta para agregar un producto al pedido
/**
 * @swagger
 * 
 * /pedidos/producto/{id}:
 *  post:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id del producto a agregar
 *        required: true
 *        type: integer
 *
 *      summary: agrega el producto solicitado para iniciar un pedido o para agregarlo a uno que tenga pendiente el usuario logueado
 *      tags: ['Pedidos']
 *      requestBody:
 *          description: los atributos del usuario a modificar
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/pedidos'
 *      responses:
 *          200:
 *              description: producto agregado
 *          400:
 *              description: id no valido
 *          401:
 *              description: acceso denegado
 */

lRoutes.post('/producto/:id',(req,res) => {
    const real = getProductos().find(r => r.id === parseInt(req.params.id));
    const nPedido = Ordenes().find( p => p.username == req.auth.user && p.state == "pendiente");
    // console.log(nPedido);
    if (nPedido.products.some( p => p.id == real.id) == true){
        const productoDuplicado = nPedido.products.find( p => p.id == req.params.id);
        productoDuplicado.q += 1;
        // console.log(productoDuplicado);
    }else {
        nPedido.products.push(real);
    };
        const mapaPrice = nPedido.products.map( p => p.price * p.q);
        // console.log(mapaPrice);
        let totalPrice = 0;
        for(let i of mapaPrice)totalPrice+=i;
        const ActualizacionCosto = objetoAmodificar(nPedido.id, totalPrice, nPedido.username, nPedido.direccion, nPedido.products, nPedido.medioPago, nPedido.state);
        Ordenes().splice(Ordenes().lastIndexOf(nPedido),1,ActualizacionCosto);
        res.json(Ordenes().find( p => p.username === req.auth.user && p.state == "pendiente"));
});

//ruta para eliminar un producto del pedido
/**
 * @swagger
 * 
 * /pedidos/producto/{id}:
 *  delete:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id del producto a eliminar
 *        required: true
 *        type: integer
 *
 *      summary: elimina el producto solicitado del pedido pendiente del usuario logueado
 *      tags: ['Pedidos']
 *      requestBody:
 *          description: no es necesario enviar un body para esta solicitud
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/pedidos'
 *      responses:
 *          200:
 *              description: producto eliminado
 *          400:
 *              description: id no valido
 *          401:
 *              description: acceso denegado
 */

lRoutes.delete('/producto/:id',(req,res) => {
    const real = getProductos().find(r => r.id === parseInt(req.params.id));
    const nPedido = Ordenes().find( p => p.username === req.auth.user && p.state == "pendiente");
    const productoDelete = nPedido.products.find( p => p.id == req.params.id);
    console.log(productoDelete.q);
    if(productoDelete.q > 1){
        productoDelete.q = productoDelete.q-1;
        const mapaPrice = nPedido.products.map( p => p.price * p.q)
        let totalPrice = 0;
        for(let i of mapaPrice)totalPrice+=i;
        nPedido.orderCost = totalPrice;
        res.json(Ordenes().find( p => p.username === req.auth.user && p.state == "pendiente"));
    }else if(productoDelete.q = 1){
        nPedido.products.splice(nPedido.products.lastIndexOf(real),1);
        const mapaPrice = nPedido.products.map( p => p.price * p.q)
        let totalPrice = 0;
        for(let i of mapaPrice)totalPrice+=i;
        nPedido.orderCost = totalPrice;
        res.json(Ordenes().find( p => p.username === req.auth.user && p.state == "pendiente"));
    }else{
        res.status(404).json("el producto no esta en la orden");
    };
    
});

//ruta para poner un medio de pago en la orden
/**
 * @swagger
 * 
 * /pedidos/medioDePago/{id}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id del medio de pago que se quiere utilizar
 *        required: true
 *        type: integer
 *
 *      summary: proporciona el medio de pago a utilizar "debe ser un medio de pago existente en la aplicacion"
 *      tags: ['Pedidos']
 *      requestBody:
 *          description: username del usuario logueado
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/pedidosMedioDePago'
 *      responses:
 *          200:
 *              description: medio de pago elegido
 *          400:
 *              description: id no valido
 *          401:
 *              description: acceso denegado
 */

lRoutes.put('/medioDePago/:id', (req,res) =>{
    const pedido = Ordenes().find( p => p.username == req.auth.user);
    if(pedido){
    const validacion = Ordenes().find( p => p.username === req.auth.user && p.state == "pendiente");
    const realMedioPago = getPagos().find( r => r.id == parseInt(req.params.id));
    console.log(realMedioPago);
    if (realMedioPago){
        pedido.medioDePago = realMedioPago.medioDePago;
        res.json(pedido);
    } else{
        res.status(404).json('el medio de pago no es valido')
    }
}else{
    res.status(404).json("debes ingresar el username ligado al pedido");
}
})

//ruta para cambiar la direccion que aparece en el pedido
/**
 * @swagger
 * 
 * /pedidos/cambioDireccion:
 *  put:
 *      summary: modifica la direccion al pedido del usuario logueado
 *      tags: ['Pedidos']
 *      requestBody:
 *          description: direccion actualizada del usuario logueado
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/pedidosDireccion'
 *      responses:
 *          200:
 *              description: direccion actualizada
 *          400:
 *              description: usuario no logueado
 *          401:
 *              description: acceso denegado
 */

lRoutes.put('/cambioDireccion', (req, res) => {
    const validacion = Ordenes().find( p => p.username === req.auth.user && p.state == "pendiente");
    validacion.direccion = req.body.direccion;
    res.json(validacion);
});

// ruta para confirmar pedido del usuario logueado
/**
 * @swagger
 * 
 * /pedidos/confirmarPedido/{id}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id del pedido que se quiere confirmar
 *        required: true
 *        type: integer
 *
 *      summary: confrima el pedido que el usuario tiene pendiente
 *      tags: ['Pedidos']
 *      requestBody:
 *          description: poner estado confirmado
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/pedidosConfirmar'
 *      responses:
 *          200:
 *              description: pedido confirmado
 *          400:
 *              description: estado no valido
 *          401:
 *              description: acceso denegado
 */

lRoutes.put('/confirmarPedido/:id', (req, res) =>{
    const pedido = Ordenes().find( p => p.id == parseInt(req.params.id));
    console.log(pedido);
    const validacion = Ordenes().find( p => p.username === req.auth.user && p.state == "pendiente");
    const estadoPedido = getStatesUser().find( e => e.state == req.body.state);
    if(estadoPedido){
        pedido.state = estadoPedido.state;
        res.json("pedido confirmado, hemos empezado con el alistamiento del mismo");
        const nuevaOrden =objetoAmodificar( Ordenes().length+1,0,validacion.username,validacion.direccion,[],validacion.medioDePago,"pendiente");
        Ordenes().push(nuevaOrden);
    }else{
        res.status(404).json("para confirmar la orden debes enviar el estado confirmado")
    }
});

lRoutes.use('/', (req, res, next) => {
    if(obtenerUsuarios().some(u => u.username === req.auth.user && u.isAdmin == true)){
        return next();
    }else{
        return res.status(401).json(' No estas atorizado para realizar esta accion');
    };
});

//ruta para cambiar el estado del pedido (solo administrador)
/**
 * @swagger
 * 
 * /pedidos/cambiarEstadoPedido/{id}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id del pedido que se quiere cambiar
 *        required: true
 *        type: integer
 *
 *      summary: modifica el estado pedido seleccionado (solo habilitado para administrador)
 *      tags: ['Pedidos']
 *      requestBody:
 *          description: poner estado a cambiar puede ser ( pendiente, confirmado, en preparacion, enviado, entregado)
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/pedidosConfirmar'
 *      responses:
 *          200:
 *              description: pedido confirmado
 *          400:
 *              description: estado no valido
 *          401:
 *              description: acceso denegado
 */

lRoutes.put('/cambiarEstadoPedido/:id', (req, res) =>{
    const pedido = Ordenes().find( p => p.id == parseInt(req.params.id));
    console.log(pedido);
    const validacion = Ordenes().find( p => p.username === req.auth.user);
    const estadoPedido = getStatesAdmin().find( e => e.state == req.body.state);
    console.log(estadoPedido);
    if(estadoPedido){
        pedido.state = req.body.state;
        res.json(pedido);
    }else{
        res.status(404).json("debes ingresar uno de los estados disponibles")
    }
})

// ruta para ver todos los pedidos (solo administrador)
/**
 * @swagger
 * /pedidos:
 *  get:
 *      summary: obtiene todos los pedidos (solo habilitado para administrador)
 *      tags: ['Pedidos']
 *      responses:
 *          200:
 *              description: Pedidos obtenidos con exito
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/pedidos'
 *          401:
 *              description: solo disponible para usuario administrador
 */

lRoutes.get('/', (req,res) => {
    res.json(Ordenes());
    console.log(req.auth.user);
});

// ruta para los bodies que trabajen con username
/**
 * @swagger
 * tags:
 *  name: 'Pedidos'
 *  descripcion: en relacion con los pedidos de la aplicacion
 * components:
 *  schemas:
 *      pedidos:
 *          type: object
 *          required:
 *              -userName
 *          properties:
 *              userName:
 *                  type: string
 *      productResponse:
 *          type: object
 *          required:
 *              -userName
 *          properties:
 *              productName:
 *                  type: string
 *              price:
 *                  type: integer
 *
 */

//ruta para bodies que trabajen con medio de pago
/**
* @swagger
* tags:
*  name: 'Pedidos'
*  descripcion: en relacion con los pedidos de la aplicacion
* components:
*  schemas:
*      pedidosMedioDePago:
*          type: object
*          required:
*              -username
*          properties:
*              username:
*                  type: string
*      productResponse:
*          type: object
*          required:
*              -username
*          properties:
*              username:
*                  type: string
*
*/






// ruta para bodies que trabajen con correo
/**
 * @swagger
 * tags:
 *  name: 'Pedidos'
 *  descripcion: en relacion con el cambio de la direccion de los pedidos de la aplicacion
 * components:
 *  schemas:
 *      pedidosDireccion:
 *          type: object
 *          required:
 *              -direccion
 *          properties:
 *              direccion:
 *                  type: string
 *      productResponse:
 *          type: object
 *          required:
 *              -direccion
 *          properties:
 *              direccion:
 *                  type: string
 *
 */

// ruta para bodies que trabajen con estados de la aplicacion
/**
 * @swagger
 * tags:
 *  name: 'Pedidos'
 *  descripcion: en relacion con los estados de los pedidos de la aplicacion
 * components:
 *  schemas:
 *      pedidosConfirmar:
 *          type: object
 *          required:
 *              -state
 *          properties:
 *              state:
 *                  type: string
 *      productResponse:
 *          type: object
 *          required:
 *              -state
 *          properties:
 *              state:
 *                  type: string
 *
 */


module.exports = lRoutes;
