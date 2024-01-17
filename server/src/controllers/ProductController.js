const Product = require('../models/Product');

const productController = {
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
    },
    // addProduct: async (req, res) => {
    //     try {
    //         const product = await Product.findOne({ name: req.body.name })

    //         if(product){
    //             return res.status(404).json({
    //                 success: false,
    //                 message: "product already exists"
    //             })
    //         }
    
    //         const newProduct = await new Product({
    //             name: req.body.name,
    //             id_category: req.body.id_category,
    //             price: req.body.price,
    //             image: req.body.image,
    //             description: req.body.description
    //         });
    
    //         const createProduct = await newProduct.save();
    
    //         return res.status(200).json({
    //             success: true,
    //             message: 'Add Product successfully !',
    //             data: createProduct
    //         });
    //     } catch (error) {
    //         return res.status(500).json({
    //             success: false,
    //             message: err,
    //             data: {}
    //         });
    //     }
    // },

    // updateProduct: async (req, res) => {
    //     try {
    //         const product = await Product.findOne({ name: req.body.name })

    //         if(product){
    //             return res.status(404).json({
    //                 success: false,
    //                 message: "product already exists"
    //             })
    //         }
    
    //         const updateProduct = {
    //             name: req.body.name,
    //             id_category: req.body.id_category,
    //             price: req.body.price,
    //             image: req.body.image,
    //             description: req.body.description
    //         };
    
    //         const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateProduct, { new: true });
    
    //         if (!updatedProduct) {
    //             return res.status(404).json({
    //                 success: false,
    //                 message: 'Product not found',
    //                 data: {}
    //             });
    //         }
    //         return res.status(200).json({
    //             success: true,
    //             message: 'Edit Product successfully !',
    //             data: updatedProduct
    //         });
    //     } catch (error) {
    //         return res.status(500).json({
    //             success: false,
    //             message: err,
    //             data: {}
    //         });
    //     }
    // },

    // deleteProduct: async (req , res) => {
    //     try {
    //         await Product.deleteOne({_id: req.params.id})
    //         res.status(200).json({
    //             success: true,
    //             message: 'Delete successfully!',
    //         });
    //     } catch (err) {
    //         return res.status(500).json({
    //             success: false,
    //             message: err,
    //             data: {}
    //         });
    //     }
    // }
}

module.exports = productController;