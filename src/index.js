require('dotenv').config();
const express = require ('express');
const app = express();
const basicAuth = require('express-basic-auth');
const PORT = process.env.PORT || 3000;
const usuarioRoutes = require('./routes/usuario.route.js');
const autenticacion = require('./middlewares/autenticacion.middlewares');
const swaggerOptions = require('./Utilidades/Swagger');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerSpecs = swaggerJsDoc(swaggerOptions);





app.use(express.json());

app.use('/api-documentacion', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

app.use('/cuenta', require('./routes/cuenta.route.js'));
app.use(basicAuth({ authorizer: autenticacion }));
app.use('/mediosDePago', require('./routes/pago.route.js'));
app.use('/users', usuarioRoutes);
app.use('/productos', require('./routes/producto.route.js'));
app.use('/pedidos', require('./routes/pedido.route.js'));


app.listen(PORT, () => {console.log('escuchando en el puerto ' + PORT)})
