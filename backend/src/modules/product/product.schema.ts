import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  name: [{
    locale: String,
    value: String
  }],
  subtitle: [{
    locale: String,
    value: String
  }],
  description: [{
    locale: String,
    value: String
  }],
  category: String,
  brand: String,
  price: Number,
  sizes: [String],
  colors: [String],
  images: [{
    "1_1": String,
    "4_3": String,
    "16_9": String,
    "scale": String,
    "default": String
  }],
  sliderImage: String,
});

ProductSchema.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
  }
}); 