'use client'
import fetcher from '@/lib/fetcher'
import { Button, Card, Result, Skeleton } from 'antd'
import moment from 'moment'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import '@ant-design/v5-patch-for-react-19';

const Users = () => {
  const {data, error, isLoading} = useSWR('/api/user',fetcher)
  const [isBrowser, setIsBrowser] = useState(false)
    
      useEffect(() => {
        setIsBrowser(true)
      }, [])
  
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
    <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-8'>
        
     {data.users.map((user: any, index: number) => (
        <Card key={index} hoverable>
            <div className='flex flex-col items-center gap-6'>
                <Image src='/images/avatar.webp'
                alt={`Avatar-${index}`}
                width={100}
                height={0}
                className='rounded-full border-2 border-blue-900'
                objectFit='cover'/>

                <Card.Meta 
                title={<span className="capitalize">{user.fullName}</span>}
                description={user.email}/>

                <div className='flex flex-col items-center'>
                    <label className='text-gray-500 font-medium'>Total Orders- 4</label>
                    <label className='text-gray-500 font-medium'>Joined- {moment(user.createdAt).format('DD MMM YYYY')}</label>
                </div>
            </div>
        </Card>
        
        
     ))}
    </div>
  )
}

export default Users
