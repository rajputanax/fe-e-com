import React, { useState , useEffect } from "react";
import { Form , redirect } from "react-router-dom";
import { toast } from "react-toastify";
import CustomFetch from "../utills/CustomFetch";



export const action = async ({ request }) => {
  const formData = await request.formData();

  try {
    const res = await CustomFetch.post('/products/add-product' , formData)
    toast.success("Product added successfully");

    // Redirect after successful addition
    return redirect("/dashboard/products");
   

  //  const file = formData.get('productimg');



    return res; // or redirect("/products");
  } catch (err) {
    console.error(err, 'anas test');
    throw err; // important for React Router errorElement
  }
};















export default function AddProduct() {
  const [image, setImage] = useState(null);
  const [loading,  setLoading] = useState();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  //  const addProducts = async () => {
  //   try {
  //     setLoading(true);
     
     
  //   } catch (err) {
  //     console.error(err?.response?.data?.msg || "Something went wrong");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    // addProducts();
  }, []);

  return (
    <Form method="post" encType="multipart/form-data" className='mt-20 bg-gray-100 min-h-[calc(100vh-86px)] flex  items-center'>

      <div className="w-full flex justify-center p-6 ">
        <div className="bg-white w-full max-w-xl shadow-lg rounded-2xl p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Add Product</h1>

          <div className="grid gap-6">

            <div className="grid gap-2">
              <label className="font-medium">Product Image</label>

              <label htmlFor="productimg" className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl border hover:bg-gray-200 transition w-max">
                Upload Image
                <input id='productimg' type="file" className="hidden" accept="image/*" onChange={handleImage}  name="images" />
              </label>

              {image && (
                <img
                  src={image}
                  alt="preview"
                  className="w-full h-48 object-cover rounded-xl border mt-2 shadow"
                />
              )}
            </div>


            <div className="grid gap-2">
              <label className="font-medium">Product Name</label>
              <input
                type="text"
                 name="name"   
                placeholder="Enter product name"
                className="border px-3 py-2 rounded-xl w-full"
              />
            </div>


            <div className="grid gap-2">
              <label className="font-medium">Price</label>
              <input
                type="number"
                placeholder="Enter price"
                name="price"
                className="border px-3 py-2 rounded-xl w-full"
              />
            </div>
            <div className="grid gap-2">
              <label className="font-medium">Stock</label>
              <input
                type="number"
                placeholder="Enter price"
                name="stock"
                className="border px-3 py-2 rounded-xl w-full"
              />
            </div>


            <div className="grid gap-2">
              <label className="font-medium">Description</label>
              <textarea
               name="description"  
                placeholder="Enter product description"
                className="border px-3 py-2 rounded-xl min-h-24 w-full"
              ></textarea>
            </div>




            <button className="w-full py-4 text-lg rounded-2xl bg-black text-white font-medium hover:bg-gray-900 transition flex justify-center gap-2">
              Add Product
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
}