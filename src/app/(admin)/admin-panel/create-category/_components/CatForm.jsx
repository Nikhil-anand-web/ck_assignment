"use client"
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import axios from 'axios';

import React, { useRef } from 'react'
import { toast } from 'react-toastify';

const CatForm = () => {
    const ref = useRef(null)
    const onSubmit = async (e) => {
        e.preventDefault();

        const file = ref.current?.files?.[0];
        if (!file) {
            toast.error("Please select a file");
            return;
        }

        const categoryName = e.target.elements.categoryName.value;
        const slug = e.target.elements.slug.value;
        const status = e.target.elements.status.value;

        try {
            // Compose full FormData with both file and text fields
            const formData = new FormData();
            formData.append("file", file);
            formData.append("categoryName", categoryName);
            formData.append("slug", slug);
            formData.append("status", status);

            const res = await axios.post("/api/v1/admin/category", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });

            if (res.status !== 200 || !res.data.success) {
                throw new Error(res.data.message || "Failed to create category");
            }

            toast.success(res.data.message || "Category created successfully");
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        }
    };

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


            <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="picture">Picture</Label>
                <Input ref={ref} name="pic" id="picture" type="file" />
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
