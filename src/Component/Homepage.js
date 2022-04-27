import React, { useState,useEffect } from 'react'
import './Pooling.css'
import { db} from "../Firebase/FirebaseCofig";
import Cookies from "universal-cookie";
import { useNavigate } from 'react-router-dom';
import {collection,getDocs, setDoc,doc,updateDoc, increment ,arrayUnion } from 'firebase/firestore';
import { async } from '@firebase/util';
function Homepage() {
  const [productDetails , setproductDetails] = useState([]);
  const [Review , setReview] = useState([]);
  const [PoolID , setPoolID] = useState('');
  const [ReviewShow , setReviewShow] = useState(true);
  const [flag , setflag] = useState(0);
  const [Id , setId]  = useState('');
  const navigate = useNavigate();
  const goToCart = () => navigate('/Login/HomePage/Cart');
  const goToAdd = () => navigate('/Login/HomePage/AddProduct');
  const goToLogin= () => navigate('/Login');
  const getProduct = async () => {
    setproductDetails([]);
    const usercollectionRef = collection(db, "Product")
    const data = await getDocs(usercollectionRef);
    console.log(data);
    setproductDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };  
  const AddproductToYourCart =async(ID)=>{
    const washingtonRef = doc(db, "cartUsers", Id);
         await updateDoc(washingtonRef, {
          cart: arrayUnion(ID),
       }).then(()=>{ 
       alert("product Added Successfully")
        })
  }
   useEffect(() => {  
    const cookies = new Cookies();
    console.log(cookies.get('Id'));
    const id = cookies.get('Id');
    setId(id);
    getProduct();
  }, [flag]);
  return (
    <>
      <div className="languages">
      <button style={{height:"40px"}} onClick={()=>{goToCart()}}>GoTo Your Cart</button>
      <button style={{height:"40px"}} onClick={()=>{goToAdd()}}>Add Product</button>
      <button style={{height:"40px"}} onClick={()=>{goToLogin()}}>LogOut</button>
      <h2>Product List</h2>
    {productDetails.map((Pool, i) => {
            return (
                <div key={i} className="language">             
                    <h3>{Pool.id}</h3><br />
                    <img src={Pool.url} alt={Pool.id} />
                    <p>Rating -{Pool.rating==0?0:Pool.rating/5}</p> <button onClick={()=>{setReview(Pool.Review);setPoolID(Pool.id);setReviewShow(false);}}> {Pool.Review.length} - Review</button>
                    <br />  <button onClick={()=>{AddproductToYourCart(Pool.id)}}>Add Your Cart</button>
                  <div hidden={ReviewShow || Pool.id!=PoolID} >
                  {Review.map((Pool, i) => {
            return (
                <div key={i} className="language">
                  <h4>Review</h4>             
                    <p>{Pool}</p> 
                    <br />  <button onClick={()=>{setReviewShow(true)}}>Close</button>
                </div>
                   );
                  })}
                  </div>
                </div>
                   );
                  })}
    </div>
    </>
  )
}

export default Homepage