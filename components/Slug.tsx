'use client'

import calcPrice from '@/lib/calcPrice'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Button, Card, Empty, Tag } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import '@ant-design/v5-patch-for-react-19';

interface TitleInterface  {
  title: string
  data: {
    _id:string
    image: string
    title: string
    price: number
    discount: number
    description: string
    quantity: number
  }
} // This title utilized in SEO.

const Slug:FC<TitleInterface> = ({data}) => {
  
 

    if(!data)
        return <Empty/>

    return (
        <>
     <div className="max-w-6xl mx-auto px-6 ">
      <Card className="shadow-2xl rounded-2xl !bg-green-300 !my-10">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="w-full md:w-[40%]">
            <Image
              src={data.image}
              alt={data.title}
              width={180}
              height={200}
              className="rounded-xl object-contain border border-gray-200 p-4 bg-white"
            />
          </div>

          <div className="w-full md:w-[60%]">
            <h1 className="text-4xl font-bold text-green-900">{data.title}</h1>
            <p className="text-slate-600 mt-3 leading-relaxed text-lg">{data.description}</p>

            <div className="flex items-center gap-4 mt-6 mb-4 text-2xl font-semibold">
              <span className="text-green-600">₹{calcPrice(data.price, data.discount)}</span>
              <del className="text-gray-400 text-xl">₹{data.price}</del>
              <Tag color="red" className="text-base">{data.discount}% OFF</Tag>
            </div>

            {data.quantity === 0 ? (
              <Button type="primary" danger disabled className="!bg-gray-400 !text-white !py-6 !text-lg !w-full mt-4">
                Oops - This Item is Sold Out
              </Button>
            ) : (
              <div className="lg:flex sm:flex-col gap-4 mt-4">
                <Link href={'/login'}>
                  <Button
                    type="primary"
                    className="!bg-green-600 hover:!bg-green-700 !font-semibold !text-lg !py-6 !px-10"
                  >
                    Buy Now
                  </Button>
                </Link>
                <Link href={'/login'}>
                <Button
                  icon={<ShoppingCartOutlined />}
                  type="default"
                  className="!border-green-600 !text-green-700 hover:!border-green-700 hover:!text-green-800 !font-semibold !text-lg !py-6 !px-10"
                >
                  Add to Cart
                </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div></>
  )
}

export default Slug
