import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {

  const queryClient = new QueryClient();
  
  return(
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Rick and Morty API</title>
      </Head>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
