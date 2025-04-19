import React from 'react'
import CnfModal from '../_components/CnfModal'

const page = async ({params}) => {
    const id = (await params).orderId
    console.log(id)
  return (
    <CnfModal orderIdL={id}/>
  )
}

export default page
