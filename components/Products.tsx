'use client'
import dataInterface from '@/interface/data.interface'
import calcPrice from '@/lib/calcPrice'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Button, Card, Pagination, Tag } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'

const Products:FC<dataInterface> = ({data }) => {
  const [isBrowser, setIsBrowser] = useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(8)

  useEffect(()=>{
    setIsBrowser(true)
  }, [])

  const onPaginate = (newPage: number, newLimit?: number) => {
     setPage(page)
  }
  if(!isBrowser)
    return null

  return (
    <>
     <div className='grid grid-cols-4 gap-10'>
        {
          data.data.map((item: any, index: number)=>(
            <Card 
              key={index}
              className='!cursor-default overflow-hidden'
              hoverable
              cover={
                <div className='relative w-full h-[320px]'>
                  <Image src={item.image}  alt={item.title} 
                    fill style={{ objectFit: 'contain' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                    className='rounded-t-lg'
                  />
                </div>
              }
            > 
              <Card.Meta 
                title={
                  <Link href={`/products/${item.title.toLowerCase().split(" ").join("-")}`} className='!text-inherit hover:!underline'>
                    {item.title}
                  </Link>
                }
                description={
                  <div className='flex gap-2'>
                    <label>₹{calcPrice(item.price, item.discount)}</label>
                    <del>₹{item.price}</del>
                    <label>{item.discount}% Off</label>
                  </div>
                }
              />
              {item.quantity === 0 ? (
                <Button type="primary" disabled className='!w-full !bg-gray-400 !text-white mt-8 !bg-grey-200'>Out Of Stock</Button>
              ) :
              <>
              <Button icon={<ShoppingCartOutlined />} type="primary" danger className='!w-full !mt-5 !mb-2'>Add to cart</Button>
              <Link href={`/products/${item.title.toLowerCase().split(" ").join("-")}`}>
                <Button type="primary" className='!w-full !bg-green-600 hover:!bg-green-700  '>Buy now</Button>
              </Link>
              </>
              }
            </Card>
          ))
        }
      </div>
      <div className='flex justify-center w-full mt-10'>
        <Pagination
          total={data.total}
          onChange={onPaginate}
          current={page}
          />
      </div> 
    </>  
  )
}

export default Products
