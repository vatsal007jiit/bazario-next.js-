import UserProd from "@/components/User/UserProd"
import { fetchProducts } from "@/controller/product.controller"

interface HomePageProps {
  searchParams: Promise<{
    page?: string
    limit?: string
  }>
}

export const revalidate = 3600

const HomeRouter = async ({ searchParams }: HomePageProps) => {
  const params = await searchParams
  const page =  params.page || '1'
  const limit = params.limit || '8'
  
  // Build query string
  // const queryParams = new URLSearchParams()
  // queryParams.set('page', page)
  // queryParams.set('limit', limit)
  
  // try {
  //   const productRes = await fetch(`${process.env.SERVER}/api/product?${queryParams.toString()}`, {
  //     cache: 'no-store' // Ensure fresh data on each request
  //   })
  //   const products = productRes.ok ? await productRes.json() : { data: [], total: 0 }
  //Above code will work fine when making server from node seperately. Currently This is failing at build time so we are using function from product controller. [132]
   try {  
  const products = await fetchProducts(parseInt(page), parseInt(limit))
    return (
      <UserProd
        data={products} 
        currentPage={parseInt(page)}
        currentLimit={parseInt(limit)}
      />
    )
  } 
  catch (error) {
    console.error('Error fetching products:', error)
    return (
      <UserProd 
        data={{ data: [], total: 0 }} 
        currentPage={1}
        currentLimit={8}
      />
    )
  }
}

export default HomeRouter