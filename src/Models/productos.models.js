

const Productos = [
    {
        id : 1,
        platillo :"tabla de verduras",
        precio: "18.000",
        descripción: "perfecta mezcla de vegetales sazonados a la parrilla",
        q: 1
    },
    {
        id : 2,
        platillo :"Totem de atum",
        precio: "20.000",
        descripción: "Atún fresco, aguacate, mango, pepino, acompañado de una exquisita salsa de la casa con un toque de cebolla empanizada",
        q: 1
    },
    {
        id : 3,
        platillo :"Pastel o tarta de picantón y verduras",
        precio: "25.000",
        descripción: "Este pastel se distingue por oler de maravilla aparte de estar buenísimo",
        q: 1
    },
    {
        id : 4,
        platillo :"Rodaballo “maître d’Hôtel” con ajo negros",
        precio: "50.000",
        descripción: "El rodaballo “maître d’Hôtel” es una receta clásica al mas puro estilo francés, elegante y refinada, la gracia de esta preparación estriba en la mantequilla  “maître d’Hôtel” que lleva un chorrito de limón y perejil",
        q: 1
    },
    {
        id : 5,
        platillo :"Rosbif (roastbeef), Yorkshire pudding, salsa Robert",
        precio: "38.000",
        descripción: "trozo de lomo bajo de vaca, carne roja",
        q:1
    },
    {
        id : 6,
        platillo :"Magret de pato y granada",
        precio: "40.000",
        descripción: "la granada como ingrediente estrella, que fuera el punto central en torno al cual girasen el resto de ingredientes. En este plato vamos a presentar a la granada de tres formas diferentes: cruda para aportar frescura, en salsa con un toque agridulce y en gelatina, pura granada concentrada.  Para darle un toque cítrico,  ácido y aromático le he añadido mandarina, el zumo y la ralladura de la piel y unos kumquats en almíbar muy ligero como acompañamiento.",
        q: 1
    },
    {
        id : 7,
        platillo :"Corvina con salsa de chile dulce",
        precio: "30.000",
        descripción: "Está rica corvina es una versión de una receta del chef Gordon Ramsey.",
        q: 1
    },
];

const getProductos = () => {
 return Productos;
};

const pushProductos = (Producto) => {
Productos.push(Producto);
};

module.exports = { getProductos , pushProductos };
