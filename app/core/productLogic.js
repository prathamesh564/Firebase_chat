"use client";
import { doc, setDoc, getDocs, collection, query, where, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

// Add a new product
export async function addProduct(product) {
  try {
    await setDoc(doc(db, "Products", product.id), product); // use db instead of database
  } catch (exception) {
    console.log(JSON.stringify(exception));
  }
}

// Fetch all products
export async function fetchProducts() {
  const productCollectionRef = collection(db, "Products");
  const q = query(productCollectionRef);
  const products = await getDocs(q);
  return products.docs;
}

// Delete product(s) by price
export async function deleteProduct(id, price) {
  const productCollectionRef = collection(db, "Products");
  const q = query(productCollectionRef, where("price", "==", price));
  const products = await getDocs(q);

  products.forEach(async (product) => {
    await deleteDoc(doc(db, "Products", product.id));
  });
}
