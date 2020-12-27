import { provideMockStore } from '@ngrx/store/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { apartmentsInitialState } from '../store/reducers';
import { ApartmentsComponent } from './apartments.component';
import { SharedlModule } from 'src/app/common/modules';

describe('ApartmentsComponent', () => {
  let component: ApartmentsComponent;
  let fixture: ComponentFixture<ApartmentsComponent>;

  const initialState: IAppState = { apartmentsState: apartmentsInitialState };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApartmentsComponent],
      providers: [provideMockStore({ initialState })],
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
