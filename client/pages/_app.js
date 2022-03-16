import '../components/navbar/navbar.css'
import Image from 'next/image'
import '../styles/globals.css'
import Link from 'next/link'
import Head from 'next/head'



function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className="border-b p-6 pb-0 place-content-center">
        <p className="text-4xl font-bold mt-4  ">
          Certified-Cliché
        </p>
        <div class="right" id="account">
        <p class="Account">0xA018Bds3adfj1</p>
        </div>
        <div class="right">
        <Image src = "/wall.png" width="25px" height="25px"/>
        </div>
        <div className="flex mt-4 links">
          <Link href="/">
            <a className="mr-4 text-white-500">
              Home
            </a>
          </Link>
          <Link href="/create-certificate">
            <a className="mr-6 text-white-500 active">
              Create Certificate
            </a>
          </Link>
          <Link href="/transferred-certificate">
            <a className="mr-6 text-white-500">
              Transferred Certificate
            </a>
          </Link>
          <Link href="/my-certificates">
            <a className="mr-6 text-white-500">
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
