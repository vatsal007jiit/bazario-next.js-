'use client'

import calcPrice from '@/lib/calcPrice'
import clientCatchError from '@/lib/client-catch-error'
import fetcher from '@/lib/fetcher'
import getInitials from '@/lib/getInitials'
import '@ant-design/v5-patch-for-react-19';
import { Avatar, message, Result, Select, Skeleton, Table } from 'antd'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'

const Orders = () => {

  const {data, isLoading, error} = useSWR('/api/order', fetcher)
   const [isBrowser, setIsBrowser] = useState(false)
  
    useEffect(() => {
      setIsBrowser(true)
    }, [])

    const changeStatus = async (status: string, id: string)=>{
      try {
        const {data} = await axios.put(`/api/order/${id}`, {status})
        message.success(data.message)
        mutate('/api/order')
      } 
      catch (error) {
        clientCatchError(error)
      }
    }
    const columns = [
    {
      title : "Customer",
      key: "customer",
      render:(item: any)=>(
        <div className='flex gap-3'>
          <Avatar size="large" className='bg-orange-500!'>{getInitials(item.user.fullName)}</Avatar>
          <div>
            <h1 className='font-medium capitalize'>{item.user.fullName}</h1>
            <label className='text-gray-500'>{item.user.email}</label>
          </div>
        </div>
      )
    },
    {
      title: "Product",
      key: "product",
      render: (item: any)=>(
        <label>{item.product.title}</label>
      )
    },
    {
      title: "Price",
      key: "price",
      render: (item: any)=>(
        <label>₹{calcPrice(item.price, item.discount) }</label>
      )
    },
    {
      title: 'Address',
      key: 'address',
      render: (item: any)=>(
        <label className='text-gray-500'>{item.user?.address || "Not available"}</label>
      )
    },
    {
      title: "Status",
      key: "status",
      render: (item: any)=>(
        <Select placeholder="Status" style={{width: 120}} defaultValue={item.status} onChange={(value)=>changeStatus(value, item._id)}>
          <Select.Option value="fulfiled">Fulfiled</Select.Option>
          <Select.Option value="processing">Processing</Select.Option>
          <Select.Option value="dispatched">Dispatched</Select.Option>
          <Select.Option value="returned">Returned</Select.Option>
        </Select>
      )
    },
    {
      title: "Date",
      key: "date",
      render: (item: any)=>(
        <label>{moment(item.createdAt).format('MMM DD, YYYY HH:MM')}</label>
      )
    }
  ]

   if(isLoading)
    return(<Skeleton active className='col-span-4'/>)

  if(error)
   { 
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        // extra={<Button type="primary">Back Home</Button>}
      />
    )
  }

  return (
    <div className='space-y-8'>
      <Table 
        columns= {columns}
        dataSource= {data.orders}
        rowKey= "_id"
      />
    </div>
  )
}

export default Orders
