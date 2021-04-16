import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessHistoryComponent } from './access-history.component';

describe('AccessHistoryComponent', () => {
  let component: AccessHistoryComponent;
  let fixture: ComponentFixture<AccessHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
