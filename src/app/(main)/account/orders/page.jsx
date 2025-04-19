import React from 'react'
import OrderList from '../_components/OrderList'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import db from '@/utils/db'

const page =  async() => {
    const user = await getServerSession(authOptions)
    const res = await db.orders.findMany({
        where:{
          AND:[{  customerId:user.user._id},{paymentStatus:1}]
        },
       
    })
    console.log(res)
  return (
    <div>
        <OrderList orders = {res}/>
      
    </div>
  )
}

export default page
