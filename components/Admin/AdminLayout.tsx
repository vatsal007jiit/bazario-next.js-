'use client'

import { FC } from 'react'
import ChildrenInterface from '@/interface/children.interface'
import { Avatar, Breadcrumb, Dropdown, Layout, Menu } from 'antd'
import { CreditCardOutlined, LogoutOutlined, ProfileOutlined, SettingOutlined, ShopOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const { Header, Sider, Content, Footer } = Layout

const AdminLayout:FC<ChildrenInterface> = ({children}) =>{

 const menus= [
    {
      icon: <ShopOutlined />,
      label: <Link href="/admin/products">Products</Link>,
      key: "products"
    },
    {
      icon: <ShoppingOutlined />,
      label: <Link href="/admin/orders">Orders</Link>,
      key: "orders"
    },
    {
      icon: <CreditCardOutlined />,
      label: <Link href="/admin/payments">Payments</Link>,
      key: "payments"
    },
    {
      icon: <UserOutlined />,
      label: <Link href="/admin/users">Users</Link>,
      key: "users"
    }
  ]

  const dropMenu = {
    items: [
      {
      icon: <ProfileOutlined />,
      label: "Vatsal Gupta",
      key: "fullname"
      },
      {
      icon: <LogoutOutlined />,
      label: <Link href="/">Logout</Link>,
      key: "logout"
      },
      {
      icon: <SettingOutlined />,
      label: <Link href="/profile">Settings</Link>,
      key: "settings"
      }
    ]
  }

  const pathName = usePathname()

  const getBreadCrumbs = (pathName: string) =>{
    const arr = pathName.split('/')
    const bread = arr.map((item) =>(
      {title: item}
    ))
    return bread  
  }

  return (
    <Layout>
      {/* Fixed Header */}
      <Header
        style={{
          position: 'fixed',
          zIndex: 1000,
          width: '100%',
          height: 64,
          background: '#e5e7eb',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
        }}
      >
        <div className='flex items-center justify-between w-full'>
         <svg className='cursor-pointer' width="180" height="40" viewBox="0 0 180 40" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="28" fontFamily="Poppins, sans-serif" fontSize="28" fill="#2563EB" fontWeight="600">
              Bazario
            </text>
          </svg>
            <Dropdown menu={dropMenu}>
            <Avatar size='large' src="/images/avatar.webp"/>
          </Dropdown>
          
        </div>
        
      </Header>

      {/* Fixed Sider */}
      <Sider
        width={200}
        style={{
          position: 'fixed',
          top: 64,
          bottom: 0,
          left: 0,
          background: '#fff',
          overflow: 'auto',
          borderRight: '1px solid #f0f0f0',
        }}
      >
        <Menu
          mode="inline"
          theme='dark'
          defaultSelectedKeys={['products']}
          style={{ height: '100%', borderRight: 0 }}
          items = {menus}
        />
      </Sider>

      {/* Main Layout */}
      <Layout
        style={{
          marginLeft: 200,
          marginTop: 64,
          minHeight: '100vh',
        }}
      >
        {/* Scrollable Content with Footer at bottom */}
        <Content style={{ margin: '16px', padding: 24, background: '#fff' }}>
          <Breadcrumb
            items={ getBreadCrumbs(pathName)
              //[
              // {
              //   title: 'Home',
              // },
              // {
              //   title: <a href="">Application Center</a>,
              // },
              // {
              //   title: <a href="">Application List</a>,
              // },
              // {
              //   title: 'An Application',
              // },]
              }
          />
          <div style={{ minHeight: 'calc(100vh - 64px - 70px)', marginTop: '20px' }}>
            {children}
          </div>
        </Content>

        {/* Sticky Footer */}
        <Footer style={{ textAlign: 'center', background: '#e5e7eb' }}>
          © 2025 Bazario. All rights reserved.
          <br/> Vatsal Gupta
        </Footer>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
