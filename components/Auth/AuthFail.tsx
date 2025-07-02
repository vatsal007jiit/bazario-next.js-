'use client'

import { Result, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';

export default function AuthFail() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
        <Result
          icon={<ExclamationCircleOutlined style={{ color: '#16a34a' }} />}
          title={<span className="text-green-700 text-2xl font-semibold">Authentication Failed</span>}
          subTitle={
            <p className="text-gray-600">
              Oops! Something went wrong while signing you in. <br />
              Please try again or signup.
            </p>
          }
          extra={[
            <Link href="/login" key="retry">
              <Button type="primary" className="!bg-green-600 hover:!bg-green-700 !font-semibold ">
                Try Again
              </Button>
            </Link>,
            <Link href="/" key="home">
              <Button className="!font-semibold hover:!text-green-600  hover:!border-green-800 ">Go Home</Button>
            </Link>,
          ]}
        />
      </div>
    </div>
  );
}
