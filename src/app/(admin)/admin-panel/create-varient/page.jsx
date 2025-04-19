import React from 'react'
import VarientForm from './_components/VarientForm'
import db from '@/utils/db'
export const dynamic = 'force-dynamic';
const page = async () => {
    const res = await db.product.findMany({
        select: {
            id: true,
            name: true,
            slug: true
        }
    })
    return (
        <>
            <h1>Create varient</h1>
            <div className={"flex w-lvw justify-center"}>
                <VarientForm products={res} />

            </div>
        </>
    )
}

export default page
