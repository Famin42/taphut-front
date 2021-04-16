import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { of, Observable } from 'rxjs';

import {
  ConfirmationDialogComponent,
  ConfirmDialogModel,
} from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { AmplifyService } from 'src/app/core/services/amplify.service';
import { FilterService } from '../services/filter.service';
import { LoadingService } from 'src/app/core/services/loading.service';

const COLUMNS: string[] = [
  'filterName',
  'city',
  'currency',
  'minPrice',
  'maxPrice',
  'roomsNumber',
  'edit',
  'delete',
];

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements AfterViewInit {
  @ViewChild(MatSort, { static: false })
  sort!: MatSort;
  loading: Observable<boolean>;
  displayedColumns: string[];
  dataSource!: MatTableDataSource<IFilter>;

  private chatId!: string;

  constructor(
    private amplify: AmplifyService,
    private filterService: FilterService,
    private dialog: MatDialog,
    private snackBService: SnackbarService,
    private loadingService: LoadingService
  ) {
    this.dataSource = new MatTableDataSource<IFilter>([]);
    this.displayedColumns = COLUMNS;
    this.loading = this.loadingService.loading;
    this.loadingService.start();
    this.amplify.chatId
      .pipe(
        filter((chatId: string | undefined) => !!chatId),
        take(1),
        tap((chatId: string | undefined) => (this.chatId = chatId as string)),
        switchMap((chatId: string | undefined) => this.filterService.getFilters(chatId as string)),
        map((data: IFilterRow[]) => data.map(({ filter }: IFilterRow) => filter)),
        catchError((error: Error) => {
          this.loadingService.stop();
          this.snackBService.openSnackBar(error.message, 'Error');
          throw Error;
        })
      )
      .subscribe((data: IFilter[]) => {
        this.loadingService.stop();
        this.dataSource.data = data;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteFilter(name: string): void {
    const message = `Are you sure you want to delete "${name}" filter?`;
    const dialogData = new ConfirmDialogModel('Confirm Action', message, 'warn');

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData,
    });

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((dialogResult: boolean) => {
          if (dialogResult) {
            this.loadingService.start();
            return this.filterService.deleteFilterByName(this.chatId, name);
          }
          return of(false);
        }),
        catchError((error: Error) => {
          this.loadingService.stop();
          this.snackBService.openSnackBar(error.message, 'Error');
          return of(undefined);
        })
      )
      .subscribe((dialogResult: boolean | IFilterRow | undefined) => {
        if (dialogResult) {
          this.dataSource.data = this.dataSource.data.filter(
            ({ filterName }: IFilter) => filterName !== name
          );
          this.loadingService.stop();
          this.snackBService.openSnackBar(`${name} was deleted successful`, '🎉');
        }
      });
  }
}
