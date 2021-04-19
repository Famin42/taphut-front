import { catchError, map, tap } from 'rxjs/operators';
import { Apollo, ApolloBase } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { queryOnlinerApartmentsPagination } from 'src/app/utils/public-schema.graphql';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { LoadingService } from 'src/app/core/services/loading.service';

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
    return this.queryWithParams(limit, token ? token : null);
  }

  private queryWithParams(
    limit = 10,
    token: string | null
  ): Observable<ApolloQueryResult<IOnlinerPaginationRes>> {
    return this.apollo.query({
      query: queryOnlinerApartmentsPagination,
      variables: {
        limit,
        token,
      },
    });
  }
}
