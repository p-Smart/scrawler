import Head from 'next/head'
import '@/styles/globals.css'
import '@/styles/media.css'
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from 'src/theme';
import {responsiveFontSizes} from '@mui/material'
import Loader from 'src/components/Loader';
import Router from 'next/router'
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }) {
  const theme = responsiveFontSizes(createTheme())
  const [openLoader, setOpenLoader] = useState(false);
  useEffect(() => {
    Router.events.on('routeChangeStart', () => setOpenLoader(true));
    Router.events.on('routeChangeError', () => setOpenLoader(false));
    Router.events.on('routeChangeComplete', () => setOpenLoader(false));

    return () => {
      Router.events.off('routeChangeStart', () => setOpenLoader(true));
      Router.events.off('routeChangeError', () => setOpenLoader(false));
      Router.events.off('routeChangeComplete', () => setOpenLoader(false));
    };
  }, []);


  return (
    <>
      <Head>
        <title>SCrawler</title>
        <meta name="description" content="SCrawler" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <Loader open={openLoader} />
      </ThemeProvider>
    </>
  )
}
