import { GraphQLClient } from 'graphql-request'
import { getSdk } from './graphql/generated'

const E_COMMERCE_API_URL = process.env.NEXT_PUBLIC_E_COMMERCE_API_URL as string

const gqlClient = new GraphQLClient(E_COMMERCE_API_URL);

export const { getAllProducts } = getSdk(gqlClient)
