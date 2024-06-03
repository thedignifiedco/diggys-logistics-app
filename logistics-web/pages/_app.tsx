import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { AppProps } from 'next/app';
import Head from 'next/head';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <title>Diggys Logistics App</title>
                <link
                    href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/css/bootstrap.min.css"
                    rel="stylesheet"
                    crossOrigin="anonymous"
                    integrity="sha512-GQGU0fMMi238uA+a/bdWJfpUGKUkBdgfFdgBm72SUQ6BeyWjoY/ton0tEjH+OSH9iP4Dfh+7HM0I9f5eR0L/4w=="
                    referrerPolicy="no-referrer"
                />
                <script
                    src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.10.2/umd/popper.min.js"
                    integrity="sha512-nnzkI2u2Dy6HMnzMIkh7CPd1KX445z38XIu4jG1jGw7x5tSL3VBjE44dY4ihMU1ijAQV930SPM12cCFrB18sVw=="
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                    async
                ></script>
                <script
                    src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/js/bootstrap.min.js"
                    integrity="sha512-OvBgP9A2JBgiRad/mM36mkzXSXaJE9BEIENnVEmeZdITvwT09xnxLtT4twkCa8m/loMbPHsvPl0T8lRGVBwjlQ=="
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                    async
                ></script>
            </Head>
            <Component {...pageProps} />
        </>
    );
};

export default MyApp;
