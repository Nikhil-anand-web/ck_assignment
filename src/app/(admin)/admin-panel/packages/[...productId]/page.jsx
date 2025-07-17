import db from '@/utils/db'
import React from 'react'
import MainModule from '../_components/MainModule'

const page = async ({ params }) => {
  const id = (await params).productId

  const products = await db.product.findMany({
    where: {
      categoryId: id[0]
    },
    include:{
      category:true
    }
  })
  console.log(products)

  return (
    <div>
      <div style={{ display: "flex", width: "100%", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "20px", margin: "20px" }}>
        <h1 style={{ color: "#000000ab" }} className="scroll-m-20  text-4xl font-extrabold tracking-tight lg:text-5xl">
          Packages of {products[0]?.category.categoryName}
        </h1>
      </div>
      <MainModule products={products} />
    </div>
  )
}

export default page
