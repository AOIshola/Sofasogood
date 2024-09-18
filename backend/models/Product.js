const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
},
  description: {
    type: String,
    required: true
},
  price: {
    type: Number,
    required: true
},
  category: {
    type: String,
    required: true
},
  imageUrl: {
    type: String
},
  stock: {
    type: Number,
    required: true,
    default: 0
},
}, { timestamps: true , toJSON: { virtuals: true }, toObject: {virtuals: true }});

ProductSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'product',
    justOne: false,
  });
  
ProductSchema.pre('remove', async function (next) {
    await this.model('Review').deleteMany({ product: this._id });
});

module.exports = mongoose.model('Product', ProductSchema);
