import { GraphQLClient } from 'graphql-request'
import { getSdk } from './graphql/generated'


const gqlClient = new GraphQLClient("http://localhost:3000/api/graphql");

export const { getAllProducts } = getSdk(gqlClient)
