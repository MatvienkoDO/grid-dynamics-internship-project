import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ContactUsController } from './controllers/contact-us/contact-us.controller';
import { ContactUsService } from './services/contact-us/contact-us.service';
import { messageModelName, MessageSchema } from './models/message';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: messageModelName, schema: MessageSchema },
    ]),
  ],
  controllers: [ContactUsController],
  providers: [ContactUsService],
})
export class ContactUsModule {}
