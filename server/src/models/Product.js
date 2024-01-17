var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        id_category: {
            type: String,
            ref: 'Category'
        },
        name: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            require: true,
        }
    }
);

var Products = mongoose.model('Product', schema, 'product');

module.exports = Products;