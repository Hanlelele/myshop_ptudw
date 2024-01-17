const Product = require('../models/Product');

const productController = {
    // getAllProducts: async (req, res) => {
    //     try {
    //         const { page, limit } = req.query;
    //         const offset = (page - 1) * limit;


    //         const keyWordSearch = req.query.search;

    //         console.log(keyWordSearch);
    //         const query = {};

    //         if (keyWordSearch) {
    //             query.$or = [
    //                 { name: { $regex: new RegExp(keyWordSearch, 'i') } },
    //                 { id: { $regex: new RegExp(keyWordSearch, 'i') } }
    //             ];
    //         }
    //         const products = await Product.find().skip(offset).limit(limit).exec();
    //         const totalProducts = await Product.countDocuments().exec()

    //         res.status(200).json({
    //             success: true,
    //             message: 'Get all products successfully !',
    //             totalPages: Math.ceil(totalProducts / limit),
    //             data: products
    //         });
    //     } catch (err) {
    //         res.status(500).json({
    //             success: false,
    //             message: err,
    //             data: []
    //         });
    //     }
    // },
    getAllProducts: async (req, res) => {
        try {
            const { page, limit } = req.query;
            const offset = (page - 1) * limit;
    
            const keyWordSearch = req.query.search;
    
            const query = {};  // Define the query variable
    
            if (keyWordSearch) {
                query.$or = [
                    { name: { $regex: new RegExp(keyWordSearch, 'i') } },
                    { id: { $regex: new RegExp(keyWordSearch, 'i') } }
                ];
            }
    
            const products = await Product.find(query).skip(offset).limit(limit).exec();
            const totalProducts = await Product.countDocuments(query).exec();
    
            res.status(200).json({
                success: true,
                message: 'Get all products successfully!',
                totalPages: Math.ceil(totalProducts / limit),
                data: products
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err,
                data: []
            });
        }
    },    
    getSimilarProducts: async (req, res) => {
        try {
            const id = req.params.id;
            const product = await Product.findById(id);
            const productCategory = product.id_category;
            const similarProducts = await Product.find({
                id_category: { $in: productCategory },
                _id: { $ne: id }
            }).limit(3);

            res.status(200).json({
                success: true,
                message: 'Get similar products successfully!',
                data: similarProducts
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err,
                data: []
            });
        }
    },
    getProductById: async (req, res) => {
        try {
            const id = req.params.id;

            const product = await Product.findById(id);

            res.status(200).json({
                success: true,
                message: 'Get product successfully !',
                data: product
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err,
                data: {}
            });
        }
    }
}

module.exports = productController;