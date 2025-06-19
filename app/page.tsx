// import Products from "../components/Products"

// const HomeRouter = async ()=>{
//   const productRes = await fetch(`${process.env.SERVER}/api/product`)
//   const products = productRes.ok ? await productRes.json() : {data: [], total: 0}
//   return <Products data={products} />
// }
// export default HomeRouter

import Products from "../components/Products"

interface HomePageProps {
  searchParams: {
    page?: string
    limit?: string
    search?: string
  }
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const page = searchParams.page || '1'
  const limit = searchParams.limit || '8'
  const search = searchParams.search || ''
  
  // Build query string
  const queryParams = new URLSearchParams()
  queryParams.set('page', page)
  queryParams.set('limit', limit)
  if (search) {
    queryParams.set('search', search)
  }
  
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
        searchQuery={search}
      />
    )
  } catch (error) {
    console.error('Error fetching products:', error)
    return (
      <Products 
        data={{ data: [], total: 0 }} 
        currentPage={1}
        currentLimit={8}
        searchQuery=""
      />
    )
  }
}

export default HomePage


