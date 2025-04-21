"use client"
import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';

const CatForm = () => {

    const onSubmit = async (e)=>{

        e.preventDefault();
        
        try {
            // const res = await axios.post()
            const obj = {
                categoryName :e.target.elements.categoryName.value,
                slug :e.target.elements.slug.value,
                image :[{url:e.target.elements.image.value}],
                status :e.target.elements.status.value,
            }
            const res =await axios.post('/api/v1/admin/category', obj);

            
            if (!res.status ===200) {
                throw res
                
            }
          
           
            toast.success(res.data.message)
            

            
        } catch (error) {
            toast.warning(error.data.message)
            
        }

    }

    return (
        <form onSubmit={onSubmit} className="max-w-md space-y-4">

            <div>
                <label htmlFor="categoryName" className="block font-medium mb-1">Category Name</label>
                <input
                    type="text"
                    id="categoryName"
                    name="categoryName"
                    required
                    minLength={2}
                    placeholder="e.g. Electronics"
                    className="w-full border rounded p-2"
                />
            </div>


            <div>
                <label htmlFor="slug" className="block font-medium mb-1">Slug</label>
                <input
                    type="text"
                    id="slug"
                    name="slug"
                    required
                    pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
                    title="Slug must be lowercase and may include hyphens"
                    placeholder="e.g. electronics"
                    className="w-full border rounded p-2"
                />
            </div>


            <div>
                <label htmlFor="image" className="block font-medium mb-1">Image URL</label>
                <input
                    type="url"
                    id="image"
                    name="image"
                    required
                    placeholder="https://example.com/image.jpg"
                    className="w-full border rounded p-2"
                />
            </div>


            <div>
                <label htmlFor="status" className="block font-medium mb-1">Status</label>
                <select defaultValue={"1"} id="status" name="status" required className="w-full border rounded p-2">
                    <option value="1" >Active</option>
                    <option value="0">Inactive</option>
                </select>
            </div>

         
            <button type="submit" className="bg-[#0da487] text-white px-4 py-2 rounded">
                Submit
            </button>
        </form>

    )
}

export default CatForm
