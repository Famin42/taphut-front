import { Apollo, ApolloBase } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { queryAuthEvents } from 'src/app/utils/private-schema.graphql';

@Injectable()
export class AccessHistoryService {
  private apollo: ApolloBase;

  constructor(apolloProvider: Apollo) {
    this.apollo = apolloProvider.use('PrivateAppSync');
  }

  getAccessHistory(nextToken?: string | null, limit = 10): Observable<IAccessHistoryData> {
    nextToken = nextToken ? nextToken : null;
    return this.apollo
      .query<IAccessHistoryQuery>({
        query: queryAuthEvents,
        variables: {
          nextToken,
          limit,
        },
      })
      .pipe(map(({ data }: ApolloQueryResult<IAccessHistoryQuery>) => data.authEvents));
  }
}
