# Bienvenido a mi primera API!!
**Instalación:**
1. Debes descargar el repositorio que he dejado en el siguiente link [Repositorio Proyecto 1](https://github.com/BryanP23/Sprint_Proyect_1_Acamica "Repositorio Proyecto 1")
una vez lo hayas descargado ejecutas el comando "npm run dev" o "npm node src/index.js".
1.  Debes abrir el link de la documentacion en swagger ui desde el siguiente link [Documentación Swagger](http://localhost:3000/api-documentacion/ "Documentación Swagger").
1. El usuario administrador es BryanP23, su contraseña es 12345, este usuario puede acceder a todo el enrutamiento API, el usuario de prueba es elBicho, su contraseña es 8520, en caso de que no desee crear su propia cuenta.  (Cuando se trata de autorización, es importante iniciar sesión con el usuario con el que trabajará).
####  **Modo de Uso**
**Rutas habilitadas para el usuario:**

1.En la ruta POST/cuenta/crearCuenta podras crear una nueva cuenta. poniendo en el body toda la informacion requerida.
1. Para verificar debes ir a la ruta POST/cuenta/login loguearte con el username y el password del usuario creado. Poniendo en el body el username y password. **NOTA : En este momento en la autorización ingresar el usuario y la contraseña del usuario creado.**
1.  Si verificas en la ruta GET/pedidos/verPedido, teniendo en el autorize el usuario y la contraseña indicado te debe traer el pedido asociado al usuario que tienes allí, en este caso un pedido sin productos en el cual podras empezar a agregar los productos que desees incluir en tu carrito.
1.  En la ruta GET/productos puedes ver todos los productos disponibles para la venta y verificar el id de cada uno.
1.  En la ruta POST/pedidos/producto/{id} vas a poder agregar un producto a tu pedido por medio del id del producto. Debes poner el id del producto deseado en la casilla habilitada en el interior de la ruta, darle execute.
1.  Puedes agregar cuantos desees y podras ver en CostoOrden el valor que deberas pagar por el pedido de los productos seleccionados y  en el atributo q podras ver la cantidad de productos que llevas de la misma referencia.
1. En la ruta DELETE/pedidos/producto/{id} puedes eliminar cualquier producto de los seleccionados anteriormente, ingreso su id en la casilla habilitada en el interior de la ruta, al eliminarlo el costo del pedido debe ser igual a la sumatoria del costo de los productos que queden en el pedido.
1. En la ruta GET/mediosDePago vas a poder observar los medios de pago disponibles con su corresponiente id.
1. En la ruta PUT/pedidos/medioDePago vas a poder especificar el medio de pago que quieres usar para pagar el pedido que estas solicitando. Por defecto te aparece efectivo.
Por la casilla habilitada para ingresar el id que corresponde al medio de pago que quieres utilizar.
1. En la ruta PUT/pedidos/cambioDireccion podras modificar la direccion que tiene actualmente, el por defecto pone la direccion que ingresas cuando creas tu cuenta, por el body vas a ingresar la nueva direccion. **En el responses debe aparecer tu pedido con la direccion modificada.**
1. En la ruta PUT/pedidos/confirmarPedido/{id} vas a cambiar el estado del pedido que estas modificando de pendiente a confirmado, para cerrar la orden y que pueda empezar el alistamiento del mismo, por el body debes ingresar el estado.
1. En la ruta GET/pedidos/verHistorialPedidos vas a poder ver el pedido que acabas de confirmar y un nuevo pedido vacio con el estado pendiente, en el cual se podra iniciar nuevo pedido en caso de querer hacerlo.
1. El usuario creado se puede modificar en la ruta PUT / users / {id}. Debes ingresar el ID de usuario que deseas editar en la casilla habilitada en la ruta (esto se puede verificar en el número 5 en la respuesta que aparece el nombre de usuario y el ID correspondiente al usuario), y poner los datos que deseas editar en el cuerpo para modificar. (Recuerde, debe iniciar sesión con un nombre de usuario y contraseña en la autorización para realizar esta operación).

**Rutas habilitadas para el Administrador**
1. En la ruta POST/mediosDePago puedes agregar un medio de pago enviandolo por el body.
1. En la ruta DELETE/mediosDePago ingresando el id por la casilla habilitada eliminaras el medio de pago correspondiente a el id ingresado. (recuerda que debes loguearte con el username y password del administrador.
1. n la ruta PUT/nuevoMediosDePago/{id} puedes actualizar los medios de pago existentes, en la casilla habilitada debes poner el id del medio de pago que deseas editar, y por el body enviar el medio de pago que quieres ingresar.
1. En la ruta PUT/pedidos/cambiarEstadoPedido/{id} se puede cambiar el estado de las ordenes creadas, se debe enviar el id en la casilla habilitada del pedido que se quiere modificar, y en el body enviar el estado que se desea poner. (lo estados habilitados para el administrador son: (pendiente, confirmado, en preparacion, enviado, entregado)
**En el response aparecera la orden con el estado modificado.**
1. En la ruta GET/pedidos se obtienen todas los pedidos en la aplicacion.
1. En la ruta POST/productos podras agregar un nuevo producto para la venta, debes ingresar por el body el nombre y el precio del producto.
1. En la ruta PUT/productos/{id} podras modificar productos ya creados, ingresando en la casilla habilitada el id del producto que quieres editar y en el body su nuevo nombre y precio. **en el responses te debe aparecer " product updated ", si vas a la ruta GET/productos y le das execute vas a ver todos los productos incluyendo el actualizado.**
1. En la ruta DELETE/productos/{id} puedes eliminar los productos habilitados para la venta, debes ingresar el id del producto que quieres eliminar en la casilla habilitada y en el responses apareceran todos los productos excepto el que acabas de eliminar.
2. En la ruta DELETE/users/{id} podras eliminar los usuarios existentes, debes ingresar el id en la casilla habilitada del usuario que quieres eliminar y en el responses deben aparecer todos los usuarios excepto el que acabas de eliminar.
1. En la ruta  GET/users puedes obtener todos los usuarios con una cuenta habilitada en la aplicacion.



### Redes Sociales
[GitHub](https://github.com/BryanP23 "GITHUB")
[Facebook](https://www.facebook.com/Brian.Polo.23 "Facebook")
[Linkedin](https://www.linkedin.com/in/brayan-p-76972086/ "Linkedin")