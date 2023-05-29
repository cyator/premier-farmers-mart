import { builder } from '../builder'
import { prisma } from '../../db'

builder.prismaObject('Product', {
    fields: (t) => ({
        id: t.exposeString('id'),
        createdAt: t.expose('createdAt', {
            type: 'Date'
        }),
        updatedAt: t.expose('updatedAt', {
            type: 'Date'
        }),
        name: t.exposeString('name'),
        image: t.exposeString('image'),
        price: t.expose('price', {
            type: 'Price'
        }),
        priceType: t.exposeString('price_type'),
        category: t.relation('category'),
    })
})

//query all products
builder.queryField('products', (t) => t.prismaConnection({
    type: 'Product',
    cursor: 'id',
    resolve: async (query, _root, _args, _ctx, _info) => {
        return prisma.product.findMany({ ...query })
    }
}))

//query producy by id
builder.queryField('product', (t) => t.prismaField({
    type: 'Product',
    args: {
        id: t.arg.string({ required: true })
    },
    resolve: async (query, _root, args, _ctx, _info) => {
        return prisma.product.findUniqueOrThrow({ ...query, where: { id: args.id } })
    }
}))