import { Schema } from 'mongoose';

export const userSchemaName = 'Users';

export const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: String,
  tokens: [String],
});

UserSchema.set('toJSON', {
  transform(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});
