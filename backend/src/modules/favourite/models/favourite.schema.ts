import { Schema } from 'mongoose';

export const favouriteSchemaName = 'Favourites';

export const FavouriteSchema = new Schema({
  userId: String,
  items: [{
    id: String,
    title: String,
    size: String,
    color: String,
    quantity: Number,
    image: {
      "1_1": String,
      "4_3": String,
      "16_9": String,
      "scale": String,
      "default": String
    },
  }],
});

FavouriteSchema.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
  }
});
