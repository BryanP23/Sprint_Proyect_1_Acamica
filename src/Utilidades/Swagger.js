const OpcionesSwagger = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Sprint project 1 - Acamica",
            version: "1.0.0",
            description: "API para gestionar todos los pedidos del restaurante. De esa manera, tendrá toda su documentación en un mismo lugar.",
            contact : {
                name : " Brayan David Polo Cohen",
                email : "david2315@hotmail.com",
                cel: "3103567820"
            }
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor de prueba"
            }
        ],
        components: {
            securitySchemes: {
                basicAuth: {
                    type: "http",
                    scheme: "basic"
                }
            }
        },
        security: [
            {
                 basicAuth: []
            }
        ]
    },
    apis: ["./src/routes/*.js"]
};

module.exports = OpcionesSwagger;
