import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedlModule } from 'src/app/common/modules/shared.module';
import { ApartmentsComponent } from './apartments.component';

describe('ApartmentsComponent', () => {
  let component: ApartmentsComponent;
  let fixture: ComponentFixture<ApartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApartmentsComponent],
      imports: [SharedlModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
