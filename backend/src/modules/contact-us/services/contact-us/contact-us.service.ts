import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { messageModelName, MessageDocument, Message } from '../../models/message';

@Injectable()
export class ContactUsService {
  constructor(
    @InjectModel(messageModelName) private readonly messageModel: Model<MessageDocument>,
  ) {}

  async saveNewMessage(message: Message): Promise<void> {
    await this.messageModel.create(message);

    return;
  }
}
