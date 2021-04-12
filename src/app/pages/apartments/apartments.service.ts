import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ApartmentsService {
  constructor(private apollo: Apollo) {}

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
      query: gql`
        query($limit: Int!, $token: String) {
          onlinerApartments(limit: $limit, nextToken: $token) {
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
          }
        }
      `,
      variables: {
        limit,
        token,
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
          }
        }
      `,
    });
  }
}
