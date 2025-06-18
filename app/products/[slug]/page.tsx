import Slug from "@/components/Slug"
import slugInterface from "@/interface/slug.interface"
import { Metadata } from "next"
import { FC } from "react"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const res = await fetch(`${process.env.SERVER}/api/product/${params.slug}`)
  const data = await res.json()

  return {
    title: data?.product?.title || "Product",
    description: data?.product?.description || "Product details",
  }
}

const SlugRouter:FC<slugInterface> = async ({params}) => {
  
  const {slug} = await params 
  const slugRes = await fetch(`${process.env.Server}/api/product/${slug}`)
  const data = slugRes.ok ? await slugRes.json(): null
  return (<Slug data={data.product} title={slug} />)
}

export default SlugRouter