import Head from 'next/head'
import '@/styles/globals.css'
import '@/styles/media.css'
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from 'src/theme';
import {responsiveFontSizes} from '@mui/material'

export default function App({ Component, pageProps }) {
  const theme = responsiveFontSizes(createTheme())
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
      </ThemeProvider>
    </>
  )
}
