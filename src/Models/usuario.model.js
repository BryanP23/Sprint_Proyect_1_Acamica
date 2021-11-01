const usuarios = [
    {
        id : 1,
        usuario: "Bryan Polo",
        email:"david2315@hotmail.com",
        username:"BryanP23",
        password:"12345",
        telefono: 3103567822,
        direccion:"Grimmauld Place 12 ",
        isAdmin:true
    },
    {
        id : 2,
        usuario: "Cristiano Ronaldo",
        email:"ElBicho@hotmail.com",
        username:"elBicho",
        password:"8520",
        telefono: 3225574529,
        direccion:"Avenida Siempreviva 742",
        isAdmin:false
    }

];



const obtenerUsuarios = () => {
    return usuarios
}

const nuevoUsuario = (usuario) => {
    usuarios.push(usuario);
};

module.exports = {obtenerUsuarios, nuevoUsuario }
