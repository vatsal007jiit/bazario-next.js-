'use client';
import clientCatchError from '@/lib/client-catch-error';
import { SaveOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, InputNumber, message, Select } from 'antd';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect} from 'react';

const { Option } = Select;

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh'
];

const Profile = () => {


  const [userForm] = Form.useForm();  


  const session = useSession()
  const user = session?.data?.user

  useEffect(()=>{
    if(user){
      userForm.setFieldsValue({
        fullName: user.name,
        ...user.address
      })
    }   
  }, [user, userForm])
  
   //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveChanges = async (values: any) => {
    try {
      const payload = {
          fullName: values.fullName,
          address: {
              street: values.street,
              city: values.city, 
              country: values.country,
              state: values.state,
              pincode: values.pincode,
              contact: values.contact
          }
        }
      const {data} = await axios.put('/api/user/profile', payload)
   
      message.success(data.message)

      await session.update({ 
        ...session,
        user:{
           ...session?.data?.user,
          name: payload.fullName,
          address: payload.address
        }
      }) //Refresh session (update token )
    
    } 
    catch (error) {
      clientCatchError(error)
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center text-green-600 mb-2">Profile Information</h1>
      <Divider />
      <Form
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        form={userForm}
        onFinish={saveChanges}
        labelAlign="right"
        requiredMark={false} //  disables the asterisk
        // colon={false}
      >
        <Form.Item
          label={<span className="font-bold text-green-800">Full Name</span>}
          name="fullName"
          rules={[{ required: true, message: 'Please enter your full name' }]}
        >
          <Input size="large" placeholder="Enter your full name" />
        </Form.Item>

        <Form.Item
          label={<span className="font-bold text-green-800">Street Address</span>}
          name="street"
          rules={[{ required: true, message: 'Please enter your street address' }]}
        >
          <Input size="large" placeholder="123 Main St" />
        </Form.Item>

        <Form.Item
          label={<span className="font-bold text-green-800">City</span>}
          name="city"
          rules={[{ required: true, message: 'Please enter your city' }]}
        >
          <Input size="large" placeholder="e.g., Mumbai" />
        </Form.Item>

        <Form.Item
          label={<span className="font-bold text-green-800">Country</span>}
          name="country"
          initialValue="India"
          rules={[{ required: true, message: 'Please select a country' }]}
        >
          <Select size="large">
            <Option value="India">India</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={<span className="font-bold text-green-800">State</span>}
          name="state"
          rules={[{ required: true, message: 'Please select your state' }]}
        >
          <Select size="large" showSearch placeholder="Select your state">
            {indianStates.map((state) => (
              <Option key={state} value={state}>
                {state}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={<span className="font-bold text-green-800">Pincode</span>}
          name="pincode"
          rules={[{ required: true, message: 'Please enter your pincode' }]}
        >
          <InputNumber
            size="large"
            className="!w-full"
            placeholder="e.g., 110001"
            maxLength={6}
          />
        </Form.Item>

        <Form.Item
          label={<span className="font-bold text-green-800">Contact</span>}
          name="contact"
          rules={[{ required: true, message: 'Please enter your Mobile Number' }]}
        >
          <InputNumber
            size="large"
            className="!w-full"
            placeholder="e.g., 9999999999"
          />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }} className="text-center mt-6">
          <Button
            htmlType="submit"
            size="large"
            type="primary"
            icon={<SaveOutlined />}
            className="!bg-green-600 hover:!bg-green-700"
          >
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Profile;



// 'use client'
// import { SaveOutlined } from '@ant-design/icons'
// import { Button, Divider, Form, Input, InputNumber } from 'antd'
// import React from 'react'

// const Profile = () => {

//   const [userForm] = Form.useForm()

//   const saveChanges = ()=>{

//   }

//   return (
//     <div>
//       <h1 className='text-lg font-medium'>Profile Information</h1>
//       <Divider />
//       <div>
//         <Form layout='vertical' form={userForm} onFinish={saveChanges}>
//           <div className='grid grid-cols-3 gap-8'>
//             <Form.Item
//               label="Fullname"
//               name="fullname"
//               rules={[{required: true}]}
//             >
//               <Input size='large' />
//             </Form.Item>

//             <Form.Item
//               label="Street address"
//               name="street"
//               rules={[{required: true}]}
//             >
//               <Input size='large' />
//             </Form.Item>

//             <Form.Item
//               label="City"
//               name="city"
//               rules={[{required: true}]}
//             >
//               <Input size='large' />
//             </Form.Item>
//           </div>

//           <div className='grid grid-cols-3 gap-8'>
//             <Form.Item
//               label="State"
//               name="state"
//               rules={[{required: true}]}
//             >
//               <Input size='large' />
//             </Form.Item>

//             <Form.Item
//               label="Country"
//               name="country"
//               rules={[{required: true}]}
//             >
//               <Input size='large' />
//             </Form.Item>

//             <Form.Item
//               label="Pincode"
//               name="pincode"
//               rules={[{required: true}]}
//             >
//               <InputNumber size='large' className='!w-full' />
//             </Form.Item>
//           </div>

//           <Form.Item>
//             <Button htmlType='submit' size='large' type="primary" danger icon={<SaveOutlined />}>Save Changes</Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   )
// }

// export default Profile
