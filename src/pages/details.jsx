import { useLoaderData } from "react-router";
import CustomFetch from "../utills/CustomFetch";
import { ScaleLoader } from "react-spinners"
import { useEffect, useState } from "react";
import ProductZoom from '../components/ProductZoom'
import "./PageStyles/details.scss";
import { useCartContext } from "./context/cartprovider";
import { AiOutlineShoppingCart } from "react-icons/ai";
import CartButton from '../components/CartButton.jsx'
// ======================
// Loader Function
// ======================
export const loader = async ({ params }) => {
  const { id } = params;
  try {
    const res = await CustomFetch.get(`products/product/${id}`);
    console.log(res.data.product, "-------");
    return res.data.product;
  } catch (err) {
    console.error(err?.response?.data?.msg || "Something went wrong");
    throw err; // rethrow to let router handle it
  }
};


const Details = () => {
  const product = useLoaderData();
  const { addToCart } = useCartContext();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (product) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [])
  return (
    <>

      {loading ? (
        <div className="flex justify-center items-center gap-2 mt-10" style={{ minHeight: 500 }}>
          <ScaleLoader />
        </div>) : (
        <div className="container details-products">

          <h2>Product Details</h2>

          <div className="flex justify-center items-center gap-20 mt-10">
            <div className="right">

              <ProductZoom product={product} />
            </div>


            <div className="left details">
              <h3> {product.name}
              </h3>
              <span>Price : {product.price}
              </span>
              <p>
                Description : {product.description}
              </p>
               {/* Add to Cart Button */}
  {/* <button
    className="add-to-cart-btn"
    onClick={() => addToCart(product)}
  >
    <AiOutlineShoppingCart size={20} style={{ marginRight: "8px" }} />
    Add to Cart
  </button> */}
  <CartButton handle={() => addToCart(product)}  />
            </div>
          </div>


        </div>
      )
      }













    </>
  )






};

export default Details;
