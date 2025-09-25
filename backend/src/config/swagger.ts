import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: "3.0.3",
        info: {
            title: "BookOS API",
            version: "1.0.0",
            description: "API documentation for BookOS project"
        },
        servers: [{ url: "http://localhost:8000" }]
    },
    apis: ["./src/controllers/*.ts"],
});
