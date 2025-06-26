'use client';

import { Card, Divider, Empty, Result, Skeleton, Tag } from 'antd';
import React from 'react';
import moment from 'moment';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import Image from 'next/image';
import calcPrice from '@/lib/calcPrice';

const Orders = () => {
  const { data, isLoading, error } = useSWR('/api/order', fetcher);

  if (isLoading) return <Skeleton active className="p-6 h-100" />;
  if (error)
    return (
      <Result status="500" title="500" subTitle="Sorry, something went wrong." />
    );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return '#2db7f5';
      case 'dispatched':
        return '#87d068';
      case 'returned':
        return '#f50';
      default:
        return 'default';
    }
  };

  if (!data || data.length === 0)
    return <Empty description="No order found!" className="mt-12" />;

  return (
    <div className="flex flex-col gap-10 p-4 sm:p-8">
      {data.map((item: any, index: number) => (
        <Card
          key={index}
          title={
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <span className="font-bold text-lg text-green-800">Order ID: {item.orderId}</span>
              <span className="text-sm text-gray-500">
                {moment(item.createdAt).format('MMM DD, YYYY hh:mm A')}
              </span>
            </div>
          }
          className="shadow-md"
        >
          <div className="flex flex-col gap-6">
            {item.products.map((product: any, pIndex: number) => {
              const price = item.prices[pIndex];
              const discount = item.discounts[pIndex];
              const quantity = item.quantities[pIndex];
              const finalPrice = calcPrice(price, discount);

              return (
                <div
                  key={pIndex}
                  className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center border border-green-300 rounded-lg p-4"
                >
                  <Image
                    src={product.image}
                    width={100}
                    height={100}
                    alt={product.title}
                    className="object-contain rounded-md w-[100px] h-[100px]"
                  />

                  <div className="sm:col-span-3 flex flex-col gap-2">
                    <h2 className="text-lg font-semibold capitalize">{product.title}</h2>
                    <div className="flex flex-wrap gap-4 text-base text-gray-700">
                      <span>
                        <span className="font-medium">Price: </span>
                        <span className="text-green-600 font-semibold">₹{finalPrice}</span>{' '}
                        <del className="text-gray-400 ml-1">₹{price}</del>
                      </span>
                      <span>
                        <span className="font-medium">Discount:</span> {discount}%
                      </span>
                      <span>
                        <span className="font-medium">Quantity:</span> {quantity} pcs
                      </span>
                    </div>
                    <Tag color={getStatusColor(item.status)} className="w-fit">
                      {item.status.toUpperCase()}
                    </Tag>
                  </div>
                </div>
              );
            })}
          </div>

          <Divider />
          <div className="flex justify-end">
            <h1 className="text-xl sm:text-2xl font-bold text-right">
              Total: ₹{item.grossTotal.toLocaleString()}
            </h1>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Orders;


// 'use client'

// import calcPrice from '@/lib/calcPrice'
// import fetcher from '@/lib/fetcher'
// import getInitials from '@/lib/getInitials'
// import { Avatar, Result, Select, Skeleton, Table, Tag } from 'antd'
// import moment from 'moment'
// import React, { useEffect, useState } from 'react'
// import useSWR from 'swr'

// const Orders = () => {
//    const [isBrowser, setIsBrowser] = useState(false)
      
//   useEffect(() => {
//     setIsBrowser(true)
//   }, [])
  
//   const {data, isLoading, error} = useSWR('/api/order', fetcher)
//   console.log(data?.orders)
//   const columns = [
//     {
//       title : "OrderID",
//       key: "oid",
//       render:(item:any)=>(
//         <label>{item.orderId}</label>
//       )
//     },
//     {
//       title: "Product",
//       key: "product",
//       render: (item: any)=>{
//       const products = item?.products;
//       return (
//         <div className="space-y-1">
//           {products.map((prod: any, index: number) => (
//             <div key={index}>
//               <label>{prod.title}</label>
//             </div>
//           ))}
//         </div>
//     );
//   }
//     },
//     {
//       title: "Price",
//       key: "price",
//       render: (item: any)=>{
//         const prices = item?.prices;
//         const discounts = item?.discounts;
//         return(
//           <div className="space-y-1">
//           {
//           prices.map((price: any, index: number) => {
//             const dis = discounts[index]
//             return(
//               <div key={index} className='flex gap-2'>
//               <del>₹{price}</del>
//               <label className='font-semibold'>₹{calcPrice(price, dis)}</label>
//               <Tag className='!bg-grey-700'>{dis}%</Tag>
//               </div>
//             )
            
//           })
//         }
//         </div>
//         )
//       }
//     },
//     {
//       title: "Quantity",
//       key: "qnt",
//       render: (item: any)=>{
//         const qnts = item?.quantities;
//         return(
//           <div className="space-y-1">
//           {qnts.map((qnt: any, index: number) => (
//             <div key={index}>
//               <label>{qnt}</label>
//             </div>
//           ))}
//         </div>
//         )
//       }
//     },
//     {
//       title: 'Address',
//       key: 'address',
//       render: ()=>(
//         <label className='text-gray-500'>1234 Elm Street, Apt 56B, Springfield, IL 62704, USA</label>
//       )
//     },
//     {
//       title: "Status",
//       key: "status",
//       render: (item:any)=>(
//         <label className='capitalize'>{item.status}</label>
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

//   if (!isBrowser || isLoading) return <Skeleton active className="p-6 h-100" />

//   if (error) {
//     return (
//       <Result
//         status="500"
//         title="500"
//         subTitle="Sorry, something went wrong."
//       />
//     )
//   }
//   return (
//     <div className='space-y-8 pt-16'>
//       {/* <Skeleton active /> */}
//       <Table 
//         columns={columns}
//         dataSource={data.orders}
//         rowKey={data.orders._id}
//       />
//     </div>
//   )
// }

// export default Orders
