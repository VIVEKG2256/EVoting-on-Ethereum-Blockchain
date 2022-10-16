import Header from "./Header";
import {Link} from  'react-router-dom';
import './first.css';
import './second.css';
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const contractABI = require("./abi.json");
const YOUR_CONTRACT_ADDRESS = "0xc6ac99d26e196E94f0f8eCC814Aa7086031b46d4";

function Result () {

    const [gymkhana,setGymkhana] = useState('');
    const [cultural,setCultural] = useState('');
    const [sports,setSports] = useState('');
    const [technical,setTechnical] = useState('');
    const [hostel,setHostel] = useState('');
    const [student,setStudent] = useState('');
    const [t,setT] = useState('');

    useEffect( () => {
        connectwallet();
     },[]);
      
    let connectwallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    await provider.send("eth_requestAccounts", [])
    const accountAddress = await signer.getAddress()
    console.log(accountAddress,"Signer Account Address");
    }; 

    let getContract =  () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
    
        let contract = new ethers.Contract(
          YOUR_CONTRACT_ADDRESS,
          contractABI,
          signer
        );
        return contract;
      };

    const Countvotes = async () => {
       await getContract().countVotes()
       //alert("counting Done")
    }

    const gymkhanawinner = async () => {
       const ta = await getContract().viewResultsOf(0);
       //alert(ta);
       setGymkhana(ta);
    }
    const culturalwinner = async () => {
        const tb = await getContract().viewResultsOf(1);
        //alert(tb);
        setCultural(tb);
     }
     const sportswinner = async () => {
        const tc = await getContract().viewResultsOf(2);
        //alert(tc);
        setSports(tc);
     }
     const technicalwinner = async () => {
         const td= await getContract().viewResultsOf(3);
        // alert(td);
         setTechnical(td);
      }
      const hostelwinner = async () => {
        const te= await getContract().viewResultsOf(4);
        //alert(te);
        setHostel(te);
     }
     const studentwinner = async () => {
         const tf= await getContract().viewResultsOf(5);
         //alert(tf);
         setStudent(tf);
      }

     

     useEffect(() => {
        Countvotes()
        gymkhanawinner()
        culturalwinner()
        sportswinner()
        technicalwinner()
        hostelwinner()
        studentwinner()
     },[]);
    
    return(
        <>
         <div>
            <div><Link to="/" className='s'><button >Home</button></Link></div>
            <div className="sheader"><Header/></div>
        </div>
        <br></br>
        <div className="result">
         <table>
            <tr className="thr">
             <td><b>Posts</b></td>
             <td><b>Winner Id</b></td>
            </tr>
            <tr>
                <td>GymkhanaCouncil</td>
                <td>{gymkhana}</td>
            </tr>
            <tr>
                <td>CulturalBoard</td>
                <td>{cultural}</td>
            </tr>
            <tr>
                <td>SportsBoard</td>
                <td>{sports}</td>
            </tr>
            <tr>
                <td>TechnicalBoard</td>
                <td>{technical}</td>
            </tr>
            <tr>
                <td>HostelAffairsBoard</td>
                <td>{hostel}</td>
            </tr>
            <tr>
                <td>StudentWelfareBoard</td>
                <td>{student}</td>
            </tr>
         </table>
       </div>
        </>
    );
}
export default Result;