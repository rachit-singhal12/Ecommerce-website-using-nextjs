import React, { useEffect, useState } from'react'
import Link from 'next/link'
import { BsCart4 } from 'react-icons/bs'
import Image from 'next/image'
import { getCartItems } from '@/utils/cartItems';


function Header(){
  const [cart,setCart]=useState(0);
  useEffect(()=>{
    setInterval(()=>{
      const cartItems = getCartItems();
      setCart(cartItems.length)
    },1000)
  }
,[])
    return(
        <>
            <nav className="navbar navbar-top-bg text-white d-none d-md-block">
                <div className="container-md">
                    <i className='nav-item navbar-nav'>Get upto to 70% Discount Everyday</i>
                    <div className='dropdown p-0'>
                        <span className='dropdown-toggle' type="button" data-bs-toggle="dropdown" aria-expanded="false">My Account</span>
                        <ul className="dropdown-menu">
                            <li>
                                <Link className="dropdown-item" href="#">Register</Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" href="#">Login</Link>
                            </li>
                        </ul>
                    </div>
                 </div>
            </nav>
            <nav className="navbar navbar-bg text-white">
                <div className="container-md">
                    <Link href='/'className='navbar-brand'>
                        <Image src="/images/bird_2.jpg" width={100} height={50} alt='nwg logo'/>
                    </Link>
                    <Link className='nav-item nav-link d-flex gap-1 align-items-center text-white' href='/cart'>
                        <span className='p-1 rounded-circle bg-primary'>
                        <BsCart4 size={21} className='pb-1'/>
                        </span>
                        {cart} items
                    </Link>
                 </div>
            </nav>
            <nav class="navbar navbar-expand-lg shadow-sm mb-2 rounded container px-2">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <Link href="/" className='nav-item nav-link active'>Store</Link>
        <Link href="/about" className='nav-item nav-link active'>About us</Link>
        <Link href="/support" className='nav-item nav-link active'>Support</Link>
        {/*<li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
    </li>*/}
      </ul>
    </div>
  </div>
</nav>
        </>
    )
}

export default Header