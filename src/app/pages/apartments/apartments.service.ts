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

  getProductPage(args: IApartmentsParams): Observable<OnlinerResData> {
    this.loadingService.start();
    return this.query(args).pipe(
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

  private query(args: IApartmentsParams): Observable<ApolloQueryResult<IOnlinerPaginationRes>> {
    const input = {
      limit: args.limit ? args.limit : null,
      nextToken: args.token ? args.token : null,
      addresses: args?.addresses ? args.addresses : null,
      currency: args?.currency ? args.currency : null,
      minPrice: args?.minPrice ? args.minPrice : null,
      maxPrice: args?.maxPrice ? args.maxPrice : null,
      roomsNumber: args?.roomsNumber ? args.roomsNumber : null,
    };

    return this.apollo.query({
      query: queryOnlinerApartmentsPagination,
      variables: {
        input,
      },
    });
  }
}
