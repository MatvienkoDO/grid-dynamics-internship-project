import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { apiHost } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  url = `${apiHost}/api/news-letter`;

  constructor(
    private http: HttpClient
  ) { }

  public get() {
    return this.http.get(this.url);
  }

  public post(data) {
    return this.http.post(this.url, data);
  }
}
