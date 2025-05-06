import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { withFronteggApp } from '@frontegg/nextjs/pages';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default withFronteggApp(MyApp, {
  authOptions: {
    keepSessionAlive: true, // Uncomment this in order to maintain the session alive
  },
});
