import Products from "../components/Products"

const HomeRouter = async ()=>{
  const productRes = await fetch(`${process.env.SERVER}/api/product`)
  const products = productRes.ok ? await productRes.json() : {data: [], total: 0}
  return <Products data={products} />
}

export default HomeRouter

// import Products from "@/components/Products"

// interface Props {
//   searchParams?: { [key: string]: string | string[] | undefined }
// }

// const Home = async ({ searchParams }: Props) => {
//   const page = Number(searchParams?.page ?? 1)
//   const limit = Number(searchParams?.limit ?? 8)

//   const productRes = await fetch(`${process.env.SERVER}/api/product?page=${page}&limit=${limit}`, {
//     cache: 'no-store',
//   })

//   const products = productRes.ok ? await productRes.json() : { data: [], total: 0 }

//   return <Products data={products} page={page} limit={limit} />
// }

// export default Home

