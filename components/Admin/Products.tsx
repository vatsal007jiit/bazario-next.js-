'use client'

import { ArrowRightOutlined, DeleteOutlined, EditOutlined, PlusOutlined, SaveOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Card, Divider, Form, Input, InputNumber, message, Modal, Pagination, Popconfirm, Result, Skeleton, Tag, Upload } from 'antd'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import '@ant-design/v5-patch-for-react-19';
import axios from 'axios'
import useSWR, { mutate } from 'swr'
import fetcher from '@/lib/fetcher'
import {debounce} from 'lodash'
import clientCatchError from '@/lib/client-catch-error'
import calcPrice from '@/lib/calcPrice'
import '@ant-design/v5-patch-for-react-19';

const Products = () => {
  const [prodForm] = Form.useForm()
  const [open, setOpen] =useState(false)
  const [fileList, setFileList] = useState([]);
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(8)
  const [editId, setEditId] = useState<string | null> (null)
  const {data, error, isLoading} = useSWR(`/api/product?page=${page}&limit=${limit}`, fetcher)
  const [products, setProducts] = useState({data: [], total: 0})
  const [isBrowser, setIsBrowser] = useState(false)
    
      useEffect(() => {
        setIsBrowser(true)
      }, [])
  useEffect(()=>{
    if(data)
      {
        setProducts(data)
      }
  }, [data])

  const openModal = ()=>{
    setOpen(true)
  }
  const handleClose = ()=>{
    setOpen(false)
    setFileList([]);  //  Reset uploaded file state
    prodForm.resetFields();
    setEditId(null);
  }
  
  const handleUploadChange = ({ fileList }: any) => {
  setFileList(fileList);
  };

  const createProduct = async (values: any)=>{
   
    values.image = values.image?.file.originFileObj
    const formData = new FormData() //This is followed because we have file in form - and we want to send our data in multipart/form-data format

    for (let key in values)
    {
      formData.append(key, values[key])

    }
    const {data} = await axios.post('/api/product', formData)
    mutate(`/api/product?page=${page}&limit=${limit}`)
    message.success("Product Added Successfully")
  
    handleClose()
  }


  const onPaginate = (page: number)=>{
    setPage(page)
  }

  const deleteProduct = async (slug: string) =>{
    try {
      const {data} = await axios.delete(`/api/product/${slug}`)
      message.success(data.message)

      mutate(`/api/product?page=${page}&limit=${limit}`)
    } 
    catch (error) {
      clientCatchError(error)
    }
  }

  const editProduct = (item: any) =>{
    try{
      setOpen(true)
      setEditId(item._id)
      prodForm.setFieldsValue(item)
    }
    catch(err)
    {
      clientCatchError(err)
    }
  }
  // const saveProduct = async(values: any)=>
  //   {
  //   await axios.put(`/api/product/${editId}`, values)
  //   message.success("Product Updated Successfully")

  //   handleClose()
  //   mutate(`/api/product?page=${page}&limit=${limit}`)
  // } // this method does not handle image -handling form in json format

  const saveProduct = async (values: any) =>
  {
  
    const formData = new FormData()
    // If new image uploaded
    if (values.image && typeof values.image === 'object'){
      formData.append('image', values.image?.file.originFileObj)
    }
    // Append rest of fields
    for (let key in values){
      if(key!== 'image'){
        formData.append(key, values[key])
      }
    }
    
    await axios.put(`/api/product/${editId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data' 
      }
    })
     message.success("Product Updated Successfully")
     handleClose()
     mutate(`/api/product?page=${page}&limit=${limit}`)
  }

  const onSearch = debounce(async (e: any)=>{
    try {  
      const value = e.target.value.trim()
      const{data} = await axios.get(`/api/product?search=${value}`)
      setProducts(data)
    } 
    catch (error) {
      clientCatchError(error)
    }
  }, 1000)

  if(isLoading)
    return <Skeleton active/>

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
    <div className='flex flex-col gap-8'>
      
      <div className='flex justify-between '>
        <Input
          placeholder='Search this site' 
          size='large'
          onChange={onSearch}
          className='!w-[350px]'
        />       
        <Button onClick={openModal} type='primary' size='large'>Add Product +</Button>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10'>
        {products.data.map((item: any, index: number)=>(
          <Card 
          key={index}
           hoverable
           className='!cursor-default overflow-hidden'
           cover={
            <div className='relative w-full h-[320px]'>
              <Image src={item.image}  alt={item.title} 
                fill style={{ objectFit: 'contain' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                className='rounded-t-lg'/>
            </div>
           }
           actions={[
                <EditOutlined key="edit" className='!text-green-400' onClick={()=>editProduct(item)}  />,
                <Popconfirm title="Are you sure you want to delete this product?" onConfirm={()=>deleteProduct(item.slug)}>
                  <DeleteOutlined key="delete" className='!text-rose-400'/>
                </Popconfirm>
                
            ]}
          >
            <Card.Meta
             title={item.title}
             description={
                  <div className='flex gap-2'>
                    <label>₹{calcPrice(item.price, item.discount)}</label>
                    <del>₹{item.price}</del>
                    <label>{item.discount}% Off</label>
                  </div>
                }
              />
              {
              (item.quantity === 0) ?
              <Tag className='!mt-5' color="cyan-inverse">Out Of Stock</Tag>
              :
              <Tag className='!mt-5' color="cyan">{item.quantity} PCS</Tag>
              }       
            </Card>
        ))}
      </div>
      <div className='flex justify-center w-full'>
        <Pagination
          total={products.total}
          onChange={onPaginate}
          current={page}
          showSizeChanger={true}
          pageSizeOptions={['8', '16', '32']}
          defaultPageSize={limit}
          onShowSizeChange={(current, size) => {
            setLimit(size);
            setPage(1); // Reset to page 1 when size changes
          }}/>
      </div>
      
      <Modal open={open} width={720} centered footer={null} onCancel={handleClose} maskClosable={false}>
        <h1 className='text-lg font-medium'>Add a new product</h1>
        <Divider />
        <Form layout='vertical' form={prodForm} onFinish={editId ? saveProduct : createProduct}>
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
              onChange={handleUploadChange}
            > 
             <Button size="large" icon={<UploadOutlined />}>Upload a product image</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            {
              (editId) ? <Button htmlType='submit' size='large' type='primary' danger icon={<SaveOutlined />}>Save Changes</Button>
                      : <Button htmlType='submit' size='large' type='primary' icon={<ArrowRightOutlined />}>Add now</Button>
            }
            
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Products
