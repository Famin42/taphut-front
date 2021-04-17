import { LoadingService } from 'src/app/core/services/loading.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AccessHistoryService } from './access-history.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';

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
  loading!: Observable<boolean>;
  displayedColumns = COLUMNS;
  dataSource: MatTableDataSource<IAuthEvent>;

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

  loadMore(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loadingService.start();
    this.accessHistoryService.getAccessHistory(this.nextToken).subscribe(
      (value) => {
        this.handleSuccess(value);
      },
      (error) => {
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
