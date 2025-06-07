import React, { useState, useEffect } from 'react';
import WalletConnectButton from './components/WalletConnectButton';
import CriminalRecordSystem from './components/CriminalRecordSystem'; 
import SignIn from "./components/SignIn"
import Navbar from './components/Navbar';
const App = () => {
  const [account, setAccount] = useState(null);
  const [onConnect, setOnConnect] = useState(false)
 const [user, setUser] = useState("")
   useEffect(() => {
     let x = localStorage.getItem("user") 
     if (x) {
       setUser(x)
     }
   }, [])
   useEffect(() => {
     
   if(user !="" && account){
    setOnConnect(true)
   }
   }, [account, user])
   
  return (<>
      <Navbar />
    <div className="bg-[#111827] text-white min-h-screen">
      {(!onConnect )? (
      <>
        <SignIn/>
        <WalletConnectButton onConnect={setAccount} />
      </>
      ) : (
        <CriminalRecordSystem userAddress={account} />
      )}  
    </div>
      </>
  );
};

export default App;
