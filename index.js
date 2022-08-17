const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./src/config/Db');
const bodyParser = require('body-parser');
const app = express();
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 8070;

const employeeRouter = require('./src/api/v1/routers/EmployeeRouters');
const swaggerDocs = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use('/api/v1/employee', employeeRouter);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
