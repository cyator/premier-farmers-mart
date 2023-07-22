import { Inter } from 'next/font/google'
import Link from 'next/link'
import { getAllProducts } from '../api'
import useSWRInfinite from 'swr/infinite'
import { GetAllProductsQuery, GetAllProductsQueryVariables } from '../graphql/generated'
import { GetStaticProps } from 'next';
import { useAuthenticator, Button } from '@aws-amplify/ui-react';

import Card from '@/components/Card'

const inter = Inter({ subsets: ['latin'] })

const getKey = (pageIndex: number, previousPageData: GetAllProductsQuery | null): { key: string, args: GetAllProductsQueryVariables } | null => {

  // reached the end
  if (previousPageData && !previousPageData.products.pageInfo.hasNextPage) return null

  // first page, we don't have `previousPageData`
  if (pageIndex === 0) return {
    key: 'products', args: {
      first: 5,
    }
  }

  // add the cursor to the API endpoint
  return {
    key: 'products', args: {
      first: 5, after: previousPageData?.products.pageInfo.endCursor
    }
  }
}



function Home({ pages }: any) {
  const { data, size, setSize } = useSWRInfinite(getKey, (n) => getAllProducts(n.args), { fallbackData: pages })
  const { route, signOut } = useAuthenticator((context) => [
    context.route,
    context.signOut,
  ]);
  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;

  const hasNextPage = data && data[data.length - 1].products.pageInfo.hasNextPage

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-8 lg:p-24 ${inter.className}`}
    >
      {route !== 'authenticated' ? (
        <Link href='/login' className='py-2 px-4 bg-green-500'>
          Login
        </Link>) : (
        <Button onClick={signOut}>Logout</Button>
      )}


      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-4'>
        {data && data.map((items, index) => {
          // `data` is an array of each page's API response.
          return items.products.edges.map(item =>

            <Card key={item?.cursor} product={item?.node} />

          )
        })}
      </div>
      {hasNextPage ?

        <button className='px-8 py-4 mt-4 bg-red-600' onClick={() => setSize(size + 1)}>Load More</button>
        : <div>no more products</div>
      }
    </main>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const variables = {
    first: 5,
  }

  const products = await getAllProducts(variables)

  return {
    props: {
      pages: [products]
    }
  }
}