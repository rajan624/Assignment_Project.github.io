import React from 'react'
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();
  const goToLogin= () => navigate('/Login');
  const goToPooling = () => navigate('/Pooling');
  return (
    <>
     <div className="languages">
                <div  className="language">
                  <h2>: Assignment :</h2>
                    <button style={{padding:"2vw"}} onClick={()=> {goToLogin()}}>Go To Ecommerce</button><br /><br />
                     <button style={{padding:"2vw"}} onClick={()=>{goToPooling()}}>Go To Pooling Page</button>
                </div>       
    </div>
    </>
  )
}

export default Main