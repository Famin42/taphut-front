import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { of, Observable, Subscription } from 'rxjs';

import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { AmplifyService } from 'src/app/core/services/amplify.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { FilterService } from '../services/filter.service';

import { APP_ROUTES } from 'src/app/utils/routes';
import { BaseFilter } from '../base-filter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent extends BaseFilter implements OnDestroy, OnInit {
  pageMode!: FilterPageMode;
  loading!: Observable<boolean>;
  get isEditMode(): boolean {
    return this.pageMode === FilterPageMode.EDIT;
  }

  private subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBService: SnackbarService,
    private amplify: AmplifyService,
    private filterService: FilterService,
    private loadingService: LoadingService
  ) {
    super();
  }

  ngOnInit(): void {
    this.loading = this.loadingService.loading;
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
      this.loadingService.start();
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
            this.loadingService.stop();
            this.snackBService.openSnackBar(error.message, 'Error');
            return of(undefined);
          })
        )
        .subscribe((result: IFilterRow | undefined) => {
          this.loadingService.stop();
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
}
