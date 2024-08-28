import React from "react";
import { useState, useEffect } from "react";
import { addToCart } from "../store/features/CartSlice";
import { useDispatch } from "react-redux";
import swal from 'sweetalert';
const Home = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  // Fetch data from the API
  useEffect(() => {
    fetch("https://66c86f9b8a477f50dc2e08fb.mockapi.io/cart/foodStore")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


  // add to cart
  const send = (e) => {
    dispatch(addToCart(e));
    swal("", "Item added in Your Cart", "success");
  };
  return (
    <>
      <div className="text-white">
        <div className="max-w-[1500px] px-4 mx-auto relative">
          <div className="py-5 text-5xl text-center">
            <span>Welcome To Our Restaurants</span>
          </div>
          <div className="max-w-7xl mx-auto">
            <div className="gap-8 grid grid-cols-3 mb-5">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="max-w-sm mx-auto rounded-[20px] bg-[#e0dfdf] text-base mt-5 overflow-hidden shadow-lg"
                >
                  <img
                    className="w-full text-sm h-[350px] rounded-b-lg shadow-xl"
                    src={product.image}
                    alt={product.title}
                  />
                  <div className="px-6 py-4 text-black">
                    <div className="font-bold text-xl my-2 flex justify-between items-center">
                      <h3>{product.title}</h3>
                      <div className="text-sm bg-[#3cac40] text-white px-3 cursor-pointer py-2 rounded-[20px]">
                        {product.rating.rate}&nbsp;★
                      </div>
                    </div>
                    <div className="text-[10px] border-[#37382297] border-b-2 border-dashed"></div>
                    <p className="text-black break-all my-2 text-center">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Natus beatae harum eum. Adipisci distinctio esse dicta
                      omnis natus necessitatibus non veritatis illum amet eaque
                      porro perspiciatis, voluptate officia beatae itaque.
                    </p>
                    <div className="font-bold mt-2 text-xl flex justify-between items-center text-center mb-2">
                      <h5>{product.category}</h5>
                      <span>₹ {product.price}</span>
                    </div>
                    <div className="text-[10px] border-[#37382297] border-b-2 border-dashed"></div>
                    <div className="flex justify-center items-center mt-3">
                      <button
                        onClick={() => send(product)}
                        className="bg-red-500 text-white px-2 py-2 rounded-[10px] hover:bg-red-600"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
