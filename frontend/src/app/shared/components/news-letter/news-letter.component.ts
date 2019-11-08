import { Component, OnInit } from '@angular/core';

import { MailService } from '../../services';

@Component({
  selector: 'app-news-letter',
  templateUrl: './news-letter.component.html',
  styleUrls: ['./news-letter.component.scss']
})
export class NewsLetterComponent implements OnInit {
  dataForm = {
    email: ''
  };
  loading = false;

  constructor(private mailService: MailService) { }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.loading = true;

    this.mailService.post(this.dataForm).subscribe(() => {
      this.loading = false;
    });

    this.dataForm.email = '';
  }

  ngOnInit() {
  }
}
