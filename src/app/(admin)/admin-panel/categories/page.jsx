import React from 'react'
import MainModule from './_components/MainModule'
import db from '@/utils/db'

const page = async () => {
    const cats = await db.category.findMany({})
    return (
        <>
        <div style={{ display: "flex", width: "100%", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "20px", margin: "20px" }}>
                <h1 style={{color:"#000000ab"}} className="scroll-m-20  text-4xl font-extrabold tracking-tight lg:text-5xl">
                     Services
                </h1>
            </div>
        <MainModule cats={cats} />
        </>
    )
}

export default page
