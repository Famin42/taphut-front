import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { LoadApartments } from '../store/actions';
import { apartmentsReducer } from '../store/reducers';
import { getApartmentsData } from '../store/selectors/apartments.selectors';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.scss'],
})
export class ApartmentsComponent implements OnInit, OnDestroy {
  apartments: IProduct[] = [];
  token?: string;
  limit = 10;

  private subscription: Subscription;

  constructor(private store: Store<IAppState>) {
    this.store.addReducer('apartmentsState', apartmentsReducer);
    this.subscription = this.store.pipe(select(getApartmentsData)).subscribe((res) => {
      this.token = res.token;
      this.apartments = res.data;
    });
  }

  ngOnInit(): void {
    this.downloadData();
  }

  onScroll(): void {
    this.downloadData();
  }

  downloadData(): void {
    if (!this.token && this.apartments.length) {
      return;
    }

    this.store.dispatch(new LoadApartments({ token: this.token, limit: this.limit }));
  }

  ngOnDestroy(): void {
    this.store.removeReducer('apartmentsState');
    this.subscription.unsubscribe();
  }
}
