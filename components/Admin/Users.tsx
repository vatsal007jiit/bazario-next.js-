'use client'
import fetcher from '@/lib/fetcher'
import { Button, Card, message, Result, Select, Skeleton } from 'antd'
import moment from 'moment'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'
import '@ant-design/v5-patch-for-react-19';
import clientCatchError from '@/lib/client-catch-error'
import axios from 'axios'

const Users = () => {
  const {data, error, isLoading} = useSWR('/api/user',fetcher)
  const [isBrowser, setIsBrowser] = useState(false)
  const [loading, setLoading] = useState(false)  

    useEffect(() => {
      setIsBrowser(true)
    }, [])

    const changeRole = async(role: string, id: string)=>{
      try {
        setLoading(true)
        const {data} = await axios.put(`/api/user/role/${id}`, {role}) 
        
        message.success(data.message)
        mutate("/api/user")
      } 
      catch (error) {
        clientCatchError(error)
      }
      finally{
        setLoading(false)
      }
    }


  
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

                <Select className='!w-fit !text-center' defaultValue={user.role} disabled
                size='large' onChange={(role: string)=>changeRole(role, user._id)}>
                  <Select.Option value="user">User</Select.Option>
                  <Select.Option value="admin">Admin</Select.Option>
                </Select>

                <div className='flex flex-col items-center'>
                    <label className='text-gray-500 font-medium'>Contact- {user?.address?.contact || "N.A."}</label>
                    <label className='text-gray-500 font-medium'>Joined- {moment(user.createdAt).format('DD MMM YYYY')}</label>
                </div>
            </div>
        </Card>
        
        
     ))}
    </div>
  )
}

export default Users
