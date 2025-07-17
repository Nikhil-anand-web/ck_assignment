"use client";
import React, { useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";



const MainModule = ({ categories ,packId,productDetail}) => {
  const ref = useRef(null)
  const onSubmit = async (e) => {
    e.preventDefault();

    const formElements = e.target.elements;

    const file = ref.current?.files?.[0];


    const formData = new FormData();
    formData.append("file", file);
    formData.append("categoryId", formElements.category.value);
    formData.append("name", formElements.name.value);
    formData.append("slug", formElements.slug.value);
    formData.append("description", formElements.description.value);
    formData.append("pointsDescription", formElements.pointsDescription.value);
    formData.append("productId", packId);
    formData.append("status", formElements.status.value === "true" ? "1" : "0");
    

    try {
      const res = await axios.post("/api/v1/admin/updateProduct", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };


  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-4">
      <div>
        <label htmlFor="name" className="block font-medium mb-1">
          Product Name
        </label>
        <input
        defaultValue={productDetail.name}
          type="text"
          id="name"
          name="name"
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label htmlFor="slug" className="block font-medium mb-1">
          Slug
        </label>
        <input
        defaultValue={productDetail.slug}
          type="text"
          id="slug"
          name="slug"
          required
          pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label htmlFor="description" className="block font-medium mb-1">
          Description
        </label>
        <textarea
         defaultValue={productDetail.description}
          id="description"
          name="description"
          required
          className="w-full border rounded p-2"
        ></textarea>
      </div>

      <div>
        <label htmlFor="category" className="block font-medium mb-1">
          Category
        </label>
        <select
        defaultValue={productDetail.categoryId}
          id="category"
          name="category"
          required
          className="w-full border rounded p-2"
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.categoryName}
            </option>
          ))}
        </select>
      </div>

      
      <div>
        <label htmlFor="pointsDescription" className="block font-medium mb-1">
          Points Description
        </label>
        <input
         defaultValue={productDetail.pointsDescription}
          id="pointsDescription"
          name="pointsDescription"
          required
          className="w-full border rounded p-2"
          placeholder="please enter csv"
        />
      </div>
      <div>
        <label htmlFor="status" className="block font-medium mb-1">
          Status
        </label>
        <select
          id="status"
          name="status"
          className="w-full border rounded p-2"
          defaultValue= {productDetail.status?"true":"false"}
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="picture">Picture</Label>
        <Input ref={ref} name="pic" id="picture" type="file" />
      </div>

      <button type="submit" className="bg-[#0da487] text-white px-4 py-2 rounded">
        Update Package
      </button>
    </form>
  );
};

export default MainModule;
