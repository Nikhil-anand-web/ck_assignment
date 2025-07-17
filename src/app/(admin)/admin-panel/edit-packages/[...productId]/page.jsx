import db from '@/utils/db'
import React from 'react'
import MainModule from '../_components/MainModule'

const page = async  ({params}) => {
    const pid = (await params).productId

    const prod = await  db.product.findUnique({
        where:{
            id:pid[0]

        }
    })
    const cats = await db.category.findMany({
    })
  return (
    <div>

      <MainModule categories={cats} packId={pid} productDetail = {prod}/>
    </div>
  )
}

export default page
