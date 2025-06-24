'use client'
import React, { useEffect, useState } from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Footer from "@/components/Footer";

import ChildrenInterface from '@/interface/children.interface';
import Logo from './shared/Logo';
import Link from 'next/link';
import { UserAddOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';

const Layout: React.FC<ChildrenInterface> = ({children}) => {
    const [isBrowser, setIsBrowser] = useState(false)
      
    useEffect(() => {
      setIsBrowser(true)
    }, [])
    const pathName = usePathname()

    const blacklists = [
        '/admin',
        '/user'
    ]
    
    const menus = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Products',
    href: '/products'
  },
  {
    label: 'Sign In',
    href: '/login'
  },
  {
    label: 'Sign Up',
    href: '/sign-up'
  }]

 const isBlacklist = blacklists.some((path)=> pathName.startsWith(path))
 if(isBlacklist)
    return(
    <AntdRegistry>
        <div>{children}</div>
    </AntdRegistry>
    )
    
  return (
    <>
      <AntdRegistry>
        <nav className="bg-green-100 shadow-lg px-4 sm:px-12 py-3 sticky top-0 left-0 z-10 flex justify-between items-center flex-wrap">
          <Logo />
          <div className='flex flex-wrap gap-2'>
            {
              menus.map((item,index)=>(
                <Link key={index} href={item.href} className='p-2 sm:p-3 rounded-2xl text-green-700 font-semibold hover:bg-green-700 hover:text-white text-sm sm:text-base'>
                  {item.label}
                </Link>
              ))
            }
          </div>
          </nav>
        <div>{children}</div>
        <Footer/>
      </AntdRegistry>
    </>
  )
}

export default Layout
