import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { SWRConfig } from 'swr'
import toast, { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{
      onError: (error, key) => {
        if (error.status !== 403 && error.status !== 404) {
          // We can send the error to Sentry,
          // or show a notification UI.
          console.error(error);

          toast.error(error.message);

        }
      }
    }}>
      <UserProvider>
        <Component {...pageProps} />
        <Toaster />
      </UserProvider>
    </SWRConfig>
  );
}
