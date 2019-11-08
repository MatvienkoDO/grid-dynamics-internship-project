import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { apiHost } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  url:string=`${apiHost}/api/news-letter`;

  constructor(
    private http: HttpClient
  ) { }

  get(){
    return this.http.get(this.url);
  }

  post(data){
    console.log(data);
    return this.http.post(this.url, data);
  }
}
