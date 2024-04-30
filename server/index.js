// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const shopRoutes=require("./router/cust");
const authRoutes=require("./router/auth");
const app = express();
const session = require('express-session')

// Enable CORS
app.use(cors());
app.options('*', cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://ayushgurav6:Ayush123@smallbizz.rwgr6tg.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
});

// Define schema for shop collection
const shopSchema = new mongoose.Schema({
    name: String,
    category: String,
    // Add more fields as per your data structure
});

// Define model for shop collection
const Shop = mongoose.model('Shop', shopSchema);

// Define schema for product collection
const productSchema = new mongoose.Schema({
    name: String,
    shopId: mongoose.Types.ObjectId, // Reference to the shop ID
    // Add more fields as per your data structure
});

// Define model for product collection
const Product = mongoose.model('Product', productSchema);

// Fetch all data from shop collection
const fetchShops = async () => {
    try {
        const shops = await Product.find({});
        console.log("All Shops:", shops);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Call fetchShops to fetch data
fetchShops();

// Define a route to display all shops
app.get('/users', async (req, res) => {
    try {
        const shops = await Shop.find({});
        res.json(shops);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Define a route to display shops by category
app.get('/users/:category', async (req, res) => {
    const category = req.params.category;
    try {
        const shops = await Shop.find({ category: category });
        res.json(shops);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Modify the route to fetch products by shop ID
app.get('/shop/:shopId/products', async (req, res) => {
    const shopId = req.params.shopId;
    try {
        const products = await Product.find({ shopId: shopId });
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/products/:productId', async (req, res) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error("Error fetching product details:", error);
        res.status(500).send("Internal Server Error");
    }
});


// Add middleware for session management
app.use(session({
    secret: 'c6438a7fe3de5a86596e892c13994a33f7590c5228305aafae981344f059d5b5 ', // Change this to a secure random key
    resave: false,
    saveUninitialized: false
  }));

app.use("/api/shops",shopRoutes);
app.use("/api/auth",authRoutes);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});