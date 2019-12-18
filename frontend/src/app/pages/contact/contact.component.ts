import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, BehaviorSubject, combineLatest, timer } from 'rxjs';
import { map, startWith, first } from 'rxjs/operators';

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
export class ContactComponent implements OnInit {
  public readonly name$: Observable<string>;
  public readonly email$: Observable<string>;
  public readonly message$: Observable<string>;

  public readonly nameErrors$: Observable<boolean>;
  public readonly emailErrors$: Observable<boolean>;
  public readonly messageErrors$: Observable<boolean>;

  public readonly submitEnabled$: Observable<boolean>;
  public readonly loading$ = new BehaviorSubject<boolean>(false);

  private readonly form: FormGroup;

  constructor() {
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
  }

  public changeField(key: string, value: string) {
    this.form.controls[key].markAsDirty();

    const patch = {};
    patch[key] = value;
    this.form.patchValue(patch);
  }

  ngOnInit() {
    this.nameErrors$.subscribe(console.log);
    this.emailErrors$.subscribe(console.log);
    this.messageErrors$.subscribe(console.log);
    this.form.statusChanges.subscribe(console.log);
  }

  public submit(event: any) {
    this.loading$.next(true);

    timer(5000).pipe(first()).subscribe(() => {
      this.form.setValue({
        name: '1',
        email: '2',
        message: '3',
      });
      this.loading$.next(false);
    });
  }
}