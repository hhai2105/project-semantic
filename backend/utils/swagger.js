import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: "project semantic's API",
			version: '1.0.0',
		},
		components: {
			SecuritySchemas: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT"
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			}
		]
	},
	
	// looks for configuration in specified directories
	apis: ['./routes/*.js',
		   './models/*.js'
		  ],
}

const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app, port){
	app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

	app.get("docs.json", (req, res) => {
		res.setHeader("Content-Type", "application/json");
		res.send(swaggerSpec);
	})
	console.log(`Docs available at https://localhost:${port}/docs`)
}

export default swaggerDocs
