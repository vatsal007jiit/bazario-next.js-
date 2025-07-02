'use client'
import fetcher from '@/lib/fetcher'
import React, { useEffect, useState } from 'react'
import { Button, Card, Empty, message, Result, Skeleton, Typography } from 'antd'
import useSWR, { mutate } from 'swr'
import Image from 'next/image'
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import clientCatchError from '@/lib/client-catch-error'
import axios from 'axios'
import calcPrice from '@/lib/calcPrice'
import '@ant-design/v5-patch-for-react-19';
import { useSession } from 'next-auth/react'
import Pay from '../shared/Pay'
import { useRouter } from 'next/navigation'



const Cart = () => {
  const [isBrowser, setIsBrowser] = useState(false)
  const [loading, setLoading] = useState({ state: false, index: 0, buttonIndex: 0 })
  const router = useRouter();

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const { data, isLoading, error } = useSWR('/api/cart', fetcher)
  const session = useSession()
  
  const updateQnt = async (num: number, id: string, index: number, buttonIndex: number) => {
    try {
      setLoading({ state: true, index, buttonIndex })
      await axios.put(`/api/cart/${id}`, { qnt: num })
      message.success('Item updated successfully')
      mutate('/api/cart')
      mutate('/api/cart?count=true') //For Bag in header update
    } catch (error) {
      clientCatchError(error)
    } finally {
      setLoading({ state: false, index: 0, buttonIndex: 0 })
    }
  }

  const removeCart = async (id: string, index: number, buttonIndex: number) => {
    try {
      setLoading({ state: true, index, buttonIndex })
      await axios.delete(`/api/cart/${id}`)
      message.success('Item removed from cart')
      mutate('/api/cart')
      mutate('/api/cart?count=true') //For Bag in header update
    } catch (err) {
      clientCatchError(err)
    } finally {
      setLoading({ state: false, index: 0, buttonIndex: 0 })
    }
  }

  const getTotalAmount = () => {
    let sum = 0
    for (let item of data) {
      const amount = calcPrice(item.product.price, item.product.discount) * item.qnt
      sum += amount
    }
    return sum
  }
  
  if (!isBrowser || isLoading) return <Skeleton active className="p-6 h-100" />

  if (error) {
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
      />
    )
  }

  if (data?.length === 0) {
    return (
      <div className="p-8">
        <Empty
          description={
            <div>
              <Typography.Text className="!text-2xl font-bold !text-gray-600">
                Your Cart is Empty.
              </Typography.Text>
              <Typography.Text className="!text-sm !text-gray-500 block mt-1">
                Please go to home page to add items.
              </Typography.Text>
            </div>
          }
        />
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-green-800 text-center pt-8 mb-6 border-b-2 border-green-400 inline-block w-fit mx-auto pb-2">
        Your Cart
      </h2>

      <div className="w-full max-w-7xl px-4 pb-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section - Cart Items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {
            data.map((item: any, index: number) => (
              <Card key={index} hoverable className="!p-4 rounded-xl bg-white shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex gap-4 items-start">
                    <Image
                      src={item.product.image}
                      width={70}
                      height={70}
                      alt={item.product.title}
                      className="object-contain w-[70px] h-[70px]"
                    />
                    <div>
                      <h1 className="text-lg font-semibold capitalize">{item.product.title}</h1>
                      <div className="flex items-center gap-2 text-sm flex-wrap">
                        <span className="text-green-700 font-bold">
                          ₹{calcPrice(item.product.price, item.product.discount)}
                        </span>
                        <del className="text-gray-500">₹{item.product.price}</del>
                        <span className="text-gray-600">({item.product.discount}% Off)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-start md:justify-end gap-2">
                    <Button
                      icon={<MinusOutlined />}
                      size="middle"
                      loading={loading.state && loading.index === index && loading.buttonIndex === 0}
                      onClick={() => updateQnt(item.qnt - 1, item._id, index, 0)}
                    />
                    <Button size="middle" disabled>{item.qnt}</Button>
                    <Button
                      icon={<PlusOutlined />}
                      size="middle"
                      loading={loading.state && loading.index === index && loading.buttonIndex === 1}
                      onClick={() => updateQnt(item.qnt + 1, item._id, index, 1)}
                    />
                    <Button
                      icon={<DeleteOutlined />}
                      danger
                      size="middle"
                      loading={loading.state && loading.index === index && loading.buttonIndex === 2}
                      onClick={() => removeCart(item._id, index, 2)}
                    />
                  </div>
                </div>
              </Card>
            ))
          }
        </div>

        {/* Right Section - Summary */}
        <div className="sticky top-20 h-fit">
          <div className="bg-white border border-green-300 rounded-xl shadow p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-green-800 border-b pb-2">Order Summary</h2>

            <div className="flex justify-between text-gray-700">
              <span>Items Total</span>
              <span>₹{getTotalAmount().toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-gray-700">
              <span>Delivery Fee</span>
              <span className="text-green-600 font-medium">₹{getTotalAmount()<500?50:0}</span>
            </div>

            <hr />

            <div className="flex justify-between text-xl font-bold text-green-900">
              <span>Total Payable</span>
              <span>₹{getTotalAmount()<500?(getTotalAmount()+50).toLocaleString():(getTotalAmount()).toLocaleString()}</span>
            </div>
            
            <Pay 
              product={data} 
              onSuccess={()=>router.push("/user/orders")}
              />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart



// 'use client'
// import fetcher from '@/lib/fetcher'
// import React, { useEffect, useState } from 'react'
// import { Button, Card, Empty, message, Result, Skeleton, Space, Typography } from 'antd'
// import useSWR, { mutate } from 'swr'
// import Image from 'next/image'
// import { DeleteOutlined, MinusOutlined, PlusOutlined, ShopOutlined } from '@ant-design/icons'
// import '@ant-design/v5-patch-for-react-19';
// import clientCatchError from '@/lib/client-catch-error'
// import axios from 'axios'
// import { useRouter } from 'next/navigation'
// import Link from 'next/link'
// import calcPrice from '@/lib/calcPrice'

// const Cart = () => {

//   const [isBrowser, setIsBrowser] = useState(false)
//   const [loading, setLoading] = useState({state: false, index:0, buttonIndex: 0})
//   const router = useRouter()

//   useEffect(() => {
//     setIsBrowser(true)
//   }, [])

//   const {data, isLoading, error} = useSWR('/api/cart', fetcher)
//   console.log(data)
//   const updateQnt = async (num: number, id: string, index: number, buttonIndex: number)=>{
//     try {
//       setLoading({state: true, index, buttonIndex})
//       await axios.put(`/api/cart/${id}`, {qnt: num})
//       message.success("Item updated successfully")
//       mutate('/api/cart')
//     } 
//     catch (error) {
//       clientCatchError(error)  
//     }
//     finally{
//       setLoading({state: false, index:0, buttonIndex: 0})
//     }
//   }

//   const removeCart = async (id: string, index: number, buttonIndex: number)=>{
//     try {
//       setLoading({state: true, index, buttonIndex})
//       await axios.delete(`/api/cart/${id}`)
//       message.success("Item removed from cart")
//       mutate("/api/cart")
//     }
//     catch(err)
//     {
//       clientCatchError(err)
//     }
//     finally {
//       setLoading({state: false, index: 0, buttonIndex: 0})
//     }
//   }

//   const getTotalAmount = ()=>{
//     let sum = 0
//     for(let item of data)
//     {
//       const amount = calcPrice(item.product.price, item.product.discount) * item.qnt
//       sum += amount
//     }
//     return sum
//   }

//   if(!isBrowser || isLoading)
//     return(<Skeleton active className='p-50 col-span-4'/>)

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
//   if(data?.length === 0)
//     return (
//   <div className='p-50'>
//    <Empty description={
//       <div>
//         <Typography.Text className="!text-2xl font-bold !text-gray-600">
//           Your Cart is Empty.
//         </Typography.Text>
//         <Typography.Text className="!text-sm !text-gray-500 block mt-1">
//           Please go to home page to add items.
//         </Typography.Text>
//       </div>
//     }/>
//   </div>
//   )      
//   return (
//     <div className='w-full flex flex-col justify-center items-center'>
//       <h2 className="text-3xl font-bold text-green-800 text-center pt-8 mb-6 border-b-2 border-green-400 inline-block w-fit mx-auto pb-2">Your Cart</h2>
//       <div className='flex flex-col gap-8 pt-8 w-8/12'>
//         {
//           data.map((item: any, index: number)=>(
//             <Card key={index} hoverable >
//               <div className='flex justify-between items-center'>
//                   <div className='flex gap-4'>
//                     <Image 
//                       src={item.product.image}
//                       width={60}
//                       height={0}
//                       style={{ height: 'auto' }}
//                       alt={item.product.title}
//                     />
//                     <div>
//                       <h1 className='text-lg font-medium capitalize'>{item.product.title}</h1>
//                       <div className='flex items-center gap-3'>
//                         <label className='font-medium text-base'>₹{calcPrice(item.product.price, item.product.discount)}</label>
//                         <del className='text-gray-500'>₹{item.product.price}</del>
//                         <label>({item.product.discount}% Off)</label>
//                       </div>
//                     </div>
//                   </div>

//                     <div className='flex'>
//                       <Space.Compact block>
//                         <Button 
//                           loading={loading.state && loading.index == index && loading.buttonIndex == 0} 
//                           icon={<MinusOutlined/>} 
//                           size='large' 
//                           onClick={() => updateQnt(item.qnt-1, item._id, index, 0)}
//                         />
//                         <Button size='large'>{item.qnt}</Button>
//                         <Button 
//                           loading={loading.state && loading.index == index && loading.buttonIndex == 1}  
//                           icon={<PlusOutlined />} 
//                           size='large' 
//                           onClick={() => updateQnt(item.qnt+1, item._id, index, 1)}
//                         />
//                         <Button 
//                           type='primary'
//                           danger
//                           loading={loading.state && loading.index === index && loading.buttonIndex === 2} 
//                           icon={<DeleteOutlined />} 
//                           size='large' 
//                           onClick={()=>removeCart(item._id, index, 2)} 
//                         />
//                       </Space.Compact>
//                     </div>
//               </div>
//           </Card>
//         ))
//       }
// {/* Divider between items and total */}
//       <div className="border-t border-green-800 my-4"></div>

// {/* Total Amount Section */}
//       <div className="flex justify-center pb-8">
//         <div className="bg-white border border-green-300 rounded-xl shadow p-6 w-full max-w-xl flex flex-col gap-4">
//           <h1 className="text-2xl text-center font-bold text-green-800">
//             Total payable amount: ₹{getTotalAmount().toLocaleString()}
//           </h1>

//           <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg w-full transition">
//             Pay Now
//           </button>
//         </div>
//       </div>

//     </div>
//     </div>
//   )
// }

// export default Cart
