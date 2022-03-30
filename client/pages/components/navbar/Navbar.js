import Link from 'next/link'
import Image from 'next/image'
import pic from './images/wall.png'
import navbarcss from './navbar.module.css' 

const Navbar = () => {
    return(
        <div className={navbarcss.navigations}>
        <nav className="border-b p-6 place-content-center">
        <p className="text-4xl font-bold mt-4 ">
          Certified-Cliché
        </p>
        <div className={navbarcss.right} id="account">
        <p className={navbarcss.account}>0xA018Bds3adfj1</p>
        </div>
        <div className={navbarcss.right}>
           <Image src="/wall.png" width="30px" height="27px"/>
        </div>
        <div className="flex mt-4">
          <Link href="/">
            <a className="mr-4 text-white-500">
             <span className={navbarcss.links}>Home</span>
            </a>
          </Link>
          <Link href="/create-certificate">
            <a className="mr-6 text-white-500">
              <span className={navbarcss.active}>Create Certificate</span>
            </a>
          </Link>
          <Link href="/transferred-certificate">
            <a className="mr-6 text-white-500">
              <span className={navbarcss.links}>Transferred Certificate</span>
            </a>
          </Link>
          <Link href="/my-certificates">
            <a className="mr-6 text-white-500">
             <span className={navbarcss.links}>My Certificates</span>
            </a>
          </Link>
        </div>
      </nav>
      </div>
    );
}
export default Navbar;
