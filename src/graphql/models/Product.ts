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
        category: t.exposeString('category')
    })
})


builder.queryField('products', (t) => t.prismaField({
    type: ['Product'],
    resolve: async (query, root, args, ctx) => {
        return prisma.product.findMany({ ...query })
    }
}))