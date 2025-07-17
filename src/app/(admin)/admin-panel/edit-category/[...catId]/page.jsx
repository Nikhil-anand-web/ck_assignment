import React from 'react'
import MainModule from '../_components/MainModule'

const page = async ({ params }) => {
    const id = (await params).catId

    const pre = await db.category.findUnique({
        where:{
            id:id[0]
        }
    })

  return (
    <div>
      <div style={{ display: "flex", width: "100%", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "20px", margin: "20px" }}>
                <h1 style={{color:"#000000ab"}} className="scroll-m-20  text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Update Services
                </h1>
            </div>
      <MainModule activeCatId={id} prev = {pre}/>
    </div>
  )
}

export default page
