import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, Observable } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';

import { AdminService, IUsersInfo } from './admin.service';

const COLUMNS: string[] = [
  'Username',
  'email',
  'sub',
  'UserCreateDate',
  'UserLastModifiedDate',
  'UserStatus',
  'chatId',
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [AdminService],
})
export class AdminComponent implements OnInit, OnDestroy {
  loading!: Observable<boolean>;
  isEnd!: Observable<boolean>;
  displayedColumns!: string[];
  dataSource!: MatTableDataSource<IUsersInfo>;
  first = true;

  private subscription!: Subscription;
  constructor(private adminService: AdminService, private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<IUsersInfo>([]);
    this.displayedColumns = COLUMNS;
    this.loading = this.loadingService.loading;
    this.isEnd = this.adminService.isEnd;
    this.subscription = this.adminService.users.subscribe((data) => (this.dataSource.data = data));
    this.load();
  }

  load(): void {
    this.first = false;
    this.adminService.load(10);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
