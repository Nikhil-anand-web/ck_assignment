import React from 'react'
import CheckoutComp from '../_components/CheckoutComp'

export const dynamic = 'force-dynamic';
const page = async ({params}) => {
 
  const orderId =  (await params).orderId
 

  return (

    
    <CheckoutComp orderid={orderId}/>
  )
}

export default page
