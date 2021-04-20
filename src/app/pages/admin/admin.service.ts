import { Apollo, ApolloBase } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import * as PrivateSchema from 'src/app/utils/private-schema.graphql';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { LoadingService } from 'src/app/core/services/loading.service';

export interface IUsersInfo {
  Username: string;
  Attributes: IUserInfoAttr;
  UserCreateDate: string;
  UserLastModifiedDate: string;
  Enabled: string;
  UserStatus: string;
}

export interface IUserInfoAttr {
  sub: string;
  email_verified: string;
  email: string;
  chatId: string;
  identities: string;
  picture: string;
}

interface IQueryAdminGetUsers {
  adminGetUsers: {
    Users: IUsersInfo[];
    PaginationToken?: string;
  };
}

@Injectable()
export class AdminService {
  users: BehaviorSubject<IUsersInfo[]> = new BehaviorSubject<IUsersInfo[]>([]);
  isEnd: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private data: IUsersInfo[] = [];
  private token?: string;
  private apollo: ApolloBase;
  constructor(
    private snackBService: SnackbarService,
    private loadingService: LoadingService,
    apolloProvider: Apollo
  ) {
    this.apollo = apolloProvider.use('PrivateAppSync');
  }

  load(Limit = 20): void {
    if (!this.token && this.data.length) return;

    this.loadingService.start();

    this.query({ Limit, PaginationToken: this.token })
      .pipe(
        catchError((error: Error) => {
          this.loadingService.stop();
          this.snackBService.openSnackBar(error.message, 'Error');
          throw Error;
        })
      )
      .subscribe(({ Users, PaginationToken }) => {
        this.token = PaginationToken;
        this.data = [...this.data, ...Users];
        this.isEnd.next(!!this.data.length && !this.token);
        this.users.next(this.data);
        this.loadingService.stop();
      });
  }

  private query(variables: {
    PaginationToken?: string;
    Limit: number;
  }): Observable<{
    Users: IUsersInfo[];
    PaginationToken?: string;
  }> {
    return this.apollo
      .query<IQueryAdminGetUsers>({
        query: PrivateSchema.queryAdminGetUsers,
        variables,
      })
      .pipe(map(({ data }: ApolloQueryResult<IQueryAdminGetUsers>) => data.adminGetUsers));
  }
}
