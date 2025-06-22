'use client'

import { Avatar, Result, Select, Skeleton, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import getInitials from '@/lib/getInitials'

const Payments = () => {

  const {data, isLoading, error} = useSWR('/api/payment', fetcher)
  console.log(data)
  const [isBrowser, setIsBrowser] = useState(false)
    
      useEffect(() => {
        setIsBrowser(true)
      }, [])

  const columns = [
    {
      title: "Customer",
      key: 'customer',
      render: (item: any)=>(
        <div className='flex gap-3'>
          <Avatar size="large" className='bg-orange-500!'>{getInitials(item.user.fullName)}</Avatar>
          <div>
            <h1 className='font-medium capitalize'>{item?.user?.fullName}</h1>
            <label className='text-gray-500'>{item?.user?.email}</label>
          </div>
        </div>
      )
    },
    {
      title: "Payment ID",
      key: "paymentId",
      render: (item: any)=>(
        <label>{item?.paymentId}</label>
      )
    },
    {
      title: "Product",
      key: "product",
      render: (item: any)=>(
        <label>{item?.order?.product?.title}</label>
      )
    },
    
    {
      title: "Amount",
      key: "amount",
      render: (item: any)=>(
        <label>₹{item?.order?.price}</label>
      )
    },
    {
      title: "Vendor",
      key: "vendor",
      render: (item: any)=>(
        <Tag className='capitalize !bg-blue-900 !text-white font-semibold'>{item.vendor}</Tag>
      )
    },
    {
      title: "Date",
      key: "date",
      render: (item: any)=>(
        <label>{moment(item.createdAt).format('MMM DD, YYYY hh:mm A')}</label>
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
        columns={columns}
        dataSource={data.payments}
        rowKey="_id"
      />
    </div>
  )
}

export default Payments