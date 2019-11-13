import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

import { MailService } from '../../services';

@Component({
  selector: 'app-news-letter',
  templateUrl: './news-letter.component.html',
  styleUrls: ['./news-letter.component.scss']
})
export class NewsLetterComponent implements OnInit {
  newsLetterForm = new FormGroup({
    email: new FormControl(''),
  });
  loading = false;

  constructor(private mailService: MailService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.newsLetterForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.loading = true;
    this.mailService.post(this.newsLetterForm.value).subscribe(() => {
      this.loading = false;
      this.newsLetterForm.reset();
    });
  }

}
