"use client";
import React, { useState, useEffect } from "react";
import { deleteProduct, fetchProducts } from "../core/productLogic";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../core/firebase";


export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    

    const productRef = collection(db, "Products");
    const unsubcribe = onSnapshot(productRef, (productSnapshot) => {
      const temp = productSnapshot.docs.map((product) => ({
        ...product.data(),
        id: product.id,
      }));
      setProducts(temp);
    });

    return () => unsubcribe();
  }, []);

  const handleFetch = async () => {
    const result = await fetchProducts();
    const temp = result.map((product) => ({
      ...product.data(),
      id: product.id,
    }));
    setProducts(temp);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Product List
        </h1>

        

        {products.length === 0 ? (
          <p className="text-center text-gray-500">
            No products yet. Click above to load.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-100 shadow-md rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="flex flex-col space-y-2">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {product.name}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Category: {product.category}
                  </p>

                  <div className="flex justify-between items-center mt-3">
                    <p className="text-lg font-medium text-green-600">
                      ₹{product.price}
                    </p>
                    {product.discount > 0 && (
                      <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-md">
                        -{product.discount}%
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mt-2">
                    Quantity:{" "}
                    <span className="font-semibold">{product.quantity}</span>
                  </p>
                  <button
                    onClick={async (event) => {
                      await deleteProduct(product.id, product.price);
                      handleFetch();
                    }}
                    className="bg-red-600 p-4 rounded-2xl"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}