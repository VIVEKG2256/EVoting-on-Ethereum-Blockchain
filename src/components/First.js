import Header from "./Header";
import {Link} from  'react-router-dom';
import './first.css';
import './inputfield.css';
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import emailjs from "emailjs-com";

const contractABI = require("./abi.json");
const YOUR_CONTRACT_ADDRESS = "0xc6ac99d26e196E94f0f8eCC814Aa7086031b46d4";


function First(){
    const [userID, setUserID] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [gymkhana,setGymkhana] = useState('');
    const [cultural,setCultural] = useState('');
    const [sports,setSports] = useState('');
    const [technical,setTechnical] = useState('');
    const [hostel,setHostel] = useState('');
    const [student,setStudent] = useState('');

    const [cgpaG,setCgpaG] = useState('');
    const [nameG,setNameG] = useState('');
    const [ageG,setAgeG] = useState('');

    const [cgpaC,setCgpaC] = useState('');
    const [nameC,setNameC] = useState('');
    const [ageC,setAgeC] = useState('');

    const [cgpaS,setCgpaS] = useState('');
    const [nameS,setNameS] = useState('');
    const [ageS,setAgeS] = useState('');

    const [cgpaT,setCgpaT] = useState('');
    const [nameT,setNameT] = useState('');
    const [ageT,setAgeT] = useState('');

    const [cgpaH,setCgpaH] = useState('');
    const [nameH,setNameH] = useState('');
    const [ageH,setAgeH] = useState('');

    const [cgpaSt,setCgpaSt] = useState('');
    const [nameSt,setNameSt] = useState('');
    const [ageSt,setAgeSt] = useState('');



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


    const createVoter = async () => {
        await getContract().createVoter(userID);
        let voterID = await getContract().hashCode(userID);
        alert(voterID);
        emailjs.send('service_hr697re','template_x8lj8jb',{userID,voterID},'XiLbXP9F2cQe6wLaw')
        .then(function(response) {
            alert("success");
            console.log('SUCCESS!', response.status, response.text)
         }, function(error) {
            alert("failed");
            console.log('FAILED...', error);
         });
    };

    const start = async () => {
         await getContract().setElectionTime(startTime,endTime);
    }

    const createGymkhanaCandidate = async () => {
        await getContract().createGymkhana(gymkhana,nameG,ageG,parseInt(cgpaG*100));
    }

    const createCulturalCandidate = async () => {
        await getContract().createCultural(cultural,nameC,ageC,parseInt(cgpaC*100));
    }

    const createSportsCandidate = async () => {
        await getContract().createSports(sports,nameS,ageS,parseInt(cgpaS*100));
    }

    const createTechnicalCandidate = async () => {
        await getContract().createTechnical(technical,nameT,ageT,parseInt(cgpaT*100));
    }

    const createHostelCandidate = async () => {
        await getContract().createHostel(hostel,nameH,ageH,parseInt(cgpaH*100));
    }

    const createStudentCandidate = async () => {
        await getContract().createStudent(student,nameSt,ageSt,parseInt(cgpaSt*100));
    }

    return(
        <div className="pParentDivFirst">
        <>
       <div className="first">
       <div ><Header/></div>
         <div><h3>Create Voter</h3>
         <div className="createVoter">
         
            <input className="p" placeholder="UserId" onChange = {(e) => setUserID(e.target.value)} value = {userID} ></input>
            <button className="p" onClick={createVoter} >Create Voter</button>
        
         </div>
         </div>

        <div > <h3>Set Election Time </h3>
        <div className="setElectionTime">
            <input className="p" placeholder="StartTime" onChange = {(e) => setStartTime(e.target.value)} value = {startTime} ></input>
            <input className="p" placeholder="EndTime" onChange = {(e) => setEndTime(e.target.value)} value = {endTime} ></input>
            <button className="p" onClick={start}>SetTime</button>
         </div>
        </div>
         

         <div>
            <h3>Create Election Candidate </h3>
         <div className="candidate">
          <div>
                <input className="p" placeholder="Gymkhana" onChange = {(e) => setGymkhana(e.target.value)} value = {gymkhana} ></input>
                <input className="p" placeholder="Name" onChange = {(e) => setNameG(e.target.value)} value={nameG}></input>
                <input className="p" placeholder="AGE" onChange = {(e) => setAgeG(e.target.value)} value={ageG}></input>
                <input className="p" placeholder="CGPA" onChange ={(e) => setCgpaG(e.target.value)} value={cgpaG}></input>
                <button className="pq" onClick={createGymkhanaCandidate}>CreateGymkhanaCandidate</button>
            </div>
            <div>
                <input className="p" placeholder="Cultural" onChange = {(e) => setCultural(e.target.value)} value = {cultural} ></input>
                <input className="p" placeholder="Name" onChange = {(e) => setNameC(e.target.value)} value={nameC}></input>
                <input className="p" placeholder="AGE" onChange = {(e) => setAgeC(e.target.value)} value={ageC}></input>
                <input className="p" placeholder="CGPA" onChange ={(e) => setCgpaC(e.target.value)} value={cgpaC}></input>
                <button className="pq" onClick={createCulturalCandidate}>CreateCulturalCandidate</button>
            </div>
            <div>
                <input className="p" placeholder="Sports" onChange = {(e) => setSports(e.target.value)} value = {sports} ></input>
                <input className="p" placeholder="Name" onChange = {(e) => setNameS(e.target.value)} value={nameS}></input>
                <input className="p" placeholder="AGE" onChange = {(e) => setAgeS(e.target.value)} value={ageS}></input>
                <input className="p" placeholder="CGPA" onChange ={(e) => setCgpaS(e.target.value)} value={cgpaS}></input>
                <button className="pq" onClick={createSportsCandidate}>CreateSportCandidate</button>
            </div>
            <div>
                <input className="p" placeholder="Technical" onChange = {(e) => setTechnical(e.target.value)} value = {technical} ></input>
                <input className="p" placeholder="Name" onChange = {(e) => setNameT(e.target.value)} value={nameT}></input>
                <input className="p" placeholder="AGE" onChange = {(e) => setAgeT(e.target.value)} value={ageT}></input>
                <input className="p" placeholder="CGPA" onChange ={(e) => setCgpaT(e.target.value)} value={cgpaT}></input>
                <button className="pq" onClick={createTechnicalCandidate}>CreateTechnicalCandidate</button>
            </div>
            <div>
                <input className="p" placeholder="Hostel" onChange = {(e) => setHostel(e.target.value)} value = {hostel} ></input>
                <input className="p" placeholder="Name" onChange = {(e) => setNameH(e.target.value)} value={nameH}></input>
                <input className="p" placeholder="AGE" onChange = {(e) => setAgeH(e.target.value)} value={ageH}></input>
                <input className="p" placeholder="CGPA" onChange ={(e) => setCgpaH(e.target.value)} value={cgpaH}></input>
                <button className="pq" onClick={createHostelCandidate}>CreateHostelCandidate</button>
            </div>
            <div>
                <input className="p" placeholder="Student" onChange = {(e) => setStudent(e.target.value)} value = {student} ></input>
                <input className="p" placeholder="Name" onChange = {(e) => setNameSt(e.target.value)} value={nameSt}></input>
                <input className="p" placeholder="AGE" onChange = {(e) => setAgeSt(e.target.value)} value={ageSt}></input>
                <input className="p" placeholder="CGPA" onChange ={(e) => setCgpaSt(e.target.value)} value={cgpaSt}></input>
                <button className="pq" onClick={createStudentCandidate}>CreateStudentCandidate</button>
            </div>
         </div>

         </div>

        <div className="letsvote">
        <Link to="/vote" className='s'><button className="vbutton" >Let's Vote</button></Link>
        </div>
        <div className="winner">
        <Link to="/result" className='s'><button className="rbutton">Election Result</button></Link>
        </div>

       </div>
        <div>
        </div>
        <br></br>
        </>
        </div>
    );
}
export default First;