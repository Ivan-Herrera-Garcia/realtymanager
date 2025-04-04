import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

class CustomDocument extends Document {
  
  render() {
    return (
      <Html lang="es-MX">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="title" content="Spam Phone" />
          <meta name="description" content="En Spam Phone podrás revisar números telefónicos registrados por usuarios para saber que son SPAM, estafas, etc." />
          <meta name="keywords" content="Spam, Phone, Estafa, Llamada, Telefónica, Teléfono, Spam Phone" />
          <meta name="author" content="it.for.all" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="icon" href="logo.jpg" type="image/jpeg"/>
          <link rel="icon" href="logo.jpg" type="image/jpeg"/>
          <link rel="shortcut icon" href="logo.jpg" type="image/jpeg" />
          <link rel="apple-touch-icon" href="logo.jpg" type="image/jpeg" />
          <link rel="canonical" href="https://spam-phone.netlify.app/" />

          {/* <!-- Open Graph / Facebook --> */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://spam-phone.netlify.app/" />
          <meta property="og:title" content="Spam Phone" />
          <meta property="og:description" content="En Spam Phone podrás revisar números telefónicos registrados por usuarios para saber que son SPAM, estafas, etc."/>
          <meta property="og:image" content="logo.jpg"/>

          {/* <!-- Twitter --> */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://spam-phone.netlify.app/"/>
          <meta property="twitter:title" content="Spam Phone"/>
          <meta property="twitter:description" content="En Spam Phone podrás revisar números telefónicos registrados por usuarios para saber que son SPAM, estafas, etc."/>
          <meta property="twitter:image" content="logo.jpg"/>
          <Script src="https://cdnjs.cloudflare.com/ajax/libs/izitoast/1.4.0/js/iziToast.min.js" integrity="sha512-Zq9o+E00xhhR/7vJ49mxFNJ0KQw1E1TMWkPTxrWcnpfEFDEXgUiwJHIKit93EW/XxE31HSI5GEOW06G6BF1AtA==" crossOrigin="anonymous" referrerPolicy="no-referrer"></Script>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/izitoast/1.4.0/css/iziToast.css" integrity="sha512-DIW4FkYTOxjCqRt7oS9BFO+nVOwDL4bzukDyDtMO7crjUZhwpyrWBFroq+IqRe6VnJkTpRAS6nhDvf0w+wHmxg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
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