import "./Header.scss";
import { Link } from "react-router-dom";

import { AiOutlineShoppingCart } from "react-icons/ai"; // 🛒 Add this import
import { useState } from "react";
import { useCartContext } from "../../pages/context/cartprovider";
import { RiDeleteBin7Line } from "react-icons/ri";
import { PiCigaretteDuotone } from "react-icons/pi";
const Header = ({ bgColor, signInUser }) => {

  const { cart, deleteItem, deleteAll } = useCartContext();
  const [showDropdown, setShowDropDown] = useState(false);

  const qty = cart.reduce((curr, acc) => curr + acc.qty, 0);
  const total = cart.reduce((curr, acc) => curr + acc.qty * acc.price, 0).toFixed(2);
  // setCartCount(qty);




  return (
    <header className={`dukan-header ${bgColor ? "w-full bg-color" : ""}`}>
      <div className={`container ${signInUser ? "increase-max-width" : ""}`}>
        <div className="dukan-header-inner">
          {/*........ Logo */}
          <div className="logo">
            <Link to="/"><PiCigaretteDuotone />smokePlanet</Link>
          </div>

          {/* Nav Links */}
          {!bgColor && (
            <ul className="dukan-nav-list">
              <li><Link to="/">Home</Link></li>
              <li><a href="#about">About</a></li>
              <li><a href="#team">Our Team</a></li>
              <li><a href="#comitments">Services</a></li>
            </ul>
          )}

          {/* .........Right Section */}

          <div className="d-flex gap-30 items-center">
            {signInUser ? (
              <p style={{ color: "white" }} className="welcome-user">
                Hody {signInUser} !
              </p>
            ) : (
              <Link to='/login' className="btn-explore-app">Login</Link>
            )}

            {/*.......... 🛒 Cart Icon with Badge */}

            {signInUser && (
              <>
                <div className="relative">
                  <button button className="cart-icon z-50" onClick={() => setShowDropDown(!showDropdown)}>
                    <AiOutlineShoppingCart size={28} color="white" />
                    {qty > 0 && <span className="cart-badge">{qty}</span>}
                  </button>
                </div>
                {showDropdown && (

                  <div className="absolute bg-white border mt-2 top-[5.4rem] min-h-[60px] h-auto text-center p-6 shadow rounded w-89 right-10">
                    <h2 className="text-lg mb-2 font-semibold">Cart Dropdown</h2>

                    {cart.length === 0 ? (
                      <p className="text-gray-500">Your cart is empty</p>
                    ) : (
                      <ul className="space-y-2">
                        {cart.map((product) => (

                          <li key={product.id} className="border-b last:border-none pb-2 text-left flex justify-between gap-4">
                            <div title='go to cart'>
                              <h6 className="text-gray-500">{product.name}</h6>
                              <span className="text-gray-600">Price : {product.price}

                              </span>
                            </div>
                            <div className="delete">
                              <button
                                onClick={() => deleteItem(product._id)}
                                className="p-2 rounded hover:bg-red-100 text-red-600"
                              >
                                <RiDeleteBin7Line size={18} />
                              </button>
                            </div>
                          </li>


                        ))}
                      </ul>


                    )}
                    <div className="flex w-[100%] gap-10 items-center ">
                      <span>total {total}</span>
                      <div title='checkout'>
                        <Link to='/paynow' className='whitespace-nowrap'>Checkout to Proceed</Link>
                      </div>
                    </div>
                    {cart.length !== 0 && (
                      <button className="bg-[crimson]  p-2 w-[100%] text-white rounded shadow flex items-center justify-center" onClick={deleteAll}>
                        <p>Clear All</p>
                      </button>
                    )}

                  </div>

                )}
              </>

            )}





          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
