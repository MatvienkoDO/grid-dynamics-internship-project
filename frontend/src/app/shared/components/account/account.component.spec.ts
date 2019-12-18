import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTab, MatTabGroup, MatTabHeader, MatTabLabel, MatDialogActions, MatTabBody } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';

import { AccountComponent } from './account.component';
import { MockTranslatePipe } from 'src/app/testing/test/mock-translate.pipe';

xdescribe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, ShowHidePasswordModule],
      declarations: [
        AccountComponent,
        MatTab,
        MatTabGroup,
        MatTabHeader,
        MatTabLabel,
        MatTabBody,
        MatDialogActions,
        MockTranslatePipe,
      ]
    })
    .overrideTemplate(AccountComponent, '')
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
