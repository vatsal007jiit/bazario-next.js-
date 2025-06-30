'use client'

import { Avatar, Empty, Result, Skeleton, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import getInitials from '@/lib/getInitials'
import '@ant-design/v5-patch-for-react-19';

const Payments = () => {
  const { data, isLoading, error } = useSWR('/api/payment', fetcher)
 
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const columns = [
    {
      title: 'Customer',
      key: 'customer',
      render: (item: any) => (
        <div className="flex gap-3 items-center">
          <Avatar size="large" className="bg-orange-500!">
            {getInitials(item?.user?.fullName)}
          </Avatar>
          <div className="truncate max-w-[180px]">
            <h1 className="font-medium capitalize truncate">{item?.user?.fullName}</h1>
            <label className="text-gray-500 text-sm truncate block">{item?.user?.email}</label>
          </div>
        </div>
      ),
    },
    {
      title: 'Payment ID',
      key: 'paymentId',
      dataIndex: 'paymentId',
      render: (id: string) => <span className="break-all">{id}</span>,
    },
    {
      title: 'Status',
      key: 'status',
      render: (item: any)=>(
        <>
          {
            item.status === "captured" ? 
            <Tag className='uppercase' color="green">{item.status}</Tag>
            :
            <Tag className='uppercase' color="magenta">{item.status}</Tag>
          }
        </>
      )
    },
    {
      title: 'Order ID',
      key: 'oid',
      render: (item: any) => <span className="truncate block max-w-[120px]">{item?.orderId}</span>,
    },
    {
      title: 'Amount',
      key: 'amount',
      render: (item: any) => <span>₹{item?.amount}</span>,
    },
    {
      title: 'Vendor',
      key: 'vendor',
      render: (item: any) => (
        <Tag className="capitalize !bg-blue-900 !text-white font-semibold">{item?.vendor}</Tag>
      ),
    },
    {
      title: 'Fee',
      key: 'fee',
      render: (item: any) => (
        <Tag className="capitalize !bg-blue-900 !text-white font-semibold">{item?.fee}</Tag>
      ),
    },
    {
      title: 'Tax',
      key: 'tax',
      render: (item: any) => (
        <Tag className="capitalize !bg-blue-900 !text-white font-semibold">{item?.tax}</Tag>
      ),
    },
    {
      title: 'Method',
      key: 'method',
      render: (item: any) => (
        <Tag className="uppercase !bg-green-700 !text-white font-semibold">{item?.method}</Tag>
      ),
    },
    {
      title: 'Date',
      key: 'date',
      render: (item: any) => (
        <span>{moment(item.createdAt).format('MMM DD, YYYY hh:mm A')}</span>
      ),
    },
  ]

  if (!data || data.length === 0)
    return <Empty description="No Payments found!" className="mt-12" />;

  if (isLoading) return <Skeleton active className="col-span-4" />

  if (error) {
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
      />
    )
  }

  return (
    <div className="w-full">
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-sm overflow-x-auto">
        <Table
          columns={columns}
          dataSource={data || []}
          rowKey="_id"
          scroll={{ x: 'max-content' }}
          pagination={{ pageSize: 8 }}
        />
      </div>
    </div>
  )
}

export default Payments

// 'use client'

// import { Avatar, Result, Select, Skeleton, Table, Tag } from 'antd'
// import React, { useEffect, useState } from 'react'
// import moment from 'moment'
// import useSWR from 'swr'
// import fetcher from '@/lib/fetcher'
// import getInitials from '@/lib/getInitials'

// const Payments = () => {

//   const {data, isLoading, error} = useSWR('/api/payment', fetcher)
//   const [isBrowser, setIsBrowser] = useState(false)
    
//       useEffect(() => {
//         setIsBrowser(true)
//       }, [])

//   const columns = [
//     {
//       title: "Customer",
//       key: 'customer',
//       render: (item: any)=>(
//         <div className='flex gap-3'>
//           <Avatar size="large" className='bg-orange-500!'>{getInitials(item.user.fullName)}</Avatar>
//           <div>
//             <h1 className='font-medium capitalize'>{item?.user?.fullName}</h1>
//             <label className='text-gray-500'>{item?.user?.email}</label>
//           </div>
//         </div>
//       )
//     },
//     {
//       title: "Payment ID",
//       key: "paymentId",
//       render: (item: any)=>(
//         <label>{item?.paymentId}</label>
//       )
//     },
//     {
//       title: "Product",
//       key: "product",
//       render: (item: any)=>(
//         <label>{item?.order?.product?.title}</label>
//       )
//     },
    
//     {
//       title: "Amount",
//       key: "amount",
//       render: (item: any)=>(
//         <label>₹{item?.order?.price}</label>
//       )
//     },
//     {
//       title: "Vendor",
//       key: "vendor",
//       render: (item: any)=>(
//         <Tag className='capitalize !bg-blue-900 !text-white font-semibold'>{item.vendor}</Tag>
//       )
//     },
//     {
//       title: "Date",
//       key: "date",
//       render: (item: any)=>(
//         <label>{moment(item.createdAt).format('MMM DD, YYYY hh:mm A')}</label>
//       )
//     }
//   ]


//   if(isLoading)
//     return(<Skeleton active className='col-span-4'/>)

//   if(error)
//    { 
//     return (
//       <Result
//         status="500"
//         title="500"
//         subTitle="Sorry, something went wrong."
//         // extra={<Button type="primary">Back Home</Button>}
//       />
//     )
//   }

//   return (
//     <div className='space-y-8'>
//       <Table 
//         columns={columns}
//         dataSource={data.payments}
//         rowKey="_id"
//       />
//     </div>
//   )
// }

// export default Payments