import React from 'react'
import CreateProductForm from './_components/CreateProductForm'
import db from '@/utils/db'
export const dynamic = 'force-dynamic';
const page = async () => {
    const res = await db.category.findMany({
        select: {
            categoryName: true,
            slug: true,
            id: true
        }
    })
    return (
        <>
            <h1>Create product</h1>
            <div className={"flex w-lvw justify-center"}>
                <CreateProductForm categories={res} />
            </div>
        </>


    )
}

export default page
