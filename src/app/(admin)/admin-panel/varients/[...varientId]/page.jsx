import React from 'react'
import MainModule from '../_components/MainModule'

const page = async ({ params }) => {
    const pacId = (await params).varientId
    const varients = await db.varient.findMany({
        where: {
            productId: pacId[0]
        },
        include:{
            product:true
        }
    })

    return (
        <div>
             <div style={{ display: "flex", width: "100%", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "20px", margin: "20px" }}>
                <h1 style={{color:"#000000ab"}} className="scroll-m-20  text-4xl font-extrabold tracking-tight lg:text-5xl">
                     Varients of {varients[0].product.name}
                </h1>
            </div>
            <MainModule varients={varients} productId={pacId} />

        </div>
    )
}

export default page
