import { UserAddOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, message } from 'antd'
import Link from 'next/link'
import React from 'react'
import Logo from './shared/Logo'
import { useRouter } from 'next/router'
import axios from 'axios'
import clientCatchError from '@/lib/client-catch-error'

const Signup = () => {
  const router = useRouter()
  
  const handleSignup = async (values: any)=>{
      try {
        const {data} = await axios.post('/api/signup', values)
        message.success(data.message)
        if(data)
          router.push('/login')
      } 
      catch (error) {
        clientCatchError(error)  
      }
  }
  return (
    <div>
      <div className='flex items-center justify-center'>
                <Card className='w-[480px] animate__animated animate__slideInRight'>
                    <div className='space-y-4'>
                        <div className='flex justify-center'>
                            <Logo />
                        </div>
                        <Form layout='vertical' onFinish={handleSignup}>
                            <Form.Item 
                                label="Fullname"
                                name="fullname"
                                rules={[{required: true}]}
                            >
                                <Input size='large' placeholder='Ravi singh parihar' />
                            </Form.Item>

                            <Form.Item 
                                label="Email"
                                name="email"
                                rules={[{required: true, type: 'email'}]}
                            >
                                <Input size='large' placeholder='email@example.com' />
                            </Form.Item>

                            <Form.Item 
                                label="Password"
                                name="password"
                                rules={[{required: true}]}
                            >
                                <Input.Password size='large' placeholder='email@example.com' />
                            </Form.Item>

                            <Form.Item>
                                <Button htmlType='submit' size='large' type="primary" danger icon={<UserAddOutlined />}>Sign up</Button>
                            </Form.Item>
                        </Form>
                        <div className='flex gap-2'>
                            <p className='text-gray-500'>Already have an account ?</p>
                            <Link href="/login">Sign in</Link>
                        </div>
                    </div>
                </Card>
            </div>
    </div>
  )
}

export default Signup
