import React from 'react'
import CheckoutComp from '../_components/CheckoutComp'


const page = async ({params}) => {
 
  const orderId =  (await params).orderId
 

  return (

    
    <CheckoutComp orderid={orderId}/>
  )
}

export default page
