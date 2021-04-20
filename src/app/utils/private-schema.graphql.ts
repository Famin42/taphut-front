import { gql } from 'apollo-angular';

export const queryFilters = gql`
  query($chatId: String!) {
    filters(chatId: $chatId) {
      chatId
      filterName
      createdAt
      updatedAt
      filter {
        filterName
        city
        currency
        minPrice
        maxPrice
        roomsNumber
      }
    }
  }
`;

export const queryFilterByFilterName = gql`
  query($chatId: String!, $filterName: String!) {
    filterByName(chatId: $chatId, filterName: $filterName) {
      chatId
      filterName
      createdAt
      updatedAt
      filter {
        filterName
        city
        currency
        minPrice
        maxPrice
        roomsNumber
      }
    }
  }
`;

export const mutationCreateFilter = gql`
  mutation($input: IFilterArgs!) {
    createFilter(input: $input) {
      chatId
      filterName
      createdAt
      updatedAt
      filter {
        filterName
        city
        currency
        minPrice
        maxPrice
        roomsNumber
      }
    }
  }
`;

export const mutationUpdateFilter = gql`
  mutation($input: IFilterArgs!) {
    updateFilter(input: $input) {
      chatId
      filterName
      createdAt
      updatedAt
      filter {
        filterName
        city
        currency
        minPrice
        maxPrice
        roomsNumber
      }
    }
  }
`;

export const mutationDeleteFilter = gql`
  mutation($chatId: String!, $filterName: String!) {
    deleteFilter(chatId: $chatId, filterName: $filterName) {
      chatId
      filterName
      createdAt
      updatedAt
      filter {
        filterName
        city
        currency
        minPrice
        maxPrice
        roomsNumber
      }
    }
  }
`;

export const queryAuthEvents = gql`
  query authEvents($nextToken: String, $limit: Int) {
    authEvents(nextToken: $nextToken, limit: $limit) {
      authEvents {
        id
        type
        creationDate
        response
        riskDecision
        deviceName
        ipAddress
        city
        country
      }
      nextToken
    }
  }
`;

export const queryAdminGetUsers = gql`
  query adminGetUsers($PaginationToken: String, $Limit: Int) {
    adminGetUsers(PaginationToken: $PaginationToken, Limit: $Limit) {
      Users {
        Username
        UserCreateDate
        UserLastModifiedDate
        Enabled
        UserStatus
        Attributes {
          sub
          email_verified
          email
          chatId
          identities
          picture
        }
      }
      PaginationToken
    }
  }
`;
