import { Schema } from 'mongoose';

export const cartSchemaName = 'Carts';

export const CartSchema = new Schema({
  userId: String,
  items: [{
    productId: String,
    size: String,
    color: String,
    quantity: Number,
  }],
});

CartSchema.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
  }
});
