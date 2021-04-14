import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { Component } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  pageMode: Observable<FilterPageMode>;
  /**
   * filterName: name as string,
   * currency: currency as Currency,
   * city: city as string | undefined,
   * minPrice: min as number | undefined,
   * maxPrice: max as number | undefined,
   * roomsNumber: rooms as number | undefined,
   */
  filterForm = new FormGroup({
    filterName: new FormControl(''),
    currency: new FormControl(''),
    city: new FormControl(''),
    minPrice: new FormControl(''),
    maxPrice: new FormControl(''),
    roomsNumber: new FormControl(''),
  });

  get filterName(): AbstractControl | null {
    return this.filterForm.get(`filterName`);
  }
  get currency(): AbstractControl | null {
    return this.filterForm.get(`currency`);
  }
  get city(): AbstractControl | null {
    return this.filterForm.get(`city`);
  }
  get minPrice(): AbstractControl | null {
    return this.filterForm.get(`minPrice`);
  }
  get maxPrice(): AbstractControl | null {
    return this.filterForm.get(`maxPrice`);
  }
  get roomsNumber(): AbstractControl | null {
    return this.filterForm.get(`roomsNumber`);
  }

  constructor(private route: ActivatedRoute) {
    this.pageMode = this.route.data.pipe(
      tap((data: Data) => {
        const { filter, mode } = data as { filter: IFilter; mode: FilterPageMode };
        if (filter && mode === FilterPageMode.EDIT) {
          console.log(`this.filterForm.patchValue`);
          console.log(filter);
          this.filterForm.patchValue({ ...filter });
        }
      }),
      map((data: Data) => data.mode)
    );
  }

  submit(): void {
    console.log(`Submit`);
  }
}
