// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connection = await mongoose.connect('mongodb+srv://ayushgurav6:Ayush123@smallbizz.rwgr6tg.mongodb.net/test_customer', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('MongoDB Connected: ', connection.connection.host);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
