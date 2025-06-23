import Products from "@/components/Products"

interface ProdPageProps {
  searchParams: Promise<{
    page?: string
    limit?: string
  }>
}

const ProductPage = async ({ searchParams }: ProdPageProps) => {
  const params = await searchParams
  const page =  params.page || '1'
  const limit = params.limit || '8'
  
  // Build query string
  const queryParams = new URLSearchParams()
  queryParams.set('page', page)
  queryParams.set('limit', limit)
  
  try {
    const productRes = await fetch(`${process.env.SERVER}/api/product?${queryParams.toString()}`, {
      cache: 'no-store' // Ensure fresh data on each request
    })
    const products = productRes.ok ? await productRes.json() : { data: [], total: 0 }
    
    return (
      <Products 
        data={products} 
        currentPage={parseInt(page)}
        currentLimit={parseInt(limit)}
      />
    )
  } 
  catch (error) {
    console.error('Error fetching products:', error)
    return (
      <Products 
        data={{ data: [], total: 0 }} 
        currentPage={1}
        currentLimit={8}
      />
    )
  }
}

export default ProductPage



// import Products from "../components/Products"



// const HomeRouter = async ()=>{
//   const productRes = await fetch(`${process.env.SERVER}/api/product`)
//   const products = productRes.ok ? await productRes.json() : {data: [], total: 0}
//   return <Products data={products} />
// }
// export default HomeRouter


