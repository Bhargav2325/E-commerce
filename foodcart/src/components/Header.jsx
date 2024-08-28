import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = () => {
  const { carts } = useSelector((state) => state.allCart);

  return (
    <div className="bg-black table-fixed">
      <div className="max-w-7xl mx-auto relative">
        <div className="flex justify-between items-center z-10 bg-black text-white py-3">
          <a href="/">
            <h3 className="text-2xl">Foodlover</h3>
          </a>
          <a href="/cart" className="relative">
            <FaShoppingCart size={40} />
            {carts.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {carts.length}
              </span>
            )}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
