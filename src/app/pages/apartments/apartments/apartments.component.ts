import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { BaseFilter, CURRENCY_VALUES } from '../../filters/base-filter';
import { ApartmentsService } from './apartments.service';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.scss'],
  providers: [ApartmentsService],
})
export class ApartmentsComponent extends BaseFilter implements OnInit, OnDestroy {
  apartments: IProduct[] = [];

  isDirty = false;

  private get addresses(): string[] | null {
    return this.city?.value
      ? (this.city?.value as string).toLowerCase().replace(/\s+/g, ' ').trim().split(' ')
      : null;
  }
  private get rentType(): RentTypeArgs | null {
    if (this.roomsNumber?.value === 1) {
      return '1_room';
    } else if (this.roomsNumber?.value > 1) {
      return `${this.roomsNumber?.value}_rooms` as RentTypeArgs;
    }

    return null;
  }

  private subscription: Subscription;
  private get queryParams(): Omit<IApartmentsParams, 'nextToken' | 'limit'> {
    const currency = this.currency?.value ? this.currency?.value : null;
    const addresses = this.addresses ? this.addresses : null;
    const roomsNumber = this.rentType;
    const minPrice = this.minPrice?.value ? this.minPrice.value : null;
    const maxPrice = this.maxPrice?.value ? this.maxPrice.value : null;
    return {
      currency,
      addresses,
      roomsNumber,
      minPrice,
      maxPrice,
    };
  }

  constructor(private apartmentsService: ApartmentsService) {
    super(false);
    this.currency?.setValue(CURRENCY_VALUES[0]);
    this.filterForm.markAsPristine();
    this.subscription = new Subscription();

    this.subscription.add(
      this.filterForm.valueChanges
        .pipe(
          tap(() => (this.isDirty = true)),
          switchMap(() => this.apartmentsService.changeFilters(this.queryParams))
        )
        .subscribe()
    );
    this.subscription.add(
      (this.subscription = this.apartmentsService.data.subscribe(
        (data: IProduct[]) => (this.apartments = data)
      ))
    );
  }

  ngOnInit(): void {
    this.apartmentsService.loadMore().subscribe();
  }

  onScroll(): void {
    this.apartmentsService.loadMore().subscribe();
  }

  clear(): void {
    this.maxPrice?.setValue(undefined);
    this.minPrice?.setValue(undefined);
    this.city?.setValue(undefined);
    this.roomsNumber?.setValue(undefined);
    this.isDirty = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
