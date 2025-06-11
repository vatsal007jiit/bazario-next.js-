'use client'

import { ArrowRightOutlined, DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Card, Divider, Form, Input, InputNumber, Modal, Skeleton, Tag, Upload } from 'antd'
import Image from 'next/image'
import React, { useState } from 'react'

const Products = () => {
  const [form] = Form.useForm()
  const [open, setOpen] =useState(false)
  const [fileList, setFileList] = useState([]);

  const openModal = ()=>{
    setOpen(true)
  }
  const handleClose = ()=>{
    setOpen(false)
  }
  const onSearch = (values: any)=>{

  }

  const handleUploadChange = ({ fileList }: any) => {
  setFileList(fileList);
  };

  const createProduct = (values: any)=>{
    console.log(values)
    form.resetFields();   //  Reset form
    setFileList([]);  //  Reset uploaded file state
    setOpen(false)    // Close modal
  }

  return (
    <div className='flex flex-col gap-8'>
      <Skeleton active/>
      <div className='flex justify-between '>
        <Form onFinish={onSearch}>
            <Form.Item name= "search" rules={[{required: true}]} className='!mb-0'>
              <Input
              placeholder='Search Products'
              suffix={<Button htmlType='submit' type = "text" icon={<SearchOutlined/>}/>}/>
            </Form.Item>
        </Form>
        <Button onClick={openModal} type='primary' size='large'>Add Product +</Button>
      </div>

      <div className='grid grid-cols-4 gap-8'>
        {[...Array(8)].map((_,index)=>(
          <Card 
          key={index}
           hoverable
           cover={
            <div className='relative w-full h-[350px]'>
              <Image src="/images/prod.png"  alt={`product-${index}`} layout="fill" objectFit='cover' className='rounded-t-lg'/>
            </div>
           }
           actions={[
                <EditOutlined key="edit" className='!text-green-400' />,
                <DeleteOutlined key="delete" className='!text-rose-400' />
            ]}
          >
            <Card.Meta
             title="Raahat"
             description={
                  <div className='flex gap-2'>
                    <label>₹425</label>
                    <del>₹499</del>
                    <label>(15% Off)</label>
                  </div>
                }
              />
              <Tag className='!mt-5' color="cyan">20 PCS</Tag>
              <Tag className='!mt-5' color="cyan-inverse">Out Of Stock</Tag>
          </Card>
        ))}
      </div>
      <Modal open={open} width={720} centered footer={null} onCancel={handleClose} maskClosable={false}>
        <h1 className='text-lg font-medium'>Add a new product</h1>
        <Divider />
        <Form layout='vertical' form={form} onFinish={createProduct}>
          <Form.Item
            label="Product name"
            name="title"
            rules={[{required: true}]}
          >
            <Input 
              size='large'
              placeholder='Enter product name'
            />
          </Form.Item>

          <div className='grid grid-cols-3 gap-6'>
            <Form.Item
              label="Price"
              name="price"
              rules={[{required: true, type: "number"}]}
            >
              <InputNumber
                size='large'
                placeholder='00.00'
                className='!w-full'
              />
            </Form.Item>

            <Form.Item
              label="Discount"
              name="discount"
              rules={[{required: true, type: "number"}]}
            >
              <InputNumber
                size='large'
                placeholder='20'
                className='!w-full'
              />
            </Form.Item>

            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[{required: true, type: "number"}]}
            >
              <InputNumber
                size='large'
                placeholder='20'
                className='!w-full'
              />
            </Form.Item>
          </div>

          <Form.Item label="Description" rules={[{required: true}]} name="description">
            <Input.TextArea rows={5} placeholder='Description' />
          </Form.Item>

          <Form.Item name="image" rules={[{required: true, message: 'Please upload a product image!' }]}>
            <Upload
              listType="picture"
              fileList={fileList}
              onChange={handleUploadChange}>
              <Button size="large" icon={<UploadOutlined />}>Upload a product image</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button htmlType='submit' size='large' type='primary' icon={<ArrowRightOutlined />}>Add now</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Products
