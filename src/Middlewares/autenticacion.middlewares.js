const { obtenerUsuarios } = require('../models/usuario.model.js');
const autenticacion = (usuario, password) => {
    
const usuarios = obtenerUsuarios().find(u => u.username === usuario && u.password === password);
    
if(usuarios) return true;
else return false;
}

module.exports = autenticacion; 
