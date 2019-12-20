import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable, BehaviorSubject, combineLatest, fromEvent } from 'rxjs';
import { map, startWith, filter, distinctUntilChanged } from 'rxjs/operators';

import { NotificationService } from 'src/app/shared/services';
import { gridDynamicsOfficeAddress } from '../../shared/constants';
import { apiHost } from '../../../environments';

const nameMinLength = 2;
const nameMaxLength = 250;
const messageMaxLength = 1000;

const createForm = () => new FormGroup({
  name: new FormControl('', [
    Validators.required,
    Validators.minLength(nameMinLength),
    Validators.maxLength(nameMaxLength),
  ]),

  email: new FormControl('', [
    Validators.required,
    Validators.email,
  ]),

  message: new FormControl('', [
    Validators.required,
    Validators.maxLength(messageMaxLength),
  ]),
});

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  public readonly office = gridDynamicsOfficeAddress;
  public readonly mapZoom$: Observable<number | undefined>;

  public readonly name$: Observable<string>;
  public readonly email$: Observable<string>;
  public readonly message$: Observable<string>;

  public readonly nameErrors$: Observable<boolean>;
  public readonly emailErrors$: Observable<boolean>;
  public readonly messageErrors$: Observable<boolean>;

  public readonly submitEnabled$: Observable<boolean>;
  public readonly loading$ = new BehaviorSubject<boolean>(false);

  private readonly form: FormGroup;

  constructor(
    private readonly notificationService: NotificationService,
    private readonly translateService: TranslateService,
    private readonly http: HttpClient,
  ) {
    this.form = createForm();
    this.name$ = this.form.valueChanges.pipe(map(value => value.name));
    this.email$ = this.form.valueChanges.pipe(map(value => value.email));
    this.message$ = this.form.valueChanges.pipe(map(value => value.message));

    const controls = this.form.controls;
    this.nameErrors$ = this.form.statusChanges
      .pipe(map(() => controls.name.dirty && controls.name.invalid));
    this.emailErrors$ = this.form.statusChanges
      .pipe(map(() => controls.email.dirty && controls.email.invalid));
    this.messageErrors$ = this.form.statusChanges
      .pipe(map(() => controls.message.dirty && controls.message.invalid));

    this.submitEnabled$ = combineLatest(this.form.statusChanges, this.loading$).pipe(
      map(([status, loading]) => status === 'VALID' && !loading),
      startWith(false)
    );

    const windowWidth = fromEvent(window, 'resize').pipe(
      map(({ target }) => target ? (target as any).innerWidth : NaN),
      filter(width => typeof width === 'number' && !isNaN(width)),
      startWith(window.innerWidth),
    );

    this.mapZoom$ = windowWidth.pipe(
      map(width => {
        if (width > 900) {
          return 15;
        } else if (width > 415) {
          return 14;
        } else {
          return 13;
        }
      }),
      distinctUntilChanged(),
    );
  }

  public changeField(key: string, value: string) {
    this.form.controls[key].markAsDirty();

    const patch = {};
    patch[key] = value;
    this.form.patchValue(patch);
  }

  public submit() {
    this.loading$.next(true);

    const {
      name,
      email,
      message,
    } = this.form.controls;

    const body = {
      name: name.value,
      email: email.value,
      message: message.value,
    };

    this.http.post(`${apiHost}/api/contact-us`, body).subscribe(() => {
      this.translateService.get('contact.formDataIsSuccessfullySent')
        .subscribe(text => this.notificationService.success(text));

      this.form.reset();

      this.loading$.next(false);
    });
  }
}
