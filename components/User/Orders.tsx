'use client'

import { Avatar, Select, Skeleton, Table } from 'antd'
import moment from 'moment'
import React from 'react'

const Orders = () => {

  const data = [
  {
    "orderId": "ORD1001",
    "userId": "USR001",
    "product": {
      "productId": "P001",
      "productName": "Wireless Mouse",
      "quantity": 2,
      "price": 29.99
    },
    "totalAmount": 59.98,
    "status": "dispatched",
    "createdAt": "2025-06-05T10:00:00Z"
  },
  {
    "orderId": "ORD1002",
    "userId": "USR002",
    "product": {
      "productId": "P003",
      "productName": "Bluetooth Headphones",
      "quantity": 1,
      "price": 59.99
    },
    "totalAmount": 59.99,
    "status": "success",
    "createdAt": "2025-06-04T12:45:00Z"
  },
  {
    "orderId": "ORD1003",
    "userId": "USR003",
    "product": {
      "productId": "P002",
      "productName": "USB-C Charger",
      "quantity": 3,
      "price": 29.99
    },
    "totalAmount": 89.97,
    "status": "success",
    "createdAt": "2025-06-03T14:30:00Z"
  },
  {
    "orderId": "ORD1004",
    "userId": "USR004",
    "product": {
      "productId": "P004",
      "productName": "Laptop Stand",
      "quantity": 1,
      "price": 49.99
    },
    "totalAmount": 49.99,
    "status": "returned",
    "createdAt": "2025-06-02T16:00:00Z"
  }]

  const columns = [
    {
      title : "Name",
      key: "name",
      render:()=>(
        <div className='flex gap-3'>
          <Avatar size="large" className='bg-green-400!'>R</Avatar>
          <div>
            <h1 className='font-medium'>Rahul Rajawat</h1>
            <label className='text-gray-500'>rahul@mail.com</label>
          </div>
        </div>
      )
    },
    {
      title: "Product",
      key: "product",
      render: (item: any)=>(
        <label>{item.product.productName}</label>
      )
    },
    {
      title: "Price",
      key: "price",
      render: (item: any)=>(
        <label>₹{item.product.price}</label>
      )
    },
    {
      title: 'Address',
      key: 'address',
      render: ()=>(
        <label className='text-gray-500'>1234 Elm Street, Apt 56B, Springfield, IL 62704, USA</label>
      )
    },
    {
      title: "Status",
      key: "status",
      render: (item:any)=>(
        <label className='capitalize'>{item.status}</label>
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

  return (
    <div className='space-y-8 pt-16'>
      {/* <Skeleton active /> */}
      <Table 
        columns={columns}
        dataSource={data}
        rowKey="orderId"
      />
    </div>
  )
}

export default Orders
