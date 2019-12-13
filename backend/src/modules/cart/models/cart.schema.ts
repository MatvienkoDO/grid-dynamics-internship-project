import { Schema } from 'mongoose';

export const cartSchemaName = 'Carts';

export const CartSchema = new Schema({
  userId: String,
  items: [{
    id: String,
    title: String,
    size: String,
    color: String,
    quantity: Number,
    image: {
      '1_1': String,
      '4_3': String,
      '16_9': String,
      'scale': String,
      'default': String,
    },
  }],
});

CartSchema.set('toJSON', {
  transform(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});
