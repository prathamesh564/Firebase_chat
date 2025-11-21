import { database } from "./firebase";
import {doc,setDoc,getDocs,collection,query,where,deleteDoc, getDoc} from 'firebase/firestore'

export async function addProduct(product){
    try{
        await setDoc(doc(database,"Products",product.id),product);
    }catch(exception){
        console.log(JSON.stringify(exception))
    }
}

export async function fetchProducts(){
   
    const productCollectionRef = collection(database,"Products")
    
    const q = query(productCollectionRef);

    const products = await getDocs(q);
    
    
    return products.docs;
}

export async function deleteProduct(id,price){


const productCollectionRef = collection(database,"Products")
  
   
    const q = query(productCollectionRef,where('price','==',price));
    const products = await getDocs(q);
    products.forEach(async (product)=> {
        await deleteDoc(doc(database,"Products",product.id))
    })
   
    

}   