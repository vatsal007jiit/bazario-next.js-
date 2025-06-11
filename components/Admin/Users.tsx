'use client'
import { Card, Skeleton } from 'antd'
import moment from 'moment'
import Image from 'next/image'
import React from 'react'

const Users = () => {
  return (
    <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-8'>
        <Skeleton active className='col-span-4'/>
     {[...Array(12)].map((_,index) => (
        <Card key={index} hoverable>
            <div className='flex flex-col items-center gap-6'>
                <Image src='/images/avatar.webp'
                alt={`Avatar-${index}`}
                width={100}
                height={0}
                className='rounded-full border-2 border-blue-900'
                objectFit='cover'/>

                <Card.Meta
                title="Rahul Rajawat"
                description="rahul@mail.com"/>

                <div className='flex flex-col items-center'>
                    <label className='text-gray-500 font-medium'>Total Orders- 4</label>
                    <label className='text-gray-500 font-medium'>Joined- {moment().format('DD MMM YYYY')}</label>
                </div>
            </div>
        </Card>
        
        
     ))}
    </div>
  )
}

export default Users
