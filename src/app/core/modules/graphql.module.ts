/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

// Apollo
import {
  InMemoryCache,
  ApolloLink,
  ApolloClientOptions,
  GraphQLRequest,
  DefaultOptions,
} from '@apollo/client/core';
import { APOLLO_NAMED_OPTIONS, NamedOptions } from 'apollo-angular';
import { setContext } from '@apollo/client/link/context';
import { HttpLink } from 'apollo-angular/http';

import { Auth } from 'aws-amplify';

import { environment } from 'src/environments/environment';

function formPublicAppSync(httpLink: HttpLink): ApolloClientOptions<any> {
  const { uri, token, header } = environment.GraphQL.Public;
  const basic = setContext((operation: GraphQLRequest, prevContext: any) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));

  const auth = setContext((operation: GraphQLRequest, prevContext: any) => ({
    headers: {
      [header]: token,
    },
  }));

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return {
    link,
    cache,
  };
}
function formPrivateAppSync(httpLink: HttpLink): ApolloClientOptions<any> {
  const { uri } = environment.GraphQL.Private;

  const basic = setContext((operation: GraphQLRequest, prevContext: any) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));

  const auth = setContext(async (operation: GraphQLRequest, prevContext: any) => {
    const token = (await Auth.currentSession()).getAccessToken().getJwtToken();
    return {
      headers: {
        Authorization: token,
      },
    };
  });

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  };

  return {
    link,
    cache,
    defaultOptions,
  };
}

function createApollo(httpLink: HttpLink): NamedOptions {
  return {
    PublicAppSync: formPublicAppSync(httpLink),
    PrivateAppSync: formPrivateAppSync(httpLink),
  };
}

@NgModule({
  exports: [HttpClientModule],
  providers: [
    {
      provide: APOLLO_NAMED_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
