import Document, { Head, Html, Main, NextScript } from 'next/document';

const Favicon = () => (
  <>
    <link
      rel="icon"
      href="/favicon.ico"
    />
  </>
);

const Fonts = () => (
  <>
  </>
);

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <Favicon />
          <Fonts />
        </Head>
        <body>
        <Main />
        <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
