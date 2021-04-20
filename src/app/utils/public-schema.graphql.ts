import { gql } from 'apollo-angular';

export const queryOnlinerApartmentsPagination = gql`
  query($input: IFilterArgs!) {
    onlinerApartments(input: $input) {
      items {
        id
        status
        apartment {
          id
          price {
            amount
            currency
            converted {
              USD {
                amount
                currency
              }
              BYN {
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
`;
