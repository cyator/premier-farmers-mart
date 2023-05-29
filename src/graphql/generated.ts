import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  Price: { input: any; output: any; }
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['Date']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Product = {
  __typename?: 'Product';
  category: Category;
  createdAt: Scalars['Date']['output'];
  id: Scalars['String']['output'];
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Price']['output'];
  priceType: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type Query = {
  __typename?: 'Query';
  product: Product;
  products: QueryProductsConnection;
};


export type QueryProductArgs = {
  id: Scalars['String']['input'];
};


export type QueryProductsArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryProductsConnection = {
  __typename?: 'QueryProductsConnection';
  edges: Array<Maybe<QueryProductsConnectionEdge>>;
  pageInfo: PageInfo;
};

export type QueryProductsConnectionEdge = {
  __typename?: 'QueryProductsConnectionEdge';
  cursor: Scalars['String']['output'];
  node: Product;
};

export type GetAllProductsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  after?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetAllProductsQuery = { __typename?: 'Query', products: { __typename?: 'QueryProductsConnection', edges: Array<{ __typename?: 'QueryProductsConnectionEdge', cursor: string, node: { __typename?: 'Product', id: string, createdAt: any, updatedAt: any, name: string, price: any, priceType: string, image: string, category: { __typename?: 'Category', name: string } } } | null>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null } } };


export const GetAllProductsDocument = gql`
    query getAllProducts($first: Int, $last: Int, $before: ID, $after: ID) {
  products(first: $first, last: $last, before: $before, after: $after) {
    edges {
      cursor
      node {
        id
        createdAt
        updatedAt
        category {
          name
        }
        name
        price
        priceType
        image
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getAllProducts(variables?: GetAllProductsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAllProductsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllProductsQuery>(GetAllProductsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllProducts', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;