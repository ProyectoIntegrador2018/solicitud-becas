import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { RestLink } from 'apollo-link-rest';
import { onError, ErrorResponse } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import jsonToFormData from 'json-form-data';
import useAuth from '../../utils/hooks/useAuth';
import { getAPI } from '../../config';

const cache = new InMemoryCache();

interface Props {
  children: React.ReactNode;
}

const customFetch = (uri, options) => {
  const newOptions = options;
  if (options.body instanceof FormData) {
    delete newOptions.headers['Content-Type'];
  } else {
    newOptions.headers['Content-Type'] = 'application/json';
  }
  return fetch(uri, newOptions);
};

const restLink = new RestLink({
  uri: getAPI(),
  credentials: 'same-origin',
  customFetch,
  bodySerializers: {
    fileEncode: (data: any, headers: Headers) => {
      const formData = jsonToFormData(data);
      headers.set('Accept', '*/*');
      return { body: formData, headers };
    },
  },
});

const Apollo: React.FC<Props> = ({ children }: Props) => {
  const { authenticated, logout } = useAuth();

  const errorLink = onError((error: ErrorResponse) => {
    if (error.networkError) {
      if ('statusCode' in error.networkError) {
        switch (error.networkError.statusCode) {
          case 400:
            console.log(`[Network error]: ${error.networkError}`);
            break;
          case 401:
            if (authenticated) {
              cache.reset();
              logout();
            }
            break;
          default:
            console.log(`[Network error]: ${error.networkError}`);
            break;
        }
      }
    }
  });

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link: ApolloLink.from([errorLink, restLink]),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Apollo;
