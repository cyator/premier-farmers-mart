import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { getAllProducts } from '../api'
import useSWRInfinite from 'swr/infinite'
import { GetAllProductsQuery, GetAllProductsQueryVariables } from '../graphql/generated'

const inter = Inter({ subsets: ['latin'] })

const getKey = (pageIndex: number, previousPageData: GetAllProductsQuery): { key: string, args: GetAllProductsQueryVariables } | null => {

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
      first: 5, after: previousPageData.products.pageInfo.endCursor
    }
  }
}

export default function Home() {

  const { user, error, isLoading } = useUser();
  const { data, size, setSize } = useSWRInfinite(getKey, (n) => getAllProducts(n.args))


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const hasNextPage = data && data[data.length - 1].products.pageInfo.hasNextPage
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      {
        user ? (
          <>
            <Link
              href="/api/auth/logout"
              className="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Logout
            </Link>
            <div>
              <Image width={30} height={30} src={user.picture!} alt={user.name!} />
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          </>
        ) : (
          <Link
            href="/api/auth/login"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Login
          </Link>
        )}
      {data && data.map((items, index) => {
        // `data` is an array of each page's API response.
        return items.products.edges.map(item => <div key={item?.node.id}>{item?.node.name}</div>)
      })}
      {hasNextPage ?

        <button className='px-8 py-4 mt-4 bg-red-600' onClick={() => setSize(size + 1)}>Load More</button>
        : <div>no more products</div>
      }
    </main>
  )
}
