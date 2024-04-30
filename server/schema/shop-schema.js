const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: String,
  category: String,
  email: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipcode: String
  }
});

module.exports = mongoose.model('Shop', shopSchema);
