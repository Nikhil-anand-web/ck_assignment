import db from '@/utils/db'
import React from 'react'
import CategoryModalHome from '../ui/CategoryModalHome'
import { SparklesCore } from "../ui/sparkles";

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
                    Our Services
                </h1>
            </div>
            
            <div className=" w-full  flex flex-col items-center justify-center overflow-hidden rounded-md">
             
                <div style={{ backgroundColor: "transparent" }} className="w-[40rem] h-40 relative">
                    {/* Gradients */}
                    <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] blur-sm" />
                    <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                    <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                    <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

                    {/* Core component */}
                    {/* <SparklesCore
                        background="transparent"
                        minSize={0.4}
                        maxSize={1}
                        particleDensity={1200}
                        className="w-full h-full"
                        particleColor="#e11212"
                    /> */}

                    {/* Radial Gradient to prevent sharp edges */}
                    {/* <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div> */}
                </div>
                <div style={{ display: "flex", width: "100%", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "20px", margin: "20px" }}>
                    {categories.map((obj) => <CategoryModalHome key={obj.id} slug={obj.slug} imageUrl={obj.image} name={obj.categoryName} />)}
                    


                </div>
            </div>

        </div>
    )
}

export default CategoryModalGalary
