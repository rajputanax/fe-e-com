// import {  useLoaderData } from "react-router-dom";
import "./PageStyles/Products.scss";
import CustomFetch from "../utills/CustomFetch";
import { useEffect, useState } from "react";
import Pagination from "../components/pagination"
import { Link } from 'react-router-dom';
import { ScaleLoader } from "react-spinners"
import { FiEdit2, FiTrash2 } from "react-icons/fi";




const Products = ({user}) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await CustomFetch.get(`/products/all-products?page=${page}&limit=${limit}`);
      setProducts(res.data.products);
     console.log(',,,,,,,,,', res)
      setTotal(res.data.total);
      setLimit(res.data.limit)
      console.log(products)
    } catch (err) {
      console.error(err?.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  // Add this function before the return statement
  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await CustomFetch.delete(`/products/${productId}`);
        fetchProducts();
      } catch (err) {
        console.error(err?.response?.data?.msg || "Delete failed");
      }
    }
  };

  const handleEdit = (productId) => {
    // Navigate to edit page
    window.location.href = `../edit/${productId}`;
  };

  return (
    <div className="products-page container">
      <div className="products-header">
        <h2>Products</h2>
        <input
          type="text"
          placeholder="Search products..."
          className="search-input"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center gap-2 mt-10" style={{ minHeight: 500 }}>
          <ScaleLoader />
        </div>
      ) : !products || products.length === 0 ? (
        <p className='flex justify-center items-center min-h-[50vh]'>
          {user?.currentUser?.role === 'seller' ? "you didn't add products yet" : 'No Products found'}
        </p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card border rounded shadow-lg" key={product._id}>
              <Link to={`../details/${product._id}`}>
                <div className="product-image">
                  <img src={product.images || product.image} alt={product.name} />
                </div>
                <h3>{product.name}</h3>
                <p className="category">{product.category}</p>
                <p className="price">{product.price} $</p>
                <p className="stock">In Stock: {product.stock}</p>
                <button className="btn">View Details</button>
              </Link>
              <div className="product-actions flex gap-2 mt-4 justify-end">
                <span className="cursor-pointer text-blue-500 border rounded-[50%] p-2 hover:text-blue-700">
                  <FiEdit2 onClick={() => handleEdit(product._id)} className="icon edit-icon" />
                </span>
                <span className="cursor-pointer text-red-500 border rounded-[50%] p-2 hover:text-red-700">
                  <FiTrash2 onClick={() => handleDelete(product._id)} className="icon delete-icon" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination
        total={total}
        page={page}
        limit={limit}
        onPageChange={(x) => setPage(x)}
      />
    </div>
  );
};

export default Products;
