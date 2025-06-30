import React from 'react'
import logoPic from '@/public/images/logo-gr.png'
import Image from "next/image";
import Link from 'next/link';

const Logo = () => {
  return (
    <div>
      <Link href={'/'}>
        <Image 
          src={logoPic}
          width={100}
          height={50}
          alt="logo"
          priority
          unoptimized
          style={{width: 'auto', height: 'auto'}}
        />
      </Link>
    </div>
  )
}

export default Logo
