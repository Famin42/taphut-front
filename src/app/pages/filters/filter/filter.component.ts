import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Component } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { APP_ROUTES } from 'src/app/utils/routes';

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
    filterName: new FormControl('', [Validators.required]),
    currency: new FormControl('', [Validators.required]),
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBService: SnackbarService
  ) {
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
    console.log(`Submit filter`);
    if (this.filterForm.valid) {
      this.snackBService.openSnackBar('success', '🎉');
      this.router.navigate([APP_ROUTES.filters]);
    } else {
      this.snackBService.openSnackBar('Form is invalid', 'Error');
      this.filterForm.markAllAsTouched();
    }
  }
}
