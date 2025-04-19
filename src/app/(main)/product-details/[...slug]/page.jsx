import db from '@/utils/db'
import React from 'react'
import ProductDetails from '../_components/ProductDetails'
export const dynamic = 'force-dynamic';
const page = async ({ params }) => {
  const slug = (await params).slug
  const prod = await db.product.findFirst({
    where: {
      slug: slug.toString()
    },
    include:{
      varient:true
    }
  })
  if (!prod) {
    return<h1>no product</h1>
    
  }

  return (
    <div>
    
      <ProductDetails product={JSON.stringify(prod)}/>

    </div>
  )
}

export default page
