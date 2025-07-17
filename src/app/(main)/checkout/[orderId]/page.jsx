import React from 'react'

import CheckoutPayu from '../_components/CheckoutPayu';
import CheckoutComp from '../_components/CheckoutComp';

export const dynamic = 'force-dynamic';
const page = async ({params}) => {
 
  const orderId =  (await params).orderId
 

  return (
   <CheckoutComp orderid={orderId}/>
    
    // <CheckoutPayu orderid={orderId}/>
  )
}

export default page
