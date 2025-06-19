import HomeProd from "@/components/User/HomeProd"


const HomeRouter = async () => {
    const productRes = await fetch(`${process.env.SERVER}/api/product`)
    const products = productRes.ok ? await productRes.json() : {data: [], total: 0}
    return <HomeProd data={products} />
}

export default HomeRouter