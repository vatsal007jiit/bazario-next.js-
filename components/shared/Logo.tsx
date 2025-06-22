import React from 'react'
import logoPic from '@/public/images/logo-gr.png'
import Image from "next/image";

const Logo = () => {
  return (
    <div>
      <Image 
              src={logoPic}
              width={120}
              height={50}
              alt="logo"
              priority
              style={{width: 'auto', height: 'auto'}}
            />
    </div>
  )
}

export default Logo
