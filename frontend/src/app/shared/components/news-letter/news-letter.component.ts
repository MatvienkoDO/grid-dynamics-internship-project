import { Component, OnInit } from '@angular/core';
import { MailService } from '../../services/mail/mail.service';

@Component({
  selector: 'app-news-letter',
  templateUrl: './news-letter.component.html',
  styleUrls: ['./news-letter.component.scss']
})
export class NewsLetterComponent implements OnInit {
  dataForm: object;
  loading = false;
  timeout;


  constructor(
    private mailService: MailService,
  ) {
    this.dataForm = {};
  }

  
   onSubmit(event: Event): void {
    event.preventDefault();
    this.mailService.post(this.dataForm);
    this.dataForm = {};
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }
  

  ngOnInit() {
  }
}

