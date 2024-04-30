// shop-controller.js
const Shop = require('../schema/shop-schema');

// Controller function to get shop data by category
exports.getShopsByCategory = async (req, res) => {
    const category = req.params.category;
    try {
        const shops = await Shop.find({ category: category });
        res.json(shops);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
};


// shop-controller.js
const Product = require('../schema/product-schema');

// Controller function to get products by shop ID
exports.getProductsByShopId = async (req, res) => {
    const shopId = req.params.shopId;
    try {
        const products = await Product.find({ shopId: shopId });
        res.json(products);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
};

