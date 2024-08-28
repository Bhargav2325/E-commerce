import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import {
  addToCart,
  removeSingleItem,
  removeToCart,
  emptyCart,
} from "../store/features/CartSlice";
import swal from "sweetalert";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const { carts } = useSelector((state) => state.allCart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const dispatch = useDispatch();

  // Add to cart
  const handleIncrement = (item) => {
    dispatch(addToCart(item));
  };

  // Remove from cart
  const handleDecrement = (item) => {
    dispatch(removeToCart(item));
    swal("", "Item removed From Your Cart", "success");
  };

  // Remove single item
  const handleSingleItem = (item) => {
    dispatch(removeSingleItem(item));
    swal("", "Item Removed", "success");
  };

  // Empty cart
  const emptyCarts = () => {
    dispatch(emptyCart());
    swal("", "Cart Emptied successfully", "success");
  };

  // Count total price and quantity
  const calculateTotals = () => {
    let price = 0;
    let quantity = 0;
    carts.forEach((item) => {
      price += item.price * item.qunty;
      quantity += item.qunty;
    });
    setTotalPrice(price);
    setTotalQuantity(quantity);
  };

  useEffect(() => {
    calculateTotals();
  }, [carts]);
  //payment integration
  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51PsL3gIFeVije7VQNRl0eVKk1tj30vkMnV0NUPXC8JvRSFpeRpYfFON1IDwqujgHChKQFdyj09L1zMddgTXJngPm00iJYvTJiH"
    );
    const body = {
      products: carts,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "http://localhost:8000/api/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );
    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-5">
      <div className="flex justify-between items-center text-white bg-black rounded-md px-4 py-2">
        <h1 className="text-[20px]">
          Cart Calculation{carts.length > 0 ? `(${carts.length})` : ""}
        </h1>
        <div>
          {carts.length > 0 ? (
            <button
              onClick={emptyCarts}
              className="px-5 py-2 bg-red-500 flex justify-center items-center rounded-[10px] text-[15px] text-white"
            >
              <MdDelete size={20} />
              Empty Cart
            </button>
          ) : (
            ""
          )}
        </div>
        <div>
          {carts.length > 0 ? (
            <button
              onClick={makePayment}
              className="px-2 py-2 bg-blue-500 rounded-[10px] text-white"
            >
              Check Out
            </button>
          ) : (
            ""
          )}
        </div>
      </div>

      {carts.length === 0 ? (
        <div className="flex flex-col justify-center bg-slate-100 shadow-lg text-[#d5d6d8] py-12 px-4 items-center">
          <a href="/">
            <FaShoppingCart size={50} />
          </a>
          <h2 className="text-[20px] cursor-default">Your Cart Is Empty</h2>
        </div>
      ) : (
        carts.map((data) => (
          <div
            key={data.id}
            className="flex items-center p-4 border-b border-gray-200 rounded-md"
          >
            <div className="flex justify-center items-center mx-4">
              <button
                onClick={() => handleDecrement(data.id)}
                className="p-2 ml-4 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                <MdDelete size={20} />
              </button>
            </div>
            <div className="flex items-center justify-center w-16 h-16 rounded-md bg-gray-100 mx-2">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-medium text-gray-800">
                {data.title}
              </h2>
              <div className="text-gray-600">₹ {data.price}</div>
            </div>
            <div className="flex items-center justify-between  pr-5 text-start space-x-2">
              <button
                onClick={
                  data.qunty <= 1
                    ? () => handleDecrement(data.id)
                    : () => handleSingleItem(data)
                }
                className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
              >
                -
              </button>
              <input
                type="text"
                className="text-center text-sm w-8"
                disabled
                value={data.qunty}
              />
              <button
                onClick={() => handleIncrement(data)}
                className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
              >
                +
              </button>
            </div>
            <div className="flex justify-end items-center">
              <div className="text-gray-600 mx-4">
                ₹ {Math.round(data.qunty * data.price)}
              </div>
            </div>
          </div>
        ))
      )}
      <div className="flex justify-end gap-2 items-center mt-4">
        <div className="flex justify-between items-center font-bold">
          <h3>
            {" "}
            Items In Cart :{" "}
            <span className="text-red-500">{totalQuantity}</span>
          </h3>
        </div>
        <div className="flex justify-between items-center font-bold">
          <h3>
            Total Price :{" "}
            <span className="text-red-500"> ₹{Math.round(totalPrice)}</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Cart;
