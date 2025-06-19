'use client'
import React from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Footer from "@/components/Footer";

import ChildrenInterface from '@/interface/children.interface';
import Link from 'next/link';
import { LogoutOutlined, ProfileOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';
import Logo from '../shared/Logo';
import { Avatar, Dropdown } from 'antd';
import { useSession } from 'next-auth/react';

const UserLayout: React.FC<ChildrenInterface> = ({children}) => {

    const pathName = usePathname()
    const session = useSession()
    const user = session?.data?.user

    function getInitials(name?: string) {
      if (!name) return '';
      const parts = name.trim().split(/\s+/); // Split by any whitespace
      const initials = parts.slice(0, 2).map(word => word[0].toUpperCase()).join('');
      return initials;
    }
    const menus = [
  {
    label: 'Home',
    href: '/user'
  },
  {
    label: 'Orders',
    href: '/user/orders'
  },
  {
    label: 'Cart',
    href: '/user/cart'
  }]

  const dropMenu = {
    items: [
      {
      icon: <ProfileOutlined />,
      label: <Link href="/user/profile">Profile</Link>,
      key: "profile"
      },
      {
      icon: <LogoutOutlined />,
      label: <Link href="/">Logout</Link>,
      key: "logout"
      },
    ]
  }


  return (
    <>
      <AntdRegistry>
          <nav className="bg-green-100 shadow-lg px-12 py-3 sticky top-0 left-0 z-10 flex justify-between items-center">
            <Logo/>
            <div className='flex items-center gap-4 '>
                <div>
                {
                    menus.map((item,index)=>(
                        <Link key={index} href={item.href} className='p-3 rounded-2xl text-green-700 font-semibold hover:bg-green-700 hover:text-white'>
                            {item.label}
                        </Link>
                    ))
                }
                </div>
                <div>
                  <Dropdown menu={dropMenu}>
                    {/* <Avatar size='large' className='!bg-green-300' src="/images/avatar.webp"/> */}
                    <Avatar size='large' className='!bg-green-700 font-semibold'>{getInitials(user?.name!) || <UserOutlined />}</Avatar>
                  </Dropdown>
                </div>
                
            </div>
        
          </nav>
          <div className='bg-green-300'>{children}</div>
          <Footer/>
        </AntdRegistry>
    </>
  )
}

export default UserLayout
