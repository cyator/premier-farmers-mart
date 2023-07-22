import '@aws-amplify/ui-react/styles.css';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import toast, { Toaster } from 'react-hot-toast';
import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

import { Authenticator } from '@aws-amplify/ui-react'

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
      <Authenticator.Provider>
        <Component {...pageProps} />
      </Authenticator.Provider>
      <Toaster />
    </SWRConfig>
  );
}
