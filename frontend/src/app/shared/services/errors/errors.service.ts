import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Error } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {
  private readonly errors = new Subject<Error>();

  constructor() { }

  pushError(target: Error.Target, message: string) {
    const newError: Error = {
      target,
      message,
    };

    this.errors.next(newError);
  }

  getErrors(target: Error.Target): Observable<string> {
    return this.errors.pipe(
      filter(({ target: currentTarget }) => currentTarget === target),
      map(({ message }) => message),
    );
  }
}
