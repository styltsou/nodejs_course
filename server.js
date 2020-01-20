const dotenv = require('dotenv');

// Add config file to process.env
dotenv.config({ path: './config/.env' });

const app = require('./app');

// Connect to MongoDB
require('./db/dbConnection');
// Load logging service
require('./services/logger');

const PORT = parseInt(process.env.PORT, 10) || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
