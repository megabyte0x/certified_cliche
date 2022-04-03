import Navbar from './components/navbar/Navbar'
import navbarcss from './components/navbar/navbar.module.css'
import Image from 'next/image'
import '../styles/globals.css'
import Link from 'next/link'
import Head from 'next/head'



function MyApp({ Component, pageProps }) {
  return (
    <div>
       <Navbar/>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
