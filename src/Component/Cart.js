import React, { useState,useEffect } from 'react'
import './Pooling.css'
import { db} from "../Firebase/FirebaseCofig";
import Cookies from "universal-cookie";
import { useNavigate } from 'react-router-dom';
import {collection,getDocs,getDoc, setDoc,doc,updateDoc, increment ,arrayUnion } from 'firebase/firestore';
import { async } from '@firebase/util';
function Cart() {
    const [productDetails , setproductDetails] = useState([]);
  const [Review , setReview] = useState([]);
  const [ReviewShow , setReviewShow] = useState(true);
  const [RatingShow , setRatingShow] = useState(true);
  const [ReviewUser , setReviewUser] = useState('');
  const [RatingUser , setRatingUser] = useState(0);
  const [flag , setflag] = useState(0);
  const [Id , setId]  = useState('');
  const navigate = useNavigate();
  const goToCart = () => navigate('/Login/HomePage');
    const getProductCart = async (id) => {
        
        const data =   doc(db,   `cartUsers/${id}`);
            const docSnap = await getDoc(data);
            if (docSnap.exists()) {
              console.log("Document data:", docSnap.data());
              setReview(docSnap.data().cart);
              for(var i =0;i<docSnap.data().cart.length;i++){
                const data1 =   doc(db,   `Product/${docSnap.data().cart[i]}`);
                const docSnap1 = await getDoc(data1);
                if (docSnap1.exists()) {
                    setproductDetails([]);
                  console.log("Document data:", docSnap1.data());
                  setproductDetails((productDetails) => productDetails.concat(docSnap1.data()));   
                } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
                }
              }
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
      };  
      useEffect(() => {  
        const cookies = new Cookies();
        console.log(cookies.get('Id'));
        const id = cookies.get('Id');
        setId(id);
        getProductCart(id);
      }, [flag]);
      const AddReviewAndRating =async(type ,i)=>{
          
      if(type=="Review"){
          if(ReviewUser==''){
            alert("Please write Review");
          }else{
        const washingtonRef = doc(db, "Product", Review[i]);
        await updateDoc(washingtonRef, {
            Review: arrayUnion(ReviewUser),
      }).then(()=>{ 
       alert("Review Added successfully");
       setReviewShow(true);
       })
    }
      }else if(type=="Rating"){
        let  RatingUserAsInt = parseInt(RatingUser, 10);  
        if(RatingUser==0){
            alert("Please write Rating");
          }else{
        const washingtonRef = doc(db, "Product", Review[i]);
        await updateDoc(washingtonRef, {
            rating:increment(RatingUserAsInt),
      }).then(()=>{ 
        alert("Rating Added successfully");
        setRatingShow(true);
       })
    }
            
      }
      }
  return (
    <>
    <div className="languages">
      <button style={{height:"40px"}} onClick={()=>{goToCart()}}>GoTo HomePage</button>
      <h2>Cart List</h2>
    {productDetails.map((Pool, i) => {
            return (
                <div key={i} className="language"> 
                <p>{Pool.name}</p>            
                    <img src={Pool.url} alt={Pool.id} /><br />
                  <button onClick={()=>{setReviewShow(false);}}> Add Review</button>
                 <button onClick={()=>{setRatingShow(false);}}> Add Rating</button>
                    <br /> {/*  <button onClick={()=>{AddproductToYourCart(Pool.id)}}>Add Your Cart</button> */}
                <div hidden={ReviewShow}>
                    <label>Review : </label>
                <input type="text" placeholder={"Enter your Review"}
                        onChange={(e) => { setReviewUser(e.target.value) }}></input><br />
                         <button onClick={()=>{setReviewShow(true);}}>Close</button>
                         <button onClick={()=>{ AddReviewAndRating("Review",i);}}>Submit</button>
                </div>
                <div hidden={RatingShow}>
                    <label>Enter Your Rating : </label>
                <input type="number" max='5' min="0" placeholder={"Enter your Rating"}
                        onChange={(e) => { setRatingUser(e.target.value) }}></input><br />
                             <button onClick={()=>{setRatingShow(true);}}>Close</button>
                             <button onClick={()=>{AddReviewAndRating("Rating",i);}}>Submit</button>
                </div>
                </div>
                   );
                  })}
    </div>
    </>
  )
}

export default Cart