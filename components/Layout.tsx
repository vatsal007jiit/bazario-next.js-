'use client'
import React from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Footer from "@/components/Footer";

import ChildrenInterface from '@/interface/children.interface';
import Logo from './shared/Logo';
import Link from 'next/link';
import { UserAddOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';

const Layout: React.FC<ChildrenInterface> = ({children}) => {

    const pathName = usePathname()
    const blacklists = [
        '/admin'
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
    label: 'Carts',
    href: '/carts'
  },
  {
    label: 'Sign In',
    href: '/login'
  },
  {
    label: 'Sign Up',
    href: '/signup'
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
          <nav className="bg-gray-200 shadow-lg px-12 py-3 sticky top-0 left-0 z-10 flex justify-between items-center">
            <Logo/>
            <div className='flex '>
                {
                    menus.map((item,index)=>(
                        <Link key={index} href={item.href} className='p-3 rounded-2xl text-green-700 font-semibold hover:bg-green-700 hover:text-white'>
                            {item.label}
                        </Link>
                    ))
                }
                {/* <Link href="/signup" className='p-3 border-2 rounded-2xl text-green-700 font-semibold hover:bg-green-700 hover:text-white'>
              <UserAddOutlined className='mr-2' />
              Sign up
            </Link> */}
            </div>
        
          </nav>
          <div className='w-9/12 mx-auto py-12'>{children}</div>
          <Footer/>
        </AntdRegistry>
    </>
  )
}

export default Layout
