'use client'

import calcPrice from '@/lib/calcPrice'
import clientCatchError from '@/lib/client-catch-error'
import fetcher from '@/lib/fetcher'
import getInitials from '@/lib/getInitials'
import { Avatar, Empty, message, Result, Select, Skeleton, Table, Tag } from 'antd'
import axios from 'axios'
import moment from 'moment'
import React, { useState } from 'react'
import useSWR, { mutate } from 'swr'
import '@ant-design/v5-patch-for-react-19';

const Orders = () => {
  const [loading, setLoading] = useState(false)
  const { data, isLoading, error } = useSWR('/api/order', fetcher)

  const changeStatus = async (status: string, id: string) => {
    try {
      setLoading(true)
      const { data } = await axios.put(`/api/order/${id}`, { status })
      message.success(data.message)
      mutate('/api/order')
    } catch (error) {
      clientCatchError(error)
    }
    finally{
      setLoading(false)
    }
  }
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return '#2db7f5';
      case 'dispatched':
        return '#87d068';
      case 'returned':
        return '#f50';
      case 'fulfilled':
        return '#016630';
      default:
        return 'default';
    }
  };
  
  const columns = [
    {
      title : "OrderID",
      key: "oid",
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      render:(item:any)=>(
        <label>{item.orderId}</label>
      )
    },
    {
      title: 'Customer',
      key: 'customer',
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (item: any) => (
        <div className="flex gap-3 items-center">
          <Avatar size="large" className="bg-orange-500!">
            {getInitials(item.user.fullName)}
          </Avatar>
          <div className="truncate max-w-[180px]">
            <h1 className="font-medium capitalize truncate">{item.user.fullName}</h1>
            <label className="text-gray-500 text-sm truncate block">{item.user.email}</label>
          </div>
        </div>
      ),
    },
     {
      title: "Product",
      key: "product",
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (item: any)=>{
      const products = item?.products;
      return (
        <div className="space-y-1">
           {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {products.map((prod: any, index: number) => (
            <div key={index}>
              <label>{prod.title}</label>
            </div>
          ))}
        </div>
    );
  }
    },
    {
      title: "Price",
      key: "price",
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (item: any)=>{
        const prices = item?.prices;
        const discounts = item?.discounts;
        return(
          <div className="space-y-1">
          {
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
          prices.map((price: any, index: number) => {
            const dis = discounts[index]
            return(
              <div key={index} className='flex gap-2'>
              <del>₹{price}</del>
              <label className='font-semibold'>₹{calcPrice(price, dis)}</label>
              <Tag className='!bg-grey-700'>{dis}%</Tag>
              </div>
            )
            
          })
        }
        </div>
        )
      }
    },
    {
      title: "Quantity",
      key: "qnt",
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (item: any)=>{
        const qnts = item?.quantities;
        return(
          <div className="space-y-1">
             {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {qnts.map((qnt: any, index: number) => (
            <div key={index}>
              <label>{qnt}</label>
            </div>
          ))}
        </div>
        )
      }
    },
    {
      title: "Total",
      key:'total',
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      render:(item: any)=>(
        <label>₹{item.grossTotal}</label>
      )
    },
    {
      title: 'Address',
      key: 'address',
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (item: any)=>{
        const {street, city, state, pincode, contact} = item?.user?.address
        return(
          <>
          <label className=' capitalize text-gray-500'>{`${street}, ${city}`}</label>
          <br/>
          <label className='capitalize text-gray-500'>{`${state}-${pincode}`}</label>
          <br/>
          <label className='capitalize text-gray-500'>{`Mob-${contact}`}</label>
          </>
        
      )}
    },
    {
      title: 'Status',
      key: 'status',
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (item: any) => (
        <div className='flex flex-col items-center gap-2'>
          <Tag color={getStatusColor(item.status)} className="w-fit">{item.status.toUpperCase()} </Tag>
          <Select
            placeholder="Status"
            style={{ width: 120 }}
            defaultValue={item.status}
            onChange={(value) => changeStatus(value, item._id)}
            disabled={loading}
          >
            <Select.Option value="fulfilled">Fulfilled</Select.Option>
            <Select.Option value="processing">Processing</Select.Option>
            <Select.Option value="dispatched">Dispatched</Select.Option>
            <Select.Option value="returned">Returned</Select.Option>
          </Select>
        </div>
        
      ),
    },
    {
      title: "Date",
      key: "date",
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (item: any)=>(
        <label>{moment(item.createdAt).format('MMM DD, YYYY HH:MM')}</label>
      )
    }
  ]
    
  if (!data || data.length === 0)
    return <Empty description="No order found!" className="mt-12" />;

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

export default Orders


// 'use client'

// import calcPrice from '@/lib/calcPrice'
// import clientCatchError from '@/lib/client-catch-error'
// import fetcher from '@/lib/fetcher'
// import getInitials from '@/lib/getInitials'
// import '@ant-design/v5-patch-for-react-19';
// import { Avatar, message, Result, Select, Skeleton, Table } from 'antd'
// import axios from 'axios'
// import moment from 'moment'
// import React, { useEffect, useState } from 'react'
// import useSWR, { mutate } from 'swr'
// import '@ant-design/v5-patch-for-react-19';

// const Orders = () => {

//   const {data, isLoading, error} = useSWR('/api/order', fetcher)
//   const [isBrowser, setIsBrowser] = useState(false)
  
//   useEffect(() => {
//     setIsBrowser(true)
//   }, [])

//     const changeStatus = async (status: string, id: string)=>{
//       try {
//         const {data} = await axios.put(`/api/order/${id}`, {status})
//         message.success(data.message)
//         mutate('/api/order')
//       } 
//       catch (error) {
//         clientCatchError(error)
//       }
//     }
//     const columns = [
//     {
//       title : "Customer",
//       key: "customer",
//       render:(item: any)=>(
//         <div className='flex gap-3'>
//           <Avatar size="large" className='bg-orange-500!'>{getInitials(item.user.fullName)}</Avatar>
//           <div>
//             <h1 className='font-medium capitalize'>{item.user.fullName}</h1>
//             <label className='text-gray-500'>{item.user.email}</label>
//           </div>
//         </div>
//       )
//     },
//     {
//       title: "Product",
//       key: "product",
//       render: (item: any)=>(
//         <label>{item.product.title}</label>
//       )
//     },
//     {
//       title: "Price",
//       key: "price",
//       render: (item: any)=>(
//         <label>₹{calcPrice(item.price, item.discount) }</label>
//       )
//     },
//     {
//       title: 'Address',
//       key: 'address',
//       render: (item: any)=>(
//         <label className='text-gray-500'>{item.user?.address || "Not available"}</label>
//       )
//     },
//     {
//       title: "Status",
//       key: "status",
//       render: (item: any)=>(
//         <Select placeholder="Status" style={{width: 120}} defaultValue={item.status} onChange={(value)=>changeStatus(value, item._id)}>
//           <Select.Option value="fulfiled">Fulfiled</Select.Option>
//           <Select.Option value="processing">Processing</Select.Option>
//           <Select.Option value="dispatched">Dispatched</Select.Option>
//           <Select.Option value="returned">Returned</Select.Option>
//         </Select>
//       )
//     },
//     {
//       title: "Date",
//       key: "date",
//       render: (item: any)=>(
//         <label>{moment(item.createdAt).format('MMM DD, YYYY HH:MM')}</label>
//       )
//     }
//   ]

//    if(isLoading)
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
//         columns= {columns}
//         dataSource= {data.orders}
//         rowKey= "_id"
//       />
//     </div>
//   )
// }

// export default Orders
