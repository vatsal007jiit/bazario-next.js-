'use client'

import { FC, useEffect, useState } from 'react'
import ChildrenInterface from '@/interface/children.interface'
import {Avatar,Breadcrumb, Dropdown,Layout,Menu,Drawer,Button,} from 'antd'
import {CreditCardOutlined,LogoutOutlined,MenuOutlined,ProfileOutlined,ShopOutlined,ShoppingOutlined,UserOutlined,} from '@ant-design/icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

const { Header, Sider, Content, Footer } = Layout

const AdminLayout: FC<ChildrenInterface> = ({ children }) => {
  const session = useSession()
  const user = session?.data?.user
  const [drawerVisible, setDrawerVisible] = useState(false)
  const pathName = usePathname()


  useEffect(() => {
  // Auto-close drawer when route changes
  setDrawerVisible(false)
  }, [pathName])

  const logout = async () => {
    await signOut()
  }

  const menus = [
    {
      icon: <ShopOutlined />,
      label: <Link href="/admin/products">Products</Link>,
      key: 'products',
    },
    {
      icon: <ShoppingOutlined />,
      label: <Link href="/admin/orders">Orders</Link>,
      key: 'orders',
    },
    {
      icon: <CreditCardOutlined />,
      label: <Link href="/admin/payments">Payments</Link>,
      key: 'payments',
    },
    {
      icon: <UserOutlined />,
      label: <Link href="/admin/users">Users</Link>,
      key: 'users',
    },
  ]

  const dropMenu = {
    items: [
      {
        key: 'email',
        label: user?.email,
        disabled: true,
      },
      {
        icon: <ProfileOutlined />,
        label: <Link href="/profile">Profile</Link>,
        key: 'profile',
      },
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: 'Logout',
        onClick: logout,
      },
    ],
  }

  

  const getBreadCrumbs = (pathName: string) => {
    const arr = pathName.split('/').filter(Boolean)
    return arr.map((item) => ({
      title: item.charAt(0).toUpperCase() + item.slice(1),
    }))
  }

  return (
    <Layout hasSider>
      {/* Sidebar for Desktop */}
      <Sider
        width={200}
        breakpoint="lg"
        collapsedWidth="0"
        className="hidden lg:block bg-white"
        style={{
          position: 'fixed',
          top: 64,
          bottom: 0,
          left: 0,
          zIndex: 50,
          borderRight: '1px solid #f0f0f0',
        }}
      >
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[pathName.split('/')[2]]}
          style={{ height: '100%', borderRight: 0 }}
          items={menus}
        />
      </Sider>

      {/* Drawer for Mobile */}
      <Drawer
        title="Admin Menu"
        placement="left"
        closable
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        className="!lg:hidden"
      >
        <Menu
          mode="inline"
          selectedKeys={[pathName.split('/')[2]]}
          items={menus}
        />
      </Drawer>

      {/* Main Layout with Header, Content, Footer */}
      <Layout
        className="w-full"
        style={{
          marginLeft: 0,
          marginTop: 64,
        }}
      >
        {/* Header */}
      <Header
          className="!bg-gray-200 px-4 py-2 flex justify-between items-center fixed top-0 left-0 w-full z-50"
          style={{ height: 64 }}
        >
          <div className="flex items-center gap-4">
            <svg className="cursor-pointer" width="140" height="36" viewBox="0 0 180 40" xmlns="http://www.w3.org/2000/svg">
              <text x="0"  y="28" fontFamily="Poppins, sans-serif" fontSize="28" fill="#2563EB" fontWeight="600" >
              Greenatva
              </text>
            </svg>

            {/* Hamburger hidden on desktop */}
            <Button
              icon={<MenuOutlined />}
              className="lg:!hidden ml-2"
              onClick={() => setDrawerVisible(true)}
            />
          </div>

          {/* Right section stays the same */}
          <div className="flex items-center gap-3">
            <h1 className="text-blue-700 text-base font-semibold hidden sm:block">
              Welcome Admin
            </h1>
            <Dropdown menu={dropMenu}>
              <Avatar size="large" src="/images/avatar.webp" />
            </Dropdown>
          </div>
        </Header>


        {/* Content */}
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: 'calc(100vh - 64px - 70px)',
            marginLeft: 0,
          }}
          className="!mt-[64px] lg:!ml-[200px]"
        >
          <Breadcrumb items={getBreadCrumbs(pathName)} />
          <div className="mt-4">{children}</div>
        </Content>

        {/* Footer */}
        <Footer className="text-center bg-gray-200 lg:ml-[200px]">
          © 2025 Greenatva. All rights reserved.
          <br />
          Vatsal Gupta
        </Footer>
      </Layout>
    </Layout>
  )
}

export default AdminLayout


// 'use client'

// import { FC } from 'react'
// import ChildrenInterface from '@/interface/children.interface'
// import { Avatar, Breadcrumb, Dropdown, Layout, Menu } from 'antd'
// import { CreditCardOutlined, LogoutOutlined, ProfileOutlined, SettingOutlined, ShopOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { signOut, useSession } from 'next-auth/react'

// const { Header, Sider, Content, Footer } = Layout

// const AdminLayout:FC<ChildrenInterface> = ({children}) =>{

//   const session = useSession()
//   const user = session?.data?.user

//   const logout = async () => {
//     await signOut(); 
//   };

//  const menus= [
//     {
//       icon: <ShopOutlined />,
//       label: <Link href="/admin/products">Products</Link>,
//       key: "products"
//     },
//     {
//       icon: <ShoppingOutlined />,
//       label: <Link href="/admin/orders">Orders</Link>,
//       key: "orders"
//     },
//     {
//       icon: <CreditCardOutlined />,
//       label: <Link href="/admin/payments">Payments</Link>,
//       key: "payments"
//     },
//     {
//       icon: <UserOutlined />,
//       label: <Link href="/admin/users">Users</Link>,
//       key: "users"
//     }
//   ]

//   const dropMenu = {
//     items: [
//       {
//       key: "email",
//       label: user?.email,
//       disabled: true, // Makes it non-clickable
//       },
//       {
//       icon: <ProfileOutlined />,
//       label: <Link href="/profile">Profile</Link>,
//       key: "profile"
//       },
//       {
//       key: "logout",
//       icon: <LogoutOutlined />,
//       label: "Logout", // plain text
//       onClick: logout, // call your logout function
//       }
//     ]
//   }

//   const pathName = usePathname()

//   const getBreadCrumbs = (pathName: string) =>{
//     const arr = pathName.split('/')
//     const bread = arr.map((item) =>(
//       {title: item}
//     ))
//     return bread  
//   }

//   return (
//     <Layout>
//       {/* Fixed Header */}
//       <Header
//         style={{
//           position: 'fixed',
//           zIndex: 1000,
//           width: '100%',
//           height: 64,
//           background: '#e5e7eb',
//           color: '#fff',
//           display: 'flex',
//           alignItems: 'center',
//           padding: '0 20px',
//         }}
//       >
//         <div className='flex items-center justify-between w-full'>
//          <svg className='cursor-pointer' width="180" height="40" viewBox="0 0 180 40" xmlns="http://www.w3.org/2000/svg">
//             <text x="0" y="28" fontFamily="Poppins, sans-serif" fontSize="28" fill="#2563EB" fontWeight="600">
//               Greenatva
//             </text>
//           </svg>
//             <div className='flex items-center'>
//               <h1 className='text-blue-700 text-lg font-semibold'>Welcome Admin</h1>
//               <Dropdown menu={dropMenu}>
//                 <Avatar size='large' src="/images/avatar.webp"/>
//               </Dropdown>
//             </div>
            
          
//         </div>
        
//       </Header>

//       {/* Fixed Sider */}
//       <Sider
//         width={200}
//         style={{
//           position: 'fixed',
//           top: 64,
//           bottom: 0,
//           left: 0,
//           background: '#fff',
//           overflow: 'auto',
//           borderRight: '1px solid #f0f0f0',
//         }}
//       >
//         <Menu
//           mode="inline"
//           theme='dark'
//           // defaultSelectedKeys={['products']}
//           selectedKeys={[pathName.split("/")[2]]} // gets 'products', 'orders', etc
//           style={{ height: '100%', borderRight: 0 }}
//           items = {menus}
//         />
//       </Sider>

//       {/* Main Layout */}
//       <Layout
//         style={{
//           marginLeft: 200,
//           marginTop: 64,
//           minHeight: '100vh',
//         }}
//       >
//         {/* Scrollable Content with Footer at bottom */}
//         <Content style={{ margin: '16px', padding: 24, background: '#fff' }}>
//           <Breadcrumb
//             items={ getBreadCrumbs(pathName)
//               //[
//               // {
//               //   title: 'Home',
//               // },
//               // {
//               //   title: <a href="">Application Center</a>,
//               // },
//               // {
//               //   title: <a href="">Application List</a>,
//               // },
//               // {
//               //   title: 'An Application',
//               // },]
//               }
//           />
//           <div style={{ minHeight: 'calc(100vh - 64px - 70px)', marginTop: '20px' }}>
//             {children}
//           </div>
//         </Content>

//         {/* Sticky Footer */}
//         <Footer style={{ textAlign: 'center', background: '#e5e7eb' }}>
//           © 2025 Greenatva. All rights reserved.
//           <br/> Vatsal Gupta
//         </Footer>
//       </Layout>
//     </Layout>
//   )
// }

// export default AdminLayout
