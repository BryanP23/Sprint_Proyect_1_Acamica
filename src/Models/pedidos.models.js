const pedidos = [
    {
        id : 1,
        CostoOrden: 0,
        username:"Bryan Polo",
        direccion: "Grimmauld Place 12",// user linked to the order
        products:[],
        medioDePago:"efectivo",
        state: 'pendiente',
    },
    {
        id : 2,
        CostoOrden: 0,
        username:"Cristiano Ronaldo",
        direccion: "Avenida Siempreviva 742",
        products:[],
        medioDePago:"tarjeta",
        state: 'pendiente',
    },
];

const estadosUser = [
    {
        "id": 2,
        "state": "confirmado"
    },
]

const estadosAdmin = [
    {
        "id": 1,
        "state": "pendiente"
    },
    {
        "id": 2,
        "state": "confirmado"
    },
    {
        "id": 3,
        "state": "en preparacion"
    },
    {
        "id": 4,
        "state": "enviado"
    },
    {
        "id": 5,
        "state": "entregado"
    }
]


const Ordenes = () => {
    return pedidos;
};


const getStatesUser = () => {
    return estadosUser;
};


const getStatesAdmin = () => {
    return estadosAdmin;
};


const nOrden = (product) => {
    pedidos.push(product);
}


function objetoAmodificar(id, CostoOrden, username, direccion, products, medioDePago, state) {
   return {
        id : id,
        CostoOrden: CostoOrden,
        username:username,
        direccion: direccion,
        products: products,
        medioDePago: medioDePago,
        state: state
       }
}



module.exports = {Ordenes,objetoAmodificar, nOrden, getStatesUser, getStatesAdmin};
