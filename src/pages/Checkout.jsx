import { useState, useEffect } from "react";
import { useCartContext } from "../pages/context/cartprovider";
import { loadStripe } from "@stripe/stripe-js";

const Checkout = () => {
  const { cart, setCart, clearCart } = useCartContext();

  const [value, setValue] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  // Total in USD as number
  const total = Number(
    cart.reduce((curr, acc) => curr + acc.qty * acc.price, 0).toFixed(2)
  );

  // Handle input changes
  const handleInput = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  // Increase quantity
  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item._id === id ? { ...item, qty: item.qty + 1 } : item
    );
    setCart(updated);
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    const updated = cart.map((item) =>
      item._id === id ? { ...item, qty: item.qty - 1 } : item
    );
    setCart(updated);
  };

  // Stripe checkout
 const placeOrders = async () => {
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        products: cart,
        amount: Math.round(total * 100), // convert USD to cents
        value,
      }),
    });

    const data = await res.json();

    if (data.url) {
      // Redirect user to Stripe Checkout page
      window.location.href = data.url;
    } else {
      console.error("No checkout URL returned from server:", data);
      alert("Checkout failed. Please try again.");
    }
  } catch (err) {
    console.error("Checkout error:", err);
    alert("Checkout failed. Please try again.");
  }
};


  return (
    <div className="checkout-container p-8 bg-white rounded-md shadow-sm container">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Billing Details */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Billing Details
          </h3>
          <form className="space-y-4">
            {["fullName", "email", "address", "city", "zip"].map((field) => (
              <div key={field}>
                <label className="block text-sm text-gray-600">
                  {field === "fullName"
                    ? "Full Name"
                    : field === "zip"
                    ? "Zip Code"
                    : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={value[field]}
                  onChange={handleInput}
                  placeholder={
                    field === "fullName"
                      ? "John Doe"
                      : field === "email"
                      ? "john@example.com"
                      : field === "address"
                      ? "123 Main Street"
                      : field === "city"
                      ? "New York"
                      : "10001"
                  }
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            ))}
          </form>
        </div>

        {/* Order Summary */}
        <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Order Summary
          </h3>

          {cart.map((item) => (
            <div key={item._id} className="space-y-3 text-gray-700 mb-4">
              <div className="flex justify-between items-center">
                <span>{item.name}</span>
                <span className="font-medium">${item.price.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => decreaseQty(item._id)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                  >
                    -
                  </button>
                  <span className="px-3 font-semibold">{item.qty}</span>
                  <button
                    type="button"
                    onClick={() => increaseQty(item._id)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                  >
                    +
                  </button>
                </div>
                <span className="text-gray-800 font-medium">
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </div>
              <hr className="my-3" />
            </div>
          ))}

          <div className="flex justify-between font-semibold text-gray-800 text-lg border-t pt-3">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            onClick={placeOrders}
            className="mt-6 w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
