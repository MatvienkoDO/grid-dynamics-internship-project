import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  name: String,
  description: String,
  category: String,
  brand: String,
  price: Number,
  sizes: [String],
  colors: [String],
  images: [String],
  sliderImage: String,
});

ProductSchema.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
  }
}); 