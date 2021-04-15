import { Apollo, ApolloBase } from 'apollo-angular';
import { ApolloQueryResult, FetchResult } from '@apollo/client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as PrivateSchema from 'src/app/utils/private-schema.graphql';
import { map } from 'rxjs/operators';

@Injectable()
export class FilterService {
  private apollo: ApolloBase;
  constructor(apolloProvider: Apollo) {
    this.apollo = apolloProvider.use('PrivateAppSync');
  }

  getFilters(chatId: string): Observable<IFilterRow[]> {
    return this.apollo
      .query<IQueryFilters>({
        query: PrivateSchema.queryFilters,
        variables: {
          chatId,
        },
      })
      .pipe(map(({ data }: ApolloQueryResult<IQueryFilters>) => data.filters));
  }

  getFilterByName(chatId: string, filterName: string): Observable<IFilterRow> {
    return this.apollo
      .query<IQueryFilterByName>({
        query: PrivateSchema.queryFilterByFilterName,
        variables: {
          chatId,
          filterName,
        },
      })
      .pipe(map(({ data }: ApolloQueryResult<IQueryFilterByName>) => data.filterByName));
  }

  createFilter(input: IFilterArgs): Observable<IFilterRow | undefined> {
    return this.apollo
      .mutate<IMutationCreateFilter>({
        mutation: PrivateSchema.mutationCreateFilter,
        variables: {
          input,
        },
      })
      .pipe(map(({ data }: FetchResult<IMutationCreateFilter>) => data?.createFilter));
  }

  updateFilter(input: IFilterArgs): Observable<IFilterRow | undefined> {
    return this.apollo
      .mutate<IMutationUpdateFilter>({
        mutation: PrivateSchema.mutationUpdateFilter,
        variables: {
          input,
        },
      })
      .pipe(map(({ data }: FetchResult<IMutationUpdateFilter>) => data?.updateFilter));
  }

  deleteFilterByName(chatId: string, filterName: string): Observable<IFilterRow | undefined> {
    return this.apollo
      .mutate<IMutationDeleteFilter>({
        mutation: PrivateSchema.mutationDeleteFilter,
        variables: {
          chatId,
          filterName,
        },
      })
      .pipe(map(({ data }: FetchResult<IMutationDeleteFilter>) => data?.deleteFilter));
  }
}
