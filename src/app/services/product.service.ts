import {Injectable} from '@angular/core';
import { ApolloQueryResult } from '@apollo/client';
import { Apollo, gql } from 'apollo-angular';
import {Observable, of} from 'rxjs';
import {IPagination, IProduct} from '../utils/models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private apollo: Apollo) {
  }

  // TODO add
  getProductPage(limit: number, token?: string): Observable<IPagination<IProduct[]>> {
    const product = {
      id: '0',
      title: 'Some product title',
      description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.\n' +
        '      A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally\n' +
        '      bred for hunting.',
      price: '20 By',
      location: 'Misk',
      sourceLink: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      imageLink: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    };

    return of({
      token: 'page',
      limit: 10,
      data: [product, product, product, product, product, product, product, product, product, product],
    });
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
          query onlinerApartments(limit: $limit, token: $token) {
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
                    latitude
                    longitude
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
          query onlinerApartments {
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
                    latitude
                    longitude
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

export type OnlinerApartmentRow {
  id: number;
  status: ApartmentStatus;
  apartment: OnlinerApartment;
  createdAt: string;
  updatedAt?: string;
  expirationTime: number;
}

export type ApartmentStatus = 'NEW' | 'IN_FLIGHT' | 'ERROR' | 'OLD';

export type OnlinerApartment {
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
  latitude: number;
  longitude: number;
}