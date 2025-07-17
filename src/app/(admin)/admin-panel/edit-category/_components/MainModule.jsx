"use client";
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import axios from 'axios';
import React, { useRef } from 'react';
import { toast } from 'react-toastify';

const MainModule = ({ prev, activeCatId }) => {
  const ref = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const file = ref.current?.files?.[0];

    const categoryName = e.target.elements.categoryName.value;
    const slug = e.target.elements.slug.value;
    const status = e.target.elements.status.value;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("categoryName", categoryName);
      formData.append("slug", slug);
      formData.append("status", status);
      formData.append("ids", activeCatId);

      const res = await axios.post("/api/v1/admin/editCategory", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status !== 200 || !res.data.success) {
        throw new Error(res.data.message || "Failed to update category");
      }

      toast.success(res.data.message || "Category updated successfully");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <div>
          <label htmlFor="categoryName" className="block font-medium mb-1">
            Category Name
          </label>
          <input
            defaultValue={prev.categoryName}
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
          <label htmlFor="slug" className="block font-medium mb-1">
            Slug
          </label>
          <input
            defaultValue={prev.slug}
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

        <div className="grid w-full items-center gap-3">
          <Label htmlFor="picture">Picture</Label>
          <Input ref={ref} name="pic" id="picture" type="file" />
        </div>

        <div>
          <label htmlFor="status" className="block font-medium mb-1">
            Status
          </label>
          <select
            defaultValue={prev.status.toString()}
            id="status"
            name="status"
            required
            className="w-full border rounded p-2"
          >
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-[#0da487] w-full text-white px-4 py-2 rounded hover:bg-[#ebdf76] transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MainModule;
