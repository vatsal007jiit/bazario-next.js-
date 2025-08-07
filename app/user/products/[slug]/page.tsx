import UserSlug from "@/components/User/UserSlug"
import { fetchProductBySlug } from "@/controller/product.controller"
import slugInterface from "@/interface/slug.interface"
import { Metadata } from "next"

export const revalidate = 3600 ; 

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  // const res = await fetch(`${process.env.SERVER}/api/product/${slug}`)
  // const data = await res.json()

  const data = await fetchProductBySlug(slug)


  return {
    title: data?.title || "Product",
    description: data?.description || "Product details",
  }
}

const SlugRouter = async ({params}:slugInterface) => {
  
  const {slug} = await params 
  // const slugRes = await fetch(`${process.env.Server}/api/product/${slug}`) // Warning use try catch here
  // const data = slugRes.ok ? await slugRes.json(): null
  // return (<UserSlug data={data.product} title={slug} />)

   const data = await fetchProductBySlug(slug)
      return (
        <UserSlug data={data} title={slug} />
      )

}

export default SlugRouter