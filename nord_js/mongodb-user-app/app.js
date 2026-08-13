// Import mongoose
const mongoose = require('mongoose');

// Import dotenv
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();


// --------------------------------------------------
// 1. Connect to MongoDB Atlas
// --------------------------------------------------

mongoose.connect(process.env.MONGO_URI)

    .then(() => {
        console.log("Connected to MongoDB Atlas");
    })

    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });


// --------------------------------------------------
// 2. Define Schema
// --------------------------------------------------

const userSchema = new mongoose.Schema({

    name: String,

    age: Number,

    email: {
        type: String,
        required: true
    }

});


// --------------------------------------------------
// 3. Create Model
// --------------------------------------------------

const User = mongoose.model('User', userSchema);


// --------------------------------------------------
// 4. Insert a Document
// --------------------------------------------------

const newUser = new User({
    name: 'Prasunamba',
    age: 30,
    email: 'prasun@example.com'
});


// Save the document to MongoDB
newUser.save()

    .then(() => {
        console.log('User saved successfully!');
    })

    .catch((error) => {
        console.error('Error saving user:', error);
    });