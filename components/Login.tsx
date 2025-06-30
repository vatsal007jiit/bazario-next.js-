"use client";
import { Button, Card, Divider, Form, Input, message } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Logo from "./shared/Logo";
import {
  ArrowRightOutlined,
  GoogleOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import "@ant-design/v5-patch-for-react-19";
import Link from "next/link";
import { getSession, signIn } from "next-auth/react";
import clientCatchError from "@/lib/client-catch-error";
import { useRouter } from "next/navigation";
import bg from "@/public/images/bg.jpg";

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [isBrowser, setIsBrowser] = useState(false)
    
      useEffect(() => {
        setIsBrowser(true)
      }, [])
      
  const router = useRouter()

  const login = async (value: any)=>{
    try {
      setLoading(true)
      const payload = {
      ...value,
      redirect: false,
      // callbackUrl: '/user'
    }
    await signIn("credentials", payload)
    const session = await getSession()

    if(!session)
      throw new Error("Login Failed")

    message.success("Login Successful")
    const role = session.user.role

    if(role === 'user')
      router.replace('/user')
    if(role === 'admin')
      router.replace('/admin/products')
    } 
    catch (error) {
      clientCatchError(error)
    }
    finally{
      setLoading(false)
    }
    
  }
  const signInWithGoogle = async ()=>{
    const payload = {
        redirect: true,
        callbackUrl: '/user'
    }

    const res = await signIn("google", payload)
  }
  // const login = async (value: any)=>{
  //     try {
  //         const payload = {
  //           ...value,
  //           redirect: false
  //         }
  //         await signIn("credentials", payload)
  //         const session = await getSession()

  //         if(!session)
  //             throw new Error("Failed to login user")

  //         if(session.user.role === "user")
  //             return router.replace("/user")

  //         if(session.user.role === "admin")
  //             return router.replace("/admin/products")
  //     }
  //     catch(err)
  //     {
  //         clientCatchError(err)
  //     }
  // }

  // const signInWithGoogle = async ()=>{
  //     const payload = {
  //         redirect: true,
  //         callbackUrl: '/'
  //     }
  //   }
  return (
    <div
      className="h-screen bg-cover bg-center mt-10"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <div className="flex items-center justify-center">
        <Card className="w-[480px] animate__animated animate__slideInLeft !bg-green-400">
          <div className="space-y-4">
            <div className="flex justify-center">
              <Logo />
            </div>
            <Form layout="vertical" onFinish={login}>
              <Form.Item
                label="Email"
                name="email"
                className="font-semibold"
                rules={[{ required: true, type: "email",message: "Please enter valid E-mail !" }]}
              >
                <Input size="large" placeholder="email@example.com" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                className="font-semibold"
                rules={[{ required: true }]}
              >
                <Input.Password size="large" placeholder="●●●●●●●●●●" />
              </Form.Item>

              <Form.Item>
                <Button
                  htmlType="submit"
                  size="large"
                  type="primary"
                  loading={loading}
                  icon={<LoginOutlined />}
                  iconPosition={"end"}
                  className="!bg-green-600 hover:!bg-green-700 !font-semibold "
                >
                  Sign in
                </Button>
              </Form.Item>
            </Form>
            <Divider />
            <Button
              // onClick={signInWithGoogle}
              icon={<GoogleOutlined />}
              size="large"
              className="!w-full !font-semibold"
              type="primary"
              danger
            >
              Sign In with Google
            </Button>
            <div className="flex gap-2">
              <p className="text-gray-700">Don't have an acount ?</p>
              <Link
                className="!text-green-700 font-semibold hover:!text-green-900"
                href="/sign-up"
              >
                Sign up
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
