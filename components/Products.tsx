'use client'
import dataInterface from '@/interface/data.interface'
import calcPrice from '@/lib/calcPrice'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Button, Card, Pagination, Skeleton, Tag } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { FC, useEffect, useState } from 'react'


interface ServerSideProductsProps extends dataInterface {
  currentPage: number
  currentLimit: number
}

const Products: FC<ServerSideProductsProps> = ({ data, currentPage, currentLimit}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const onPaginate = (newPage: number, newLimit?: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    
    if (newLimit && newLimit !== currentLimit) {
      params.set('limit', newLimit.toString())
    }
    
    // Navigate to new URL - this will trigger server-side re-render
    router.push(`/products?${params.toString()}`)
  }


  if (!isBrowser || !data?.data) {
    return (
      <div className='!bg-green-300'>
        <div className='w-11/12 sm:w-10/12 mx-auto p-6 sm:p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10'>
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
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 pt-10'>
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
                <Link href={'/login'}>
                  <Button icon={<ShoppingCartOutlined />} type="primary" danger className='!w-full !mt-5 !mb-2'>
                    Add to cart
                  </Button>
                  </Link>
                  <Link href={'/login'}>
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

export default Products

//Client side Rendering code

// 'use client'
// import dataInterface from '@/interface/data.interface'
// import calcPrice from '@/lib/calcPrice'
// import { ShoppingCartOutlined } from '@ant-design/icons'
// import { Button, Card, Pagination, Skeleton, Tag } from 'antd'
// import Image from 'next/image'
// import Link from 'next/link'
// import React, { FC, useEffect, useState } from 'react'

// const Products: FC<dataInterface> = ({ data: initialData }) => {
//   const [isBrowser, setIsBrowser] = useState(false)
//   const [page, setPage] = useState(1)
//   const [limit, setLimit] = useState(8)
//   const [data, setData] = useState(initialData)
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     setIsBrowser(true)
//   }, [])

//   const fetchProducts = async (newPage: number, newLimit: number = limit) => {
//     setLoading(true)
//     try {
//       const response = await fetch(`/api/product?page=${newPage}&limit=${newLimit}`)
//       if (response.ok) {
//         const newData = await response.json()
//         setData(newData)
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const onPaginate = (newPage: number, newLimit?: number) => {
//     setPage(newPage)
//     if (newLimit && newLimit !== limit) {
//       setLimit(newLimit)
//     }
//     fetchProducts(newPage, newLimit || limit)
//   }

//   if (!isBrowser || !data?.data) {
//     return (
//       <div className='!bg-green-300'>
//         <div className=' w-9/12 mx-auto p-10 grid grid-cols-4 gap-10'>
//           {Array.from({ length: 8 }).map((_, idx) => (
//             <Skeleton.Input key={idx} className='bg-white ' active style={{ height: 320 }} block />
//           ))}
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className='bg-green-300'>
//       <div className='w-9/12 mx-auto'>
//         <div className='lg:grid grid-cols-4 gap-10 pt-10'>
//           {loading ? (
//             // Show skeleton loading during pagination
//             Array.from({ length: limit }).map((_, idx) => (
//               <Skeleton.Input key={idx} className='bg-white' active style={{ height: 320 }} block />
//             ))
//           ) : (
//             data.data.map((item: any, index: number) => (
//               <Card
//                 key={`${item._id || item.id}-${page}`} // Better key for pagination
//                 className='!cursor-default overflow-hidden '
//                 hoverable
//                 cover={
//                   <div className='relative w-full h-[320px]'>
//                     <Image
//                       src={item.image}
//                       alt={item.title}
//                       fill
//                       style={{ objectFit: 'contain' }}
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                       className='rounded-t-lg'
//                     />
//                   </div>
//                 }
//               >
//                 <Card.Meta
//                   title={
//                     <Link href={`/products/${item.title.toLowerCase().split(" ").join("-")}`} className='!text-inherit hover:!underline'>
//                       {item.title}
//                     </Link>
//                   }
//                   description={
//                     <div className='flex gap-2'>
//                       <label>₹{calcPrice(item.price, item.discount)}</label>
//                       <del>₹{item.price}</del>
//                       <label>{item.discount}% Off</label>
//                     </div>
//                   }
//                 />
//                 {item.quantity === 0 ? (
//                   <Button type="primary" disabled className='!w-full !bg-gray-400 !text-white mt-8 !bg-grey-200'>Out Of Stock</Button>
//                 ) : (
//                   <>
//                     <Button icon={<ShoppingCartOutlined />} type="primary" danger className='!w-full !mt-5 !mb-2'>Add to cart</Button>
//                     <Link href={`/products/${item.title.toLowerCase().split(" ").join("-")}`}>
//                       <Button type="primary" className='!w-full !bg-green-600 hover:!bg-green-700'>Buy now</Button>
//                     </Link>
//                   </>
//                 )}
//               </Card>
//             ))
//           )}
//         </div>
//         <div className='flex justify-center w-full mt-10 pb-8'>
//           <Pagination
//             total={data.total}
//             onChange={onPaginate}
//             current={page}
//             pageSize={limit}
//             showSizeChanger
//             pageSizeOptions={['8', '16', '24', '32']}
//             showQuickJumper
//             showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
//             disabled={loading}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Products

//Without pagination code

// 'use client'
// import dataInterface from '@/interface/data.interface'
// import calcPrice from '@/lib/calcPrice'
// import { ShoppingCartOutlined } from '@ant-design/icons'
// import { Button, Card, Pagination, Skeleton, Tag } from 'antd'
// import Image from 'next/image'
// import Link from 'next/link'
// import React, { FC, useEffect, useState } from 'react'

// const Products:FC<dataInterface> = ({data }) => {
//   const [isBrowser, setIsBrowser] = useState(false)

//   useEffect(()=>{
//     setIsBrowser(true)
//   }, [])

  
//   if(!isBrowser || !data.data)
//     return (
//     <div className='!bg-green-300'>
//       <div className=' w-9/12 mx-auto p-10 grid grid-cols-4 gap-10'>
//           {Array.from({ length: 8 }).map((_, idx) => (
//             <Skeleton.Input key={idx} className='bg-white ' active style={{ height: 320 }} block />
//           ))}
//       </div>
//     </div>)
  
//   return (
//     <div className='bg-green-300'>
//     <div className='w-9/12 mx-auto'>
//      <div className='lg:grid grid-cols-4 gap-10 pt-10'>
//         {
//           data.data.map((item: any, index: number)=>(
            
//             <Card 
//               key={index}
//               className='!cursor-default overflow-hidden '
//               hoverable
//               cover={
//                 <div className='relative w-full h-[320px]'>
//                   <Image src={item.image}  alt={item.title} 
//                     fill style={{ objectFit: 'contain' }}
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
//                     className='rounded-t-lg'
//                   />
//                 </div>
//               }
//             > 
//               <Card.Meta 
//                 title={
//                   <Link href={`/products/${item.title.toLowerCase().split(" ").join("-")}`} className='!text-inherit hover:!underline'>
//                     {item.title}
//                   </Link>
//                 }
//                 description={
//                   <div className='flex gap-2'>
//                     <label>₹{calcPrice(item.price, item.discount)}</label>
//                     <del>₹{item.price}</del>
//                     <label>{item.discount}% Off</label>
//                   </div>
//                 }
//               />
//               {item.quantity === 0 ? (
//                 <Button type="primary" disabled className='!w-full !bg-gray-400 !text-white mt-8 !bg-grey-200'>Out Of Stock</Button>
//               ) :
//               <>
//               <Button icon={<ShoppingCartOutlined />} type="primary" danger className='!w-full !mt-5 !mb-2'>Add to cart</Button>
//               <Link href={`/products/${item.title.toLowerCase().split(" ").join("-")}`}>
//                 <Button type="primary" className='!w-full !bg-green-600 hover:!bg-green-700  '>Buy now</Button>
//               </Link>
//               </>
//               }
//             </Card>
            
//           ))
//         }
//       </div>
//     </div> 
//     </div> 
//   )
// }

// export default Products
