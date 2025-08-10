'use client'
import React from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Footer from "@/components/Footer";
import type { MenuProps } from 'antd';
import ChildrenInterface from '@/interface/children.interface';
import Link from 'next/link';
import { LogoutOutlined, ProfileOutlined,  ShoppingOutlined,  UserOutlined } from '@ant-design/icons';
// import { usePathname } from 'next/navigation';
import Logo from '../shared/Logo';
import { Avatar, Badge, Dropdown, Tooltip } from 'antd';
import { signOut, useSession } from 'next-auth/react';
import getInitials from '@/lib/getInitials';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const UserLayout: React.FC<ChildrenInterface> = ({children}) => {
   
  const {data, error} = useSWR('/api/cart?count=true', fetcher, {
    refreshInterval: 30000, // Refresh every 30 seconds
    errorRetryCount: 3,
    errorRetryInterval: 5000,
    onError: (err) => {
      console.error('Cart count fetch error:', err);
    }
  })
  
  // Fallback count if there's an error
  const cartCount = error ? 0 : (data?.count || 0);
  
  // const pathName = usePathname()
  const session = useSession()
  console.log(session)
  const user = session?.data?.user
  const logout = async () => {
    await signOut(); 
  };

  const menus = [
  {
    label: 'Home',
    href: '/user'
  },
  {
    label: 'Orders',
    href: '/user/orders'
  }]

  const dropMenu: MenuProps = {
    items: [
      {
      key: "email",
      label: user?.email,
      disabled: true, // Makes it non-clickable
      },
      {
        type: 'divider'
      },
      {
      icon: <ProfileOutlined />,
      label: <Link href="/user/profile">Profile</Link>,
      key: "profile"
      },
      {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout", // plain text
      onClick: logout, // call your logout function
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
                  <Link href="/user/cart" className="inline-block">
                    <Tooltip title="My Cart">
                      <Badge count={cartCount} color='brown'>
                        <ShoppingOutlined className="text-3xl !text-green-700 cursor-pointer" />
                      </Badge>
                    </Tooltip>
                  </Link>
                </div>
                <div>
                  <Dropdown menu={dropMenu}>
                     {/* eslint-disable-next-line  @typescript-eslint/no-non-null-asserted-optional-chain */}
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
