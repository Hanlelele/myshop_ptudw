const Category = require('../models/Category');

const categoryController = {
    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.find();

            res.status(200).json({
                success: true,
                message: 'Get all categories successfully !',
                data: categories
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err,
                data: []
            });
        }
    },
}

module.exports = categoryController;