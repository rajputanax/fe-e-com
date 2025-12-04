// import {  useLoaderData } from "react-router-dom";
import "./PageStyles/Products.scss";
import CustomFetch from "../utills/CustomFetch";
import { useEffect, useState } from "react";
import Pagination from "../components/pagination"
import { Link } from 'react-router-dom';
import { ScaleLoader } from "react-spinners"




const Products = () => {
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
    } catch (err) {
      console.error(err?.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

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
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <Link to={`../details/${product._id}`}>
              <div className="product-card" key={product._id}>
                <div className="product-image">
                  <img src={product.images} alt={product.name} />
                </div>
                <h3>{product.name}</h3>
                <p className="category">{product.category}</p>
                <p className="price">${product.price}</p>
                <p className="stock">In Stock: {product.stock}</p>
                <button className="btn">View Details</button>
              </div>
            </Link>

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
