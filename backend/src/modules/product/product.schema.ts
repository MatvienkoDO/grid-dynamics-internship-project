import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  brand: String,
  price: Number,
  sizes: [String],
  colors: [String],
  images: [String],
});