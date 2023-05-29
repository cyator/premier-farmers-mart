import { builder } from '../builder'

builder.prismaObject('Category', {
    fields: (t) => ({
        id: t.exposeString('id'),
        createdAt: t.expose('createdAt', {
            type: 'Date'
        }),
        updatedAt: t.expose('updatedAt', {
            type: 'Date'
        }),
        name: t.exposeString('name'),
    })
})
