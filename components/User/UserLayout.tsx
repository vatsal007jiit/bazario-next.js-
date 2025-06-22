'use client'
import React from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Footer from "@/components/Footer";
import type { MenuProps } from 'antd';
import ChildrenInterface from '@/interface/children.interface';
import Link from 'next/link';
import { LogoutOutlined, ProfileOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';
import Logo from '../shared/Logo';
import { Avatar, Dropdown } from 'antd';
import { signOut, useSession } from 'next-auth/react';
import getInitials from '@/lib/getInitials';

const UserLayout: React.FC<ChildrenInterface> = ({children}) => {

    const pathName = usePathname()
    const session = useSession()
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
  },
  {
    label: 'Cart',
    href: '/user/cart'
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
