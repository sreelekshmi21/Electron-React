import React, {useState, useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
 
export default function InBox(){

  const [user, setUser] = useState({})
  const [counter, setCounter] = useState(0)
  const location = useLocation();

  useEffect(() => {
    console.log('#INBOX USERINFO',location?.state)
    // if(userInfo) getUserInbox()
    if(location?.state) setUser(location?.state)

    // ipcRenderer.on('INITIALIZE_COUNTER', (event, count) => {
    //   setCounter(count)
    // });
   
  }, [])

  const getNewMail = () =>{
    window.api.onNewMail('new')
  }

  const handleDecrement = () =>{
    console.log('#handleDecrement')
  }

  const handleIncrement = () =>{
    console.log('#handleIncrement')
  }

    return (
      <>
      <div class="outer-container">
        <div class="sidebar">
          <h4>TAO ONLINE</h4>
          <button onClick={getNewMail}>NEW MAIL</button>
          <br/>
          <br />
          <br />
          <h4>TAO OFFLINE</h4>
        </div>
        <div class="content">
        <h1>NO MESSAGES {user?.email}</h1>
         <div>
          <div><button type="button" onClick={handleDecrement}>DECREMENT</button></div>
          <h2>COUNTER: {counter}</h2>
          <div><button type="button"  onClick={handleIncrement}>INCREMENT</button></div>
         </div>
        </div>
       
       
        
      </div>
      <div><Link to="/">EXIT</Link></div>
      </>
    );
  
}