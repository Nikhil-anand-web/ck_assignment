"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const VarientForm = ({ products }) => {
  const [selectedProductId, setSelectedProductId] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (!selectedProductId) {
      toast.warning("Please select a product!");
      return;
    }

    const obj = {
      slug: form.slug.value,
      name: form.name_sl.value, 
      validity: parseInt(form.val.value), 
      status: form.status.value === "true",
      discount: parseFloat(form.discount.value),
      mrp: parseFloat(form.mrp.value),
      isDefault: form.isDefault.value === "true",
      productId: selectedProductId,
    };

    try {
      const res = await axios.post("/api/v1/admin/createVarient", obj);

      if (!res.data.success) {
        throw new Error(res.data.message || "Failed to create variant");
      }

      toast.success(res.data.message || "Variant created successfully");
    } catch (error) {
      toast.error(error.message || "Error creating variant");
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-md space-y-4">

      {/* Product Dropdown */}
      <div>
        <label htmlFor="productId" className="block font-medium mb-1">Select Product</label>
        <select
          id="productId"
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          required
          className="w-full border rounded p-2"
        >
          <option value="">-- Select Product --</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      {/* Other Fields */}
      <div>
        <label htmlFor="slug" className="block font-medium mb-1">Slug</label>
        <input
          type="text"
          id="slug"
          name="slug"
          required
          pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
          title="Slug must be lowercase and may include hyphens"
          placeholder="e.g. variant-small-1kg"
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label htmlFor="name_sl" className="block font-medium mb-1">Name</label>
        <input
          type="text"
          id="name_sl"
          name="name_sl"
          required


          placeholder="e.g. variant-small-1kg"
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label htmlFor="name_sl" className="block font-medium mb-1">Validity</label>
        <input
          type="number"
          id="val"
          name="val"
          required


          placeholder="e.g. variant-small-1kg"
          className="w-full border rounded p-2"
        />
      </div>





      <div>
        <label htmlFor="status" className="block font-medium mb-1">Status</label>
        <select name="status" id="status" className="w-full border rounded p-2">
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      <div>
        <label htmlFor="discount" className="block font-medium mb-1">Discount (%)</label>
        <input
          type="number"
          id="discount"
          name="discount"
          step="0.01"
          defaultValue="0"
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label htmlFor="mrp" className="block font-medium mb-1">MRP (₹)</label>
        <input
          type="number"
          id="mrp"
          name="mrp"
          step="0.01"
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label htmlFor="isDefault" className="block font-medium mb-1">Is Default</label>
        <select name="isDefault" id="isDefault" className="w-full border rounded p-2">
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-[#0da487] text-white px-4 py-2 rounded hover:opacity-90"
      >
        Submit
      </button>
    </form>
  );
};

export default VarientForm;
