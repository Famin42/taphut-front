import { LoadingService } from 'src/app/core/services/loading.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';

import { AccessHistoryService } from './access-history.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

const COLUMNS: string[] = [
  'type',
  'creationDate',
  'response',
  'riskDecision',
  'ipAddress',
  'deviceName',
  'location',
];

@Component({
  selector: 'app-access-history',
  templateUrl: './access-history.component.html',
  styleUrls: ['./access-history.component.scss'],
  providers: [AccessHistoryService],
})
export class AccessHistoryComponent implements OnInit {
  @ViewChild(MatSort, { static: false })
  sort!: MatSort;
  loading!: Observable<boolean>;
  displayedColumns = COLUMNS;
  dataSource: MatTableDataSource<IAuthEvent>;
  first = true;

  get isEnd(): boolean {
    return !!this.dataSource.data.length && !this.nextToken;
  }

  private nextToken?: string;

  constructor(
    private snackbarService: SnackbarService,
    private loadingService: LoadingService,
    private accessHistoryService: AccessHistoryService
  ) {
    this.dataSource = new MatTableDataSource<IAuthEvent>([]);
  }

  ngOnInit(): void {
    this.loading = this.loadingService.loading;
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadMore(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loadingService.start();
    this.accessHistoryService.getAccessHistory(this.nextToken).subscribe(
      (value) => {
        this.first = false;
        this.handleSuccess(value);
      },
      (error) => {
        this.first = false;
        this.handleRequestError(error);
      }
    );
  }

  private handleSuccess({ authEvents, nextToken }: IAccessHistoryData): void {
    this.loadingService.stop();
    this.nextToken = nextToken;
    this.dataSource.data = [...this.dataSource.data, ...authEvents];
  }

  private handleRequestError(error: any): void {
    console.log('error: ', error);
    this.loadingService.stop();
    this.snackbarService.openSnackBar(error.message, 'error');
  }
}
