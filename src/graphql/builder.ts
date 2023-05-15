import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import { DateResolver, PositiveIntResolver } from 'graphql-scalars'
import { prisma } from '../db'

export const builder = new SchemaBuilder<{
    Scalars: {
        Date: {
            Input: Date;
            Output: Date;
        },
        Price: {
            Input: number;
            Output: number;
        };
    },
    PrismaTypes: PrismaTypes
}>({
    plugins: [PrismaPlugin],
    prisma: {
        client: prisma
    }
});

builder.queryType({})

builder.addScalarType('Date', DateResolver, {});
builder.addScalarType('Price', PositiveIntResolver, {});
