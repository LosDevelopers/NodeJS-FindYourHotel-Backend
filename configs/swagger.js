import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Find Your Hotel API",
            version: "1.0.0",
            description: "API para gestion de hoteles",
            contact:{
                name: "Developers",
                email: "developersfyh@gmail.com"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/FindYourHotel/v1"
            }
        ]
    },
    apis:[
        './src/room/room.routes.js'
        "./src/auth/auth.routes.js",
        "./src/user/user.routes.js",
        "./src/category/category.routes.js",
        "./src/hotel/hotel.routes.js",
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}