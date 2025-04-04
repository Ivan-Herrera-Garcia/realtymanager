import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

class CustomDocument extends Document {
  
  render() {
    return (
      <Html lang="es-MX">
        <Head>
          <Script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></Script>
        </Head>
        <body className='fondo'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument