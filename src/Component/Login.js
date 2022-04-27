import React, { useState } from 'react';
import {collection, getDocs,setDoc,updateDoc ,doc,getDoc, arrayUnion,} from 'firebase/firestore';
import { db} from "../Firebase/FirebaseCofig";
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
const Login = () => {
    // Inputs
    const [mynumber, setnumber] = useState("");
    const [pass, setpass] = useState('');
    const navigate = useNavigate();
    const goToHomePage = () => navigate('/Login/HomePage');
    const goTomain = () => navigate('/');
    // Sent OTP
  const signUp = async()=>{
    if(mynumber==''||pass==''){
        alert("Please fill number and password");
      }else if(mynumber.length>10){
        alert("please check your number");
      }else{
        const washingtonRef = doc(db, "users", "loginUsers");
         await updateDoc(washingtonRef, {
            mobileNo: arrayUnion(mynumber),
           password: arrayUnion(pass),
       }).then(()=>{ 
        const cookies = new Cookies();
        cookies.set("Id", mynumber, {
          path: "/",
        });
        console.log(cookies.get("Id"));
        alert("Account Created successfully");
        goToHomePage();
        })
            }
  }
  const Login =async()=>{
    if(mynumber==''||pass==''){
        alert("Please fill number and password");
      }else if(mynumber.length>10){
        alert("please check your number");
      }else{
        const data =   doc(db,   `users/loginUsers`);
            const docSnap = await getDoc(data);
            if (docSnap.exists()) {
              console.log("Document data:", docSnap.data());
             var indexnumber =  docSnap.data().mobileNo.indexOf(mynumber);
             var indexpass =  docSnap.data().password.indexOf(pass);
             console.log(indexnumber);
             console.log(indexpass);
             console.log(pass);
             if(indexnumber==-1){
                 alert("Please sign up")
             }else if(indexnumber!=indexpass){
                 alert("please check your mobile no and password")
             }else if(indexnumber==indexpass){
              const cookies = new Cookies();
              cookies.set("Id", mynumber, {
                path: "/",
              });
              console.log(cookies.get("Id"));
               alert("successfully login");
               goToHomePage();
             }
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
            }
  }
  const Forget=async()=>{
    if(mynumber==''){
        alert("Please fill number");
      }else if(mynumber.length>10){
        alert("please check your number");
      }else{
        const data =   doc(db,   `users/loginUsers`);
            const docSnap = await getDoc(data);
            if (docSnap.exists()) {
              console.log("Document data:", docSnap.data());
             var indexnumber =  docSnap.data().mobileNo.indexOf(mynumber);
             var indexpass =  docSnap.data().password[indexnumber];
             if(indexnumber==-1){
                 alert("Please sign up")
             }else{
                 alert("Your Passwrod "+indexpass)
             }
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
            }
  }
  
    return (
        <div style={{ "marginTop": "200px" }}>
            <center>
                <div style={{ display:"block"}}>
                    <label>Mobile No. : </label>
                    <input value={mynumber} onChange={(e) => { 
                       setnumber(e.target.value) }}
                        placeholder="phone number" />
                </div>
                <br /><br />
                <div style={{ display:"block"}}>
                    <label>Password : </label>
                    <input type="password" placeholder={"Enter your Password"}
                        onChange={(e) => { setpass(e.target.value) }}></input>
                    <br /><br />
                    <button onClick={Login} style={{marginRight:"20px" , padding:"0.5vw"}} >Login</button> 
                    <button onClick={Forget} style={{marginRight:"20px" , padding:"0.5vw"}} >Forget password</button> 
                    <button onClick={signUp} style={{ padding:"0.5vw"}}>SignUp</button><br />
                    <button style={{margin:"0.5vw",padding:"0.5vw"}} onClick={()=>{goTomain()}}>Goto Main</button>
                </div>
            </center>
        </div>
    );
}
  
export default Login;