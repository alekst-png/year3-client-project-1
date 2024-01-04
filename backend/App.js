//Define librairies we are using in the backend
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Define the root route for API
app.get('/', (req, res) => res.send('index route'));

//Define port
const port = process.env.PORT || portNumber;

// Get MongoDB password from environment variables
const password = process.env.MONGODB_PASSWORD;

// Construct the MongoDB URI
const uri = `private uri`;

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);

    // Use the new URL parser
    await mongoose.connect(uri, {
      useNewUrlParser: true,
    });

    // Log a success message WITH THE DATABASE ITS CONNECTED TO
    console.log('MongoDB is connected to database:', mongoose.connection.name);

  } catch (err) {
    // Log an error message and exit with an error code
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

//Connect to the MongoDB database
connectDB();

//Import and configure the API routes
const apiRouter = require('./routes/api/Api');
const dataRouter = require('./routes/data/Data');
const loginRouter = require('./routes/api/Login');

app.use('/api', apiRouter);
app.use('/data', dataRouter);
app.use('/api', loginRouter);

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));


