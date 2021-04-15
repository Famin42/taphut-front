import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Component } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { APP_ROUTES } from 'src/app/utils/routes';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  pageMode!: FilterPageMode;

  get isEditMode(): boolean {
    return this.pageMode === FilterPageMode.EDIT;
  }

  filterForm = new FormGroup({
    filterName: new FormControl('', [Validators.required]), //                    string,
    currency: new FormControl('', [Validators.required]), //                      Currency,
    city: new FormControl(''), //                                                 string | undefined,
    minPrice: new FormControl(''), //                                             number | undefined,
    maxPrice: new FormControl(''), //                                             number | undefined,
    roomsNumber: new FormControl('', [Validators.min(1), Validators.max(10)]), // number | undefined,
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

  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBService: SnackbarService
  ) {
    this.subscription = this.route.data
      .pipe(
        tap((data: Data) => {
          const { filter, mode } = data as { filter: IFilter; mode: FilterPageMode };
          if (filter && mode === FilterPageMode.EDIT) {
            console.log(`this.filterForm.patchValue`);
            console.log(filter);
            this.filterForm.patchValue({ ...filter });
          }
        }),
        map((data: Data) => data.mode)
      )
      .subscribe((mode: FilterPageMode) => {
        this.pageMode = mode;
        if (mode === FilterPageMode.EDIT) {
          this.filterForm.get('filterName')?.disable();
        }
      });
  }

  submit(): void {
    console.log(`Submit filter`);
    console.log(this.filterForm);
    if (this.filterForm.valid) {
      this.snackBService.openSnackBar('success', '🎉');
      this.router.navigate([APP_ROUTES.filters]);
    } else {
      this.snackBService.openSnackBar('Form is invalid', 'Error');
      this.filterForm.markAllAsTouched();
    }
  }
}
