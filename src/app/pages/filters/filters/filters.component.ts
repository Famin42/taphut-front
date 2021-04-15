import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

import {
  ConfirmationDialogComponent,
  ConfirmDialogModel,
} from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { AmplifyService } from 'src/app/core/services/amplify.service';
import { FilterService } from '../services/filter.service';

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

// TODO: fix table sorting/filtration
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements AfterViewInit {
  displayedColumns: string[];
  dataSource!: MatTableDataSource<IFilter>;

  @ViewChild(MatSort, { static: false })
  sort!: MatSort;

  constructor(
    private amplify: AmplifyService,
    private filterService: FilterService,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<IFilter>([]);
    this.displayedColumns = COLUMNS;
    this.amplify.chatId
      .pipe(
        filter((chatId: string | undefined) => !!chatId),
        take(1),
        switchMap((chatId: string | undefined) => this.filterService.getFilters(chatId as string)),
        map((data: IFilterRow[]) => data.map(({ filter }: IFilterRow) => filter))
      )
      .subscribe((data: IFilter[]) => {
        this.dataSource = new MatTableDataSource<IFilter>(data);
        this.dataSource.sort = this.sort;
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

    dialogRef.afterClosed().subscribe((dialogResult: boolean) => {
      if (dialogResult) {
        this.dataSource.data = this.dataSource.data.filter(
          ({ filterName }: IFilter) => filterName !== name
        );
      }
    });
  }
}
