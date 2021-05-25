import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectSilentRenewComponent } from './redirect-silent-renew.component';

describe('RedirectSilentRenewComponent', () => {
  let component: RedirectSilentRenewComponent;
  let fixture: ComponentFixture<RedirectSilentRenewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedirectSilentRenewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectSilentRenewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
