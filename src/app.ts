import * as dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import router from './routes';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}
const PORT = parseInt(process.env.PORT as string, 10);
const HOST = process.env.HOST || 'localhost';

const app = express();

app.use(express.json());

app.get('/api', (_req, res) => {
  res.send('API Running');
});

app.use('/api', router);

const options = {
  "definition": {
    "openapi": "3.0.0",
    "info": {
      "title": "VRillAR Formula1 APIs",
      "version": "1.0.0"
    },
    "servers": [
      { "url": `http://${HOST}:${PORT}` }
    ]
  },
  "apis": ["./src/routes/**.ts"]
};
const openApiSpecification = swaggerJsdoc(options);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiSpecification));

const server = app.listen(PORT, () => {
  console.log(`Listening on host: http://${HOST}:${PORT}`);
  console.log(`APIs list on: http://${HOST}:${PORT}/api/docs`);
});