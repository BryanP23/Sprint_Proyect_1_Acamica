const { pushProductos } = require("./productos.models");

const Pagos = [
    {
        id: 1,
        medioDePago:"efectivo"
    },
    {
        id:2,
        medioDePago:"paypal"
    },
    {
        id:3,
        medioDePago:"tarjeta"
    }
];

const getPagos = () => {
    return Pagos;
}

const addPagos = (newPagos) => {
    const id = Pagos.length+1;
    const pay = {
        id : id,
        medioDePago: newPagos
    }
   return Pagos.push(pay);
}

module.exports = { getPagos, addPagos};
