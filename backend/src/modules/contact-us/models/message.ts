import { Document, Schema } from 'mongoose';

export interface Message {
  name: string;
  email: string;
  message: string;
}

export interface MessageDocument extends Message, Document { }

export const messageModelName = 'ContactUsMessages';

export const MessageSchema = new Schema({
  name: String,
  email: String,
  message: String,
});

MessageSchema.set('toJSON', {
  transform(doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});
