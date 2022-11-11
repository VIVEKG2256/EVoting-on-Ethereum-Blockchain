import './App.css';
import { useEffect,useState } from 'react';
import { ethers } from "ethers";
import First from './components/First';
import Second from './components/Second';

function App() {
  const [accountAddress,setAccountAddress]=useState("");
  const [admin,setAdmin]=useState("0xB8bE29f99e6A04E8EFD65efD54aa6c4DbF519f1D");
  useEffect( () => {
    connectwallet();
 },[]);
  
let connectwallet = async () => {
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
await provider.send("eth_requestAccounts", []);
const accountAddress1 = await signer.getAddress();
if(accountAddress1)
setAccountAddress(accountAddress1);

console.log(accountAddress1,"Signer Account Address");

};

  return (
     
    <>
     { accountAddress === admin ? <First/> : <Second/>}
    </>
  );
}

export default App;
