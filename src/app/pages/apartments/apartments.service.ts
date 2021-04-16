import { catchError, map, tap } from 'rxjs/operators';
import { Apollo, ApolloBase } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoadingService } from 'src/app/core/services/loading.service';
import {
  queryOnlinerApartments,
  queryOnlinerApartmentsPagination,
} from 'src/app/utils/public-schema.graphql';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Injectable()
export class ApartmentsService {
  private apollo: ApolloBase;
  constructor(
    private loadingService: LoadingService,
    private snackBService: SnackbarService,
    apolloProvider: Apollo
  ) {
    this.apollo = apolloProvider.use('PublicAppSync');
  }

  getProductPage({ limit, token }: IApartmentsParams): Observable<OnlinerResData> {
    this.loadingService.start();
    return this.query(limit, token).pipe(
      map((data: any) => {
        return data.data.onlinerApartments;
      }),
      tap(() => this.loadingService.stop()),
      catchError((error: Error) => {
        this.loadingService.stop();
        this.snackBService.openSnackBar(error.message, 'Error');
        throw error;
      })
    );
  }

  query(limit = 10, token?: string): Observable<ApolloQueryResult<IOnlinerPaginationRes>> {
    if (token) {
      return this.queryWithParams(limit, token);
    } else {
      return this.queryWithoutParams();
    }
  }

  private queryWithParams(
    limit = 10,
    token: string
  ): Observable<ApolloQueryResult<IOnlinerPaginationRes>> {
    return this.apollo.query({
      query: queryOnlinerApartmentsPagination,
      variables: {
        limit,
        token,
      },
    });
  }

  private queryWithoutParams(): Observable<ApolloQueryResult<IOnlinerPaginationRes>> {
    return this.apollo.query({
      query: queryOnlinerApartments,
    });
  }
}
