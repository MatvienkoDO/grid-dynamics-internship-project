import { Controller, Post, Body } from '@nestjs/common';

import { Message } from '../../models/message';
import { ContactUsService } from '../../services/contact-us/contact-us.service';

@Controller('api/contact-us')
export class ContactUsController {
  constructor(
    private readonly contactUsService: ContactUsService,
  ) {}

  @Post()
  async sendMessage(@Body() body: any) {
    // TODO: insert validation here
    const message: Message = body;

    await this.contactUsService.saveNewMessage(message);

    return {
      success: true,
    };
  }
}
