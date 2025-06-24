'use client'
import { UserAddOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, message } from 'antd'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Logo from './shared/Logo'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import clientCatchError from '@/lib/client-catch-error'
import '@ant-design/v5-patch-for-react-19';
import bg from '@/public/images/bg.jpg'

const Signup = () => {

    const [isBrowser, setIsBrowser] = useState(false)
        
    useEffect(() => {
    setIsBrowser(true)
    }, [])
  
    const router = useRouter()

    const handleSignup = async (values: any)=>{
      try {
        const {data} = await axios.post('/api/user/signup', values)
        message.success(data.message)
        if(data)
          router.push('/login')
      } 
      catch (error) {
        clientCatchError(error)  
      }
  }
  return (
    <div  className="h-screen bg-cover bg-center mt-10"
      style={{ backgroundImage: `url(${bg.src})` }}>
      <div className='flex items-center justify-center'>
                <Card className='w-[480px] animate__animated animate__slideInRight !bg-green-400'>
                    <div className='space-y-4'>
                        <div className='flex justify-center'>
                            <Logo />
                        </div>
                        <Form layout='vertical' onFinish={handleSignup}>
                            <Form.Item 
                                label="Full Name"
                                name="fullName"
                                className='font-semibold'
                                rules={[{required: true}]}
                            >
                                <Input size='large' placeholder='Akshay Kumar' />
                            </Form.Item>

                            <Form.Item 
                                label="Email"
                                name="email"
                                className='font-semibold'
                                rules={[{required: true, type: 'email', message: "Please enter valid E-mail !"}]}
                            >
                                <Input size='large' placeholder='email@example.com' />
                            </Form.Item>

                            <Form.Item 
                                label="Password"
                                name="password"
                                className='font-semibold'
                                rules={[{required: true}]}
                            >
                                <Input.Password size='large' placeholder='●●●●●●●●●●' />
                            </Form.Item>

                            <Form.Item>
                                <Button htmlType='submit' size='large' type="primary" className=' !bg-green-600 hover:!bg-green-700 !font-semibold'
                                icon={<UserAddOutlined />}>Sign Up</Button>
                            </Form.Item>
                        </Form>
                        <div className='flex gap-2'>
                            <p className='text-gray-700'>Already have an account ?</p>
                            <Link href="/login" className='!text-green-700 font-semibold hover:!text-green-900'>Sign in</Link>
                        </div>
                    </div>
                </Card>
            </div>
    </div>
  )
}

export default Signup
