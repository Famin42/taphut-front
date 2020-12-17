import {Injectable} from '@angular/core';
import { ApolloQueryResult } from '@apollo/client';
import { Apollo, gql } from 'apollo-angular';
import {Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import {IPagination, IProduct} from '../utils/models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private apollo: Apollo) {
  }

  // TODO add
  getProductPage(limit: number, token?: string): Observable<IPagination<IProduct[]>> {
    return this.query(limit, token)
    .pipe(
      map(({data}: ApolloQueryResult<IOnlinerPaginationRes>) => ({
        token: data.nextToken,
        limit: data.scannedCount,
        data: data.items.map((item: OnlinerApartmentRow) => this.convertToProduct(item))
      }))
    )
  }

  convertToProduct(item: OnlinerApartmentRow): IProduct {
    return {
      id: item.id.toString(),
      title: item.apartment.rent_type.split('_').concat(' ').toString(),
      description: item.apartment.location.address,
      price: item.apartment.price.converted['USD'].amount,
      location: item.apartment.location.address,
      sourceLink: item.apartment.url,
      imageLink: item.apartment.photo
    };
  }

  query(limit: number = 10, token?: string): Observable<ApolloQueryResult<IOnlinerPaginationRes>> {
    if (token) {
      return this.queryWithParams(limit, token);
    } else {
      return this.queryWithoutParams()
    }
  
  }

  private queryWithParams(limit: number = 10, token: string): Observable<ApolloQueryResult<IOnlinerPaginationRes>> {
    return this.apollo.query({
      query: gql`
        query onlinerApartments($limit: Int!, $token: String){
          onlinerApartments(limit: $limit, token: $token) {
            items {
                id
                status
                apartment {
                  id
                  price {
                    amount
                    currency
                    converted {
                      key {
                        amount
                        currency
                      }
                    }
                  }
                  rent_type
                  location {
                    address
                    user_address
                  }
                  photo
                  created_at
                  last_time_up
                  up_available_in
                  url
                }
                createdAt
                expirationTime
                updatedAt
            }
            nextToken
            scannedCount
            startedAt
          }
        }
      `,
      variables: {
        limit,
        token
      },
    });
  }

  private queryWithoutParams(): Observable<ApolloQueryResult<IOnlinerPaginationRes>> {
    return this.apollo.query({
      query: gql`
        query onlinerApartments {
          onlinerApartments {
            items {
                id
                status
                apartment {
                  id
                  price {
                    amount
                    currency
                    converted {
                      key {
                        amount
                        currency
                      }
                    }
                  }
                  rent_type
                  location {
                    address
                    user_address
                  }
                  photo
                  created_at
                  last_time_up
                  up_available_in
                  url
                }
                createdAt
                expirationTime
                updatedAt
            }
            nextToken
            scannedCount
            startedAt
          }
        }
      `
    });
  }
}

export type IOnlinerPaginationRes = {
  nextToken: string | undefined; // if undefined, then it is the last page
  scannedCount: number;         // same as limit, but in the answer
  items: OnlinerApartmentRow[];
}

export type OnlinerApartmentRow = {
  id: number;
  status: ApartmentStatus;
  apartment: OnlinerApartment;
  createdAt: string;
  updatedAt?: string;
  expirationTime: number;
}

export type ApartmentStatus = 'NEW' | 'IN_FLIGHT' | 'ERROR' | 'OLD';

export type OnlinerApartment = {
  id: number;
  price: {
    amount: string;
    currency: OnlinerCurrences;
    converted: {
      [key: string]: { // key ca be: USD and BYN
        amount: string;
        currency: OnlinerCurrences;
      };
    };
  };
  rent_type: OnlinerRentType;
  location: IOnlinerApartmentLocation;
  photo: string;
  contact: {
    owner: boolean;
  };
  created_at: string;
  last_time_up: string;
  up_available_in: number;
  url: string;
}

export type OnlinerCurrences = 'USD' | 'BYN';

export type OnlinerRentType = '1_rooms' | '2_rooms' | '3_rooms' | '4_rooms' | '5_rooms';

export interface IOnlinerApartmentLocation {
  address: string;
  user_address: string;
}