import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();


interface Product {
    name: string;
    price: number;
    price_type: string;
    categoryId: string;
    stock: number;
    image: string;
}

interface Location {
    name: string;
    shipping: number;
    county: string;
    town: string;
}

let categories = [{ name: 'groceries' }, { name: 'beauty' }, { name: 'electronics' }, { name: 'clothes' }, { name: 'household' }, { name: 'furniture' }, { name: 'toys' }, { name: 'baby' }, { name: 'sport' }]
let products: Product[] = [];
let locations: Location[] = [];

for (let i = 0; i < 10; i++) {
    locations.push({
        name: faker.location.secondaryAddress(),
        shipping: +faker.commerce.price({ min: 100, max: 200, dec: 0 }),
        county: faker.location.county(),
        town: faker.location.city(),
    });
}

async function main() {
    //clear db
    const tablenames = await prisma.$queryRaw<
        Array<{ tablename: string }>
    >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

    const tables = tablenames
        .map(({ tablename }) => tablename)
        .filter((name) => name !== '_prisma_migrations')
        .map((name) => `"public"."${name}"`)
        .join(', ');

    try {
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
    } catch (error) {
        console.log({ error });
    }

    await prisma.user.create({
        data: {
            email: `christiantheeone@gmail.com`,
            role: 'ADMIN',
        },
    });
    await prisma.location.createMany({
        data: locations,
    });
    await prisma.category.createMany({
        data: categories,
    });

    const cdata = await prisma.category.findMany()

    for (let i = 0; i < 50; i++) {
        products.push({
            name: faker.commerce.productName(),
            price: +faker.commerce.price({ min: 100, max: 1000, dec: 0 }),
            price_type: faker.commerce.productMaterial(),
            categoryId: cdata[Math.floor(Math.random() * cdata.length)].id,
            stock: 50,
            image: 'groceries/asparagus.png',
        });
    }

    await prisma.product.createMany({
        data: products,
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
