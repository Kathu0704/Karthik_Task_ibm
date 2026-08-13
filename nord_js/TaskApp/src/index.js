const express = require('express');
const dotenv = require('dotenv');

const connectDB = require('./db/mongoose');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

dotenv.config();

const app = express();


// Middleware
app.use(express.json());


// Routes
app.use(userRouter);
app.use(taskRouter);


// Start server
const startServer = async () => {

    try {

        await connectDB();

        const port = process.env.PORT || 3000;

        app.listen(port, () => {

            console.log(`Server running on port ${port}`);

        });

    } catch (error) {

        console.error('Server failed to start:', error);

    }

};


// Start server only when running this file directly
if (require.main === module) {

    startServer();

}


// Export app for Jest/Supertest
module.exports = app;