import React from 'react'
import CnfModal from '../_components/CnfModal'
export const dynamic = 'force-dynamic';
const page = async ({params}) => {
    const id = (await params).orderId
    console.log(id)
  return (
    <CnfModal orderIdL={id}/>
  )
}

export default page
