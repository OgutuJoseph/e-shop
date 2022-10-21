const Product = require('../models/Product.js');
const { createError } = require('../utils/error.js');

/** Manage Products */
const addProduct = async (req, res, next) => {
    try {

        const data = req.body;
        
        const newProduct = Product(data);

        await newProduct.save();
        res.status(200).send('Product has been created succesffully!');
    } catch (error) {
        next(error)
    }
};
const getAllProducts = async (req, res, next) => {
    
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        next(createError);
    }
};
const getProduct = async (req, res, next) => {
    
    try {
        const product = await Product.findById(req.params._id);
        const data = product;
        
        res.status(200).json(data);
    } catch (error) {
        next(error)
    }
};
const updateProduct = async (req, res, next) => {

    const data = req.body
    
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params._id, { $set: data }, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error)
    }
};
const deleteProduct = async (req, res, next) => {
    
    try {
        await Product.findByIdAndDelete(req.params._id);
        res.status(200).json('Product has been deleted.');
    } catch (error) {
        next(error)
    }
};

const getProductsByParams = async (req, res, next) => {

    const qNew = req.query.new;
    const qCategory = req.query.category;

    try {
        let products;

        if(qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(5);
        } else if (qCategory) {
            products = await Product.find({ categories: { $in: [qCategory] } })
        } else {
            products = await Product.find();
        }

        res.status(200).json(products);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    getProductsByParams
};