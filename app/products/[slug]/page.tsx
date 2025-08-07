import Slug from "@/components/Slug"
import slugInterface from "@/interface/slug.interface"
import clientCatchError from "@/lib/client-catch-error"
import { Metadata } from "next"


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const res = await fetch(`${process.env.SERVER}/api/product/${slug}`)
  const data = await res.json()

  return {
    title: data?.product?.title || "Product",
    description: data?.product?.description || "Product details",
    keywords: 'Greenatva roll-ons',
    openGraph: {
      title: data ? `Greenatva - ${data?.product?.title}` : 'Greenatva',
      description: data?.product?.description || "Product details",
      url: `${process.env.SERVER}/products/${slug}`,
      siteName: "Greenatva",
      images: [
        {
          url: data ? data.product.image : "/images/review3.webp"
        },
      ],
      locale: "en_US",
      type: "website"
    }
  }
}

export const generateStaticParams = async() =>{

  const res = await fetch(`${process.env.SERVER}/api/product?slug=true`)

  if (!res.ok) {
    console.error("Failed to fetch slugs");
    return []; // Return empty params array instead of throwing
  }

  const slugList = await res.json()

  return slugList.map((slug: string)=>(
    {slug}
  ))
}

export const revalidate = 3600 // Rebuild page every hour (ISR - Incremental Static Regeneration)

const SlugRouter = async ({params}:slugInterface) => {
  
  try {
    const {slug} = await params 
    const slugRes = await fetch(`${process.env.SERVER}/api/product/${slug}`) 
    const data = slugRes.ok ? await slugRes.json(): null
    return (<Slug data={data.product} title={slug} />)
  } 
  catch (error) {
    clientCatchError(error)
  }
}

export default SlugRouter