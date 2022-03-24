import '../styles/globals.css'
import Link from 'next/link'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Certified-Cliché</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <nav className="border-b p-6 place-content-center">
        <p className="text-4xl font-bold mt-4  ">
          Certified-Cliché
        </p>
        <div className="flex mt-4">
          <Link href="/">
            <a className="mr-4 text-pink-500">
              Home
            </a>
          </Link>
          <Link href="/create-certificate">
            <a className="mr-6 text-pink-500">
              Create Certificate
            </a>
          </Link>
          <Link href="/transferred-certificate">
            <a className="mr-6 text-pink-500">
              Transferred Certificate
            </a>
          </Link>
          <Link href="/my-certificates">
            <a className="mr-6 text-pink-500">
              My Certificates
            </a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp