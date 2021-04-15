import { Apollo, ApolloBase } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {
  queryOnlinerApartments,
  queryOnlinerApartmentsPagination,
} from 'src/app/utils/public-schema.graphql';

@Injectable()
export class ApartmentsService {
  private apollo: ApolloBase;
  constructor(apolloProvider: Apollo) {
    this.apollo = apolloProvider.use('PublicAppSync');
  }

  getProductPage({ limit, token }: IApartmentsParams): Observable<OnlinerResData> {
    return this.query(limit, token).pipe(
      map((data: any) => {
        return data.data.onlinerApartments;
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
