import React ,{useEffect, useState} from 'react'
import './Pooling.css'
import { db} from "../Firebase/FirebaseCofig";
import {collection,getDocs, setDoc,doc,updateDoc, increment } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
function Pooling() {
    const [Open, setOpen] = useState(true);
    const [Question , setQuestion] = useState('');
    const [option1 , setoption1] = useState('');
    const [flag , setflag] = useState(0);
    const [option2, setoption2] = useState('');
    const [PoolDetails, setPoolDetails] = useState([]);
    const navigate = useNavigate();
    const goTomain = () => navigate('/');
    const updateOnFirebase=async()=>{
      if(Question==''||option1==''||option2==""){
        alert("Please fill all the Feild")
      }else{
        let date = new Date();
        let Id =  (date.toString().replaceAll(" ","")).substring(0,20);
       const docData = {   
         Question:Question,
         A:0,
         B:0,
         option1:option1,
         option2:option2
       };
            await setDoc(doc(db, "Polling", Id),docData).then(async()=>{
              alert("Poll Created successfully");
              document.getElementById("Poll-form").reset();
              });
            }
    }
    const handleClose = () => {
      setOpen(true);
      };
      const handleOpen =  () => {  
        setOpen(false);
      };
      function submit(e) {
        e.preventDefault();
      }
      const getUsers = async () => {
        setPoolDetails([]);
        const usercollectionRef = collection(db, "Polling")
        const data = await getDocs(usercollectionRef);
        console.log(data);
        setPoolDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      useEffect(() => {   
        getUsers();
      }, [flag]);
      const update=async(Type,Id)=>{
        const washingtonRef = doc(db, "Polling", Id);
        if(Type=='A'){
          await updateDoc(washingtonRef, {
            A:increment(1)
        });
        }else if(Type=='B'){
        await updateDoc(washingtonRef, {
         B:increment(1)
      });
      }
    }
  return (
    <>
    <h1>Get People's Opinion</h1>
    <div className="languages">
      <button style={{height:"4vw"}}  onClick={handleOpen}>Add A Poll</button><br />
      <button style={{height:"4vw"}} onClick={()=>{goTomain()}}>Goto Main</button>
        <div hidden={Open}>
          <h3  style={{ textAlign: 'center' }}>Create a Poll</h3>
          <form id="Poll-form" onSubmit={submit} style={{ marginLeft: '10%' }}>
            <label>Question : </label>
            <textarea cols="30" rows="5" type="text" onChange={(event) => { setQuestion(event.target.value); }} />
            <br /><br />
            <label>Options 1 : </label>
            <textarea cols="30" rows="5" type="text" onChange={(event) => { setoption1(event.target.value); }} />
            <br /><br />
            <label>Options 2 : </label>
            <textarea cols="30" rows="5" type="text" onChange={(event) => { setoption2(event.target.value); }} />
            </form>
            <button type="submit" onClick={()=>{updateOnFirebase();setflag(flag+1);handleClose();}} >Submit</button>&emsp;&emsp;
            <button onClick={handleClose}  >Close Form</button>
        </div>
    {PoolDetails.map((Pool, i) => {
            return (
                <div key={i} className="language">
                  <h2>: Poll {i+1} :</h2>
                    <h3>Question : {Pool.Question}?</h3><br />
                    <h5 style={{ marginLeft: '-15vw' }}>Options : </h5> <br />
                    <p style={{display:"inline"}}>A : {Pool.option1} -{Pool.A==0?0:((Pool.A*100)/(Pool.A+Pool.B)).toFixed(2)} %</p> <button onClick={()=>{update("A",Pool.id);setflag(flag+1);}}>Add Your Opnion</button><br /><br />
                    <p style={{display:"inline"}}>B : {Pool.option2} - {Pool.B==0?0:((Pool.B*100)/(Pool.A+Pool.B)).toFixed(2)}%</p>  <button onClick={()=>{update("B",Pool.id);setflag(flag+1);}}>Add Your Opnion</button>
                </div>
                   );
                  })}
    </div>

</>
  )
}

export default Pooling