import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { AmplifyService } from 'src/app/core/services/amplify.service';
import { APP_ROUTES } from 'src/app/utils/routes';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnDestroy, OnInit {
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

  private subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBService: SnackbarService,
    private amplify: AmplifyService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.data
      .pipe(
        tap((data: Data) => {
          console.log(`FilterComponent ActivatedRoute Data`);
          console.log(data);
          const { filter, mode } = data as { filter: IFilterRow; mode: FilterPageMode };
          if (filter && mode === FilterPageMode.EDIT) {
            this.filterForm.patchValue({ ...filter.filter });
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
      this.amplify.chatId
        .pipe(
          filter((chatId: string | undefined) => !!chatId),
          take(1),
          switchMap((chatId: string | undefined) => {
            switch (this.pageMode) {
              case FilterPageMode.CREATE:
                return this.filterService.createFilter({
                  chatId: chatId as string,
                  ...this.getFilterValue,
                });
              case FilterPageMode.EDIT:
                return this.filterService.updateFilter({
                  chatId: chatId as string,
                  ...this.getFilterValue,
                });
              default:
                throw new Error('Unknown page mode');
            }
          }),
          catchError((error: Error) => {
            this.snackBService.openSnackBar(error.message, 'Error');
            return of(undefined);
          })
        )
        .subscribe((result: IFilterRow | undefined) => {
          if (result) {
            this.snackBService.openSnackBar('success', '🎉');
            this.router.navigate([APP_ROUTES.filters]);
          }
        });
    } else {
      this.snackBService.openSnackBar('Form is invalid', 'Error');
      this.filterForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private get getFilterValue(): IFilter {
    let filter: IFilter = Object.keys(this.filterForm.value).reduce(
      (prev: IFilter, key: string) => {
        const value = this.filterForm.value[key];
        if (value !== null) {
          prev = {
            ...prev,
            [key]: value,
          };
        }
        return prev;
      },
      {} as IFilter
    );

    const filterName: string = this.filterName?.value;
    filter = { ...filter, filterName };

    return filter;
  }
}
