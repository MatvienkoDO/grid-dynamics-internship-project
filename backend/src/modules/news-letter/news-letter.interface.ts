import { Document } from 'mongoose';

export interface NewsLetter extends Document {
  email: string;
}
