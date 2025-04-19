import db from '@/utils/db'
import React from 'react'
import CategoryModalHome from '../ui/CategoryModalHome'

const CategoryModalGalary = async () => {
    const categories = await db.category.findMany({
        where: {
            status: 1

        },
        select: {
            id: true,
            categoryName: true,
            slug: true,
            image: true
        }
    })
    console.log(categories)
    return (
        <div>
            <div style={{ display: "flex", width: "100%", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "20px", margin: "20px" }}>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Our Categories
                </h1>
            </div>
            <div style={{ display: "flex", width: "100%", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "20px", margin: "20px" }}>
                {categories.map((obj) => <CategoryModalHome key={obj.id} slug={obj.slug} imageUrl={obj.image} name={obj.categoryName} />)}
               

            </div>
        </div>
    )
}

export default CategoryModalGalary
