import { GraphQLClient } from 'graphql-request'
import { getSdk } from './graphql/generated'


const gqlClient = new GraphQLClient("/api/graphql");

export const { getAllProducts } = getSdk(gqlClient)
