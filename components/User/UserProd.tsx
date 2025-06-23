'use client'
import dataInterface from '@/interface/data.interface'
import calcPrice from '@/lib/calcPrice'
import clientCatchError from '@/lib/client-catch-error'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Button, Card, Pagination, Skeleton, Tag } from 'antd'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { FC, useEffect, useState } from 'react'
import '@ant-design/v5-patch-for-react-19';
import { useSession } from 'next-auth/react'

interface ServerSideProductsProps extends dataInterface {
  currentPage: number
  currentLimit: number
}

const UserProd: FC<ServerSideProductsProps> = ({ data, currentPage, currentLimit}) => {
  
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const session = useSession();
  const onPaginate = (newPage: number, newLimit?: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    
    if (newLimit && newLimit !== currentLimit) {
      params.set('limit', newLimit.toString())
    }
    
    // Navigate to new URL - this will trigger server-side re-render
    router.push(`/user/?${params.toString()}`)
  }

  const addToCart = async (id : string) =>{
    try {
      const userId = session?.data?.user.id
      const payload = {
        user: userId,
        product: id
      }
      const {data} = await axios.post('/api/cart', payload )
      console.log(data)  
    } 
    catch (error) {
      clientCatchError(error)
    }
  }

  if (!isBrowser || !data?.data) {
    return (
      <div className='!bg-green-300'>
        <div className=' w-9/12 mx-auto p-10 grid grid-cols-4 gap-10'>
          {Array.from({ length: currentLimit }).map((_, idx) => (
            <Skeleton.Input key={idx} className='bg-white ' active style={{ height: 320 }} block />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className='bg-green-300'>
      <div className='w-9/12 mx-auto'>
        <div className='lg:grid grid-cols-4 gap-10 pt-10'>
          {data.data.map((item: any, index: number) => (
            <Card
              key={`${item._id || item.id}-${currentPage}-${index}`}
              className='!cursor-default overflow-hidden '
              hoverable
              cover={
                <div className='relative w-full h-[320px]'>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'contain' }}
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
                <Button type="primary" disabled className='!w-full !bg-gray-400 !text-white mt-8 !bg-grey-200'>
                  Out Of Stock
                </Button>
              ) : (
                <>
                  <Button onClick={()=>addToCart(item._id)} icon={<ShoppingCartOutlined />} type="primary" danger className='!w-full !mt-5 !mb-2'>
                    Add to cart
                  </Button>
                  <Link href={`/products/${item.title.toLowerCase().split(" ").join("-")}`}>
                    <Button type="primary" className='!w-full !bg-green-600 hover:!bg-green-700'>
                      Buy now
                    </Button>
                  </Link>
                </>
              )}
            </Card>
          ))}
        </div>
        <div className='flex justify-center w-full mt-10 pb-8'>
          <Pagination
            total={data.total}
            onChange={onPaginate}
            current={currentPage}
            pageSize={currentLimit}
            showSizeChanger
            pageSizeOptions={['8', '16', '24']}
          />
        </div>
      </div>
    </div>
  )
}

export default UserProd