import React,{useState} from 'react'
import { getDownloadURL, uploadBytesResumable} from '@firebase/storage';
import { ref, deleteObject } from "firebase/storage";
import { db ,storage} from "../Firebase/FirebaseCofig";
import { useNavigate } from 'react-router-dom';
import {collection, getDocs,setDoc,doc,getDoc,} from 'firebase/firestore';
function AddProduct() {
    const [image1, setImage1] = useState(null);
    const [file1 , setfile1] = useState(null);
    const[url1 , seturl1] = useState("");
    const navigate = useNavigate();
    const goToHome = () => navigate('/Login/HomePage');
    const [progress1 , setprogress1] = useState(0);
    const [Name , setName] = useState('');
    const uploadFiles1 = (file)=>{
        if(!file) return;
        const storageref = ref(storage, `/files/${file.name}`);
        const  uploadTask = uploadBytesResumable(storageref,file);
        uploadTask.on("state_changed",(snapshot)=>{
           const prog = Math.round((snapshot.bytesTransferred/snapshot.totalBytes*100));
           setprogress1(prog);
        },(err)=>console.log(err),()=>{
           getDownloadURL(uploadTask.snapshot.ref).then(url =>console.log(seturl1(url)));
        });
     };
     const onImageChange1 = (event) => {
      if (event.target.files && event.target.files[0]) {
        setImage1(URL.createObjectURL(event.target.files[0]));
      }
       setfile1( event.target.files[0]);
     }
     const deleteImage1 = (file) =>{
        const desertRef = ref(storage, file);
       deleteObject(desertRef).then(() => {
         seturl1("");
         alert("deleted succefully")
       }).catch((error) => {
         console.log(error);
       }); 
       };
       const AddProduct =async()=>{
        const docData = {   
            Review:[],
            name:Name,
            rating:0,
            url:url1
        }
         await setDoc(doc(db, `Product`,Name),docData).then(()=>{       
         alert("data updated successfully");
         seturl1('');
         setprogress1(0);
         setName('');
         setImage1(null);
         setfile1(null);
       });
       }
  return (
    <>
        <div className="languages">
   
                <div  className="language">  
                <h2>Add Your Product</h2><br />
                <label>Name : </label>
                <input type="text" placeholder={"Enter your Product Name"}
                        onChange={(e) => { setName(e.target.value) }}></input><br />
    <label >Product Image: </label>
    <input type="file"  onChange={onImageChange1} />
    <span  >uploaded {progress1}%</span>
        <button onClick={()=> uploadFiles1(file1)}>upload</button>
        <button  onClick={()=> deleteImage1(url1)}>Delete</button>
        <img  src={url1} alt=""width="193" height="130" /><br /><br />
        <button onClick={()=>{AddProduct()}}>Submit</button>
        <button onClick={()=>{goToHome()}}>Go To HomePage</button>
        </div>
        </div>
    </>
  )
}

export default AddProduct