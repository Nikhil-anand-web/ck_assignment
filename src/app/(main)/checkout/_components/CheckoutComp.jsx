"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutComp({orderid}) {
  
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    setError(null);

    try {
      setLoading(true)
      const response = await fetch('/api/v1/paytm/init', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({CustomerMeta:formData,orderId:orderid}),
      });

      const data = await response.json();
      console.log(data)
      if ( !data || (!data?.success && (!data?.params?.CHECKSUMHASH || data?.params?.CHECKSUMHASH===''))) {
          throw{
              success:false,
              message:data

          }
          
      }


      const form = document.createElement('form');
      form.method = 'POST';
      form.action = data.url;

      for (const key in data.params) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = data.params[key];
          form.appendChild(input);
      }
      console.log(form)
      document.body.appendChild(form);
      form.submit();

  } catch (error) {
      console.log(error)
      console.log('Error updating details:', error);
      toast.warning(error.message.message||"something went wrong")
  } finally {
      setLoading(false);
  }
  };

  return (
    
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      {orderid}
      <h2 className="text-xl font-semibold mb-4">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <textarea
            name="address"
            rows={3}
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
