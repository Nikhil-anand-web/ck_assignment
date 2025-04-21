"use client";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const categories = [
  { slug: "electronics", name: "Electronics" },
  { slug: "furniture", name: "Furniture" },
];

const CreateProductForm = ({categories}) => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const obj = {
      categoryId: form.elements.category.value,
      name: form.elements.name.value,
      slug: form.elements.slug.value,
      description: form.elements.description.value,
      status: form.elements.status.value === "true"?1:0,
      thumbNail: { url: form.elements.thumbNail.value }, 
     
    };

    try {
      const res = await axios.post("/api/v1/admin/createProduct", obj);

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
        <label htmlFor="thumbNail" className="block font-medium mb-1">
          Thumbnail Image URL
        </label>
        <input
          type="url"
          id="thumbNail"
          name="thumbNail"
          required
          className="w-full border rounded p-2"
        />
      </div>

      {/* <div>
        <label htmlFor="images" className="block font-medium mb-1">
          Product Images (URL)
        </label>
        <input
          type="url"
          id="images"
          name="images"
          required
          className="w-full border rounded p-2"
        />
      </div> */}

      <div>
        <label htmlFor="status" className="block font-medium mb-1">
          Status
        </label>
        <select
          id="status"
          name="status"
          className="w-full border rounded p-2"
          defaultValue="true"
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      <button type="submit" className="bg-[#0da487] text-white px-4 py-2 rounded">
        Create Product
      </button>
    </form>
  );
};

export default CreateProductForm;
