const express = require('express');
const pRoute = express.Router();

const { getProductos, pushProductos } = require('../models/productos.models.js');
const { obtenerUsuarios} = require('../models/usuario.model.js')


/**
 * @swagger
 * /productos:
 *  get:
 *      summary: obtiene todos los productos disponibles
 *      tags: ['Productos']
 *      responses:
 *          200:
 *              description: Productos disponibles obtenidos con exito
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/product'
 *          401:
 *              description: solo disponible para usuarios logueados
 */
pRoute.get('/', (req,res) => {
    res.json(getProductos());
});

pRoute.use('/', (req, res, next) => {
    if(obtenerUsuarios().some(u => u.username === req.auth.user && u.isAdmin == true)){
        return next();
    }else{
        return res.status(401).json(' No estas atorizado para realizar esta accion');
    };
});

/**
 * @swagger
 * /productos:
 *  post:
 *      summary: Agrega un nuevo producto para la venta (solo habilitado para el administrador)
 *      tags: [Productos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/product'
 *      responses:
 *          201:
 *              description: Producto agregado exitosamente
 *          400:
 *              description: Datos no validos
 *          401:
 *              description: logueo de administrador inválido
 */
pRoute.post('/', (req, res) => {
    const id = getProductos()[getProductos().length-1].id+1;
    const { productName, price } = req.body;
    if(productName && price) {
        const product = { id:id, productName:req.body.productName, price:req.body.price, q:1};
        pushProductos(product);
        res.json(product);
    }else{
        res.status(404).json("no se pudo ingresar el producto, verifica la solicitud")
    }
});

/**
 * @swagger
 * 
 * /productos/{id}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id del producto a editar
 *        required: true
 *        type: integer
 *
 *      summary: modifica un producto ya creado (solo habilidato para administrador)
 *      tags: [Productos]
 *      requestBody:
 *          description: El producto  modificado con su precio
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/product'
 *      responses:
 *          200:
 *              description: Producto modificado
 *          400:
 *              description: entrada no valida
 *          401:
 *              description: acceso denegado
 */

pRoute.put('/:id', (req,res) => {
    const real = getProductos().some(r => r.id === parseInt(req.params.id));
    if(real){
        const nProduct = req.body;
        getProductos().forEach(product => {
            if(product.id === parseInt(req.params.id)){
                product.productName = nProduct.productName ? nProduct.productName : product.productName;
                product.price = nProduct.price ? nProduct.price : product.price;
                res.json('product updated')
            }
        });
    }else {
        res.status(404).json('not found id')
    }
});

/**
 * @swagger
 * /productos/{id}:
 *  delete:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id del producto que desea eliminar
 *        required: true
 *        type: integer
 *      summary: eliminar un producto existente (solo habilitado para administrador)
 *      tags: [Productos]
 *      requestBody:
 *          description: no necesitas ingresar atributos para eliminar el producto con el id es suficiente
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/product'
 *      responses:
 *          200:
 *              description: Producto eliminado
 *          400:
 *              description: la solicitado no fueron ingresados correctamente
 *          401:
 *              description: acceso restringido
 */
pRoute.delete('/:id', (req, res) => {
    const real = getProductos().some(r => r.id === parseInt(req.params.id));
    if(real){
        getProductos().splice(getProductos().lastIndexOf(getProductos().find(r => r.id === parseInt(req.params.id))),1)
        res.json(getProductos());
    } else {
        res.status(400).json('not found id');
    }
});


/**
 * @swagger
 * tags:
 *  name: 'Productos'
 *  descripcion: en relacion con los productos de la aplicacion
 * 
 * components:
 *  schemas:
 *      product:
 *          type: object
 *          required:
 *              -productName
 *              -price
 *          properties:
 *              productName:
 *                  type: string
 *              price: 
 *                  type: integer
 *      productResponse:
 *          type: object
 *          required:
 *              -productName
 *              -price
 *          properties:
 *              productName:
 *                  type: string
 *              price:
 *                  type: integer
 *
 */



module.exports = pRoute;
