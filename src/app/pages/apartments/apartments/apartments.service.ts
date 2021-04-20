import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Apollo, ApolloBase } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client';
import { Injectable } from '@angular/core';

import { queryOnlinerApartmentsPagination } from 'src/app/utils/public-schema.graphql';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Injectable()
export class ApartmentsService {
  data: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);
  private items: IProduct[] = [];

  private filters: Omit<IApartmentsParams, 'nextToken' | 'limit'> = {
    addresses: null,
    roomsNumber: null,
    currency: null,
    minPrice: null,
    maxPrice: null,
  };
  private nextToken: string | null = null;
  private limit = 100;

  private apollo: ApolloBase;
  constructor(
    private loadingService: LoadingService,
    private snackBService: SnackbarService,
    apolloProvider: Apollo
  ) {
    this.apollo = apolloProvider.use('PublicAppSync');
  }

  changeFilters(
    newValue: Partial<Omit<IApartmentsParams, 'nextToken' | 'limit'>>
  ): Observable<any> {
    this.resetData();

    this.filters = {
      ...this.filters,
      ...newValue,
    };

    const params: IApartmentsParams = {
      nextToken: this.nextToken,
      limit: this.limit,
      ...this.filters,
    };

    this.loadingService.start();
    return this.query(params).pipe(
      map((data: ApolloQueryResult<IOnlinerPaginationRes>) => {
        return data.data.onlinerApartments;
      }),
      switchMap((data: OnlinerResData) => from(this.setData(data))),
      tap(() => this.loadingService.stop()),
      catchError((error: Error) => {
        this.loadingService.stop();
        this.snackBService.openSnackBar(error.message, 'Error');
        throw error;
      })
    );
  }

  loadMore(): Observable<any> {
    if (!this.nextToken && this.items.length) return of();

    const params: IApartmentsParams = {
      nextToken: this.nextToken,
      limit: this.limit,
      ...this.filters,
    };

    this.loadingService.start();
    return this.query(params).pipe(
      map((data: ApolloQueryResult<IOnlinerPaginationRes>) => {
        return data.data.onlinerApartments;
      }),
      switchMap((data: OnlinerResData) => from(this.setData(data))),
      tap(() => this.loadingService.stop()),
      catchError((error: Error) => {
        this.loadingService.stop();
        this.snackBService.openSnackBar(error.message, 'Error');
        throw error;
      })
    );
  }

  private query(input: IApartmentsParams): Observable<ApolloQueryResult<IOnlinerPaginationRes>> {
    return this.apollo.query({
      query: queryOnlinerApartmentsPagination,
      variables: {
        input,
      },
    });
  }

  private async setData({ items, nextToken }: Omit<OnlinerResData, 'scannedCount'>): Promise<void> {
    console.log(nextToken);
    while (items.length < this.limit && nextToken) {
      const params: IApartmentsParams = {
        nextToken,
        limit: this.limit,
        ...this.filters,
      };
      const res = await this.query(params).toPromise();
      nextToken = res.data.onlinerApartments.nextToken;
      items = [...items, ...res.data.onlinerApartments.items];
      console.log(res.data.onlinerApartments.nextToken);
    }

    this.nextToken = nextToken ? nextToken : null;

    this.items = [
      ...this.items,
      ...items.map((item: OnlinerApartmentRow) => this.convertToProduct(item)),
    ];
    this.data.next(this.items);
  }

  private resetData(): void {
    this.nextToken = null;
    this.items = [];
    this.data.next(this.items);
  }

  private convertToProduct(item: OnlinerApartmentRow): IProduct {
    return {
      id: item.id.toString(),
      title: item.apartment.rent_type.split('_').concat(' ').toString(),
      description: item.apartment.location.address,
      price: item.apartment.price.amount,
      currency: item.apartment.price.currency,
      location: item.apartment.location.address,
      sourceLink: item.apartment.url,
      imageLink: item.apartment.photo,
    };
  }
}
