import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import { withFronteggApp } from '@frontegg/nextjs/pages';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="Diggys Logistics" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default withFronteggApp(MyApp, {
  authOptions: {
    keepSessionAlive: true, // Uncomment this in order to maintain the session alive
  },
});
