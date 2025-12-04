import React, { useState } from "react";

export default function AddProduct() {
  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  return (
    <div className="w-full flex justify-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white w-full max-w-xl shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Add Product</h1>

        <div className="grid gap-6">
               {/* Image Upload */}
          <div className="grid gap-2">
            <label className="font-medium">Product Image</label>

            <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl border hover:bg-gray-200 transition w-max">
           Upload Image
              <input type="file" className="hidden" accept="image/*" onChange={handleImage} />
            </label>

            {image && (
              <img
                src={image}
                alt="preview"
                className="w-full h-48 object-cover rounded-xl border mt-2 shadow"
              />
            )}
          </div>
          {/* Product Name */}

          <div className="grid gap-2">
            <label className="font-medium">Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              className="border px-3 py-2 rounded-xl w-full"
            />
          </div>

          {/* Price */}
          <div className="grid gap-2">
            <label className="font-medium">Price</label>
            <input
              type="number"
              placeholder="Enter price"
              className="border px-3 py-2 rounded-xl w-full"
            />
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <label className="font-medium">Description</label>
            <textarea
              placeholder="Enter product description"
              className="border px-3 py-2 rounded-xl min-h-24 w-full"
            ></textarea>
          </div>

       

          {/* Submit */}
          <button className="w-full py-4 text-lg rounded-2xl bg-black text-white font-medium hover:bg-gray-900 transition flex justify-center gap-2">
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}