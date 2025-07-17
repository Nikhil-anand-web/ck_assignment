import Pagination from '@/components/global/Pagination'
import React from 'react'
export const dynamic = 'force-dynamic';
import db from '@/utils/db'
import ProductCard from '../_components/ProductModel';

const page = async ({ params }) => {
    const catSlug = (await params).catSlug || [];
    // console.log(params)

    const categorySlug = catSlug[0]?.trim() || 'all';


    let pageNo = catSlug.at(catSlug.length - 1);
    const itemsPerPage = 2;

    if (!pageNo || isNaN(pageNo)) {
        pageNo = 1;
    } else {
        pageNo = parseInt(pageNo);
    }

    const products = await db.product.findMany({
        where: {
            AND: [
                (categorySlug === 'all' || !categorySlug || categorySlug === '')
                    ? {}
                    : {
                        category: {
                            slug: categorySlug,
                        },
                    },
                { status: true },
            ],
        },
        skip: (pageNo - 1) * itemsPerPage,
        take: itemsPerPage,
        include: {
            varient: {
                where: {
                    isDefault: true,
                },
            },
        },
    });
console.log(products,"dcfwdc")
if (!products) {
    return <h1> no product found</h1>
    
}

    const count = await db.product.count({
        where: {
            AND: [
                categorySlug === 'all'
                    ? {}
                    : {
                        category: {
                            slug: categorySlug,
                        },
                    },
                { status: true },
            ],
        },
    });
  
console.log(products[0])
    return (
        <>
        <div style={{ display: "flex", width: "100%", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "20px", margin: "20px" }}>
          
            {products.map((obj) => <ProductCard key={obj.id} product={obj} />)}
           


            {/* Pagination */}
           
        </div>
         <Pagination totalItems={count} itemsPerPage={itemsPerPage} currentPage={pageNo} />
         </>
    );
};

export default page;
