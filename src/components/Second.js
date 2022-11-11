import Header from "./Header";
import { Link } from "react-router-dom";
import "./second.css";
import "./button.css";
import "./inputfield.css";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { wait } from "@testing-library/user-event/dist/utils";

const contractABI = require("./abi.json");
const YOUR_CONTRACT_ADDRESS = "0xc6ac99d26e196E94f0f8eCC814Aa7086031b46d4";



function Second() {
  
  const [userID,setUserID]=useState("");
 
  const [ca,setCa]=useState([]);
  const [cb,setCb]=useState([]);
  const [cc,setCc]=useState([]);
  const [cd,setCd]=useState([]);
  const [ce,setCe]=useState([]);
  const [cf,setCf]=useState([]);
  const [candidateIDG,setCandidateIDG]=useState("");
  const [candidateIDC,setCandidateIDC]=useState("");
  const [candidateIDS,setCandidateIDS]=useState("");
  const [candidateIDT,setCandidateIDT]=useState("");
  const [candidateIDH,setCandidateIDH]=useState("");
  const [candidateIDST,setCandidateIDST]=useState("");

  useEffect(() => {
    connectwallet();
  }, []);

  let connectwallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    await provider.send("eth_requestAccounts", []);
    const accountAddress = await signer.getAddress();
    console.log(accountAddress, "Signer Account Address");
  };

  let getContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(
      YOUR_CONTRACT_ADDRESS,
      contractABI,
      signer
    );
    return contract;
  };

  const gymCandidate = async () =>{
    setCa(await getContract().gym());
    console.log(ca,"gymkhana");
  };

  const culCandidate = async () => {
    setCb(await getContract().cult());
    console.log(cb,"cultural");
  };
  
  const spoCandidate = async () => {
     setCc(await getContract().spo());
    console.log(cc,"sports");
  };

  const tecCandidate = async () => {
     setCd(await getContract().tec());
    console.log(cd,"technical");
  };

  const hosCandidate = async () => {
      setCe(await getContract().hos());
    console.log(ce,"hostel");
  };

  const stuCandidate = async () => {
      setCf(await getContract().stu());
    console.log(cf,"student");
  }

  useEffect(() => {
    gymCandidate()
    culCandidate()
    spoCandidate()
    tecCandidate()
    hosCandidate()
    stuCandidate()
  },[]);

  

  // useEffect(() => {
  //   console.log(ca,"Gymkhana Candidate")
  //   setCandidateIDG(ca[0])
  //   setCandidateIDC(cb[0])
  //   setCandidateIDS(cc[0])
  //   setCandidateIDT(cd[0])
  //   setCandidateIDH(ce[0])
  //   setCandidateIDST(cf[0])
  // },[])

 const voteGymkhana = async () => {
  alert(candidateIDG);
  await getContract().voteGymkhana(candidateIDG,userID);
  alert("done");
 }
 const voteCultural = async () => {
  alert(candidateIDC);
  await getContract().voteCultural(candidateIDC,userID);
  alert("done");
 }
 const voteSports = async () => {
  alert(candidateIDS);
  await getContract().voteSports(candidateIDS,userID);
  alert("done");
 }
 const voteTechnical = async () => {
  alert(candidateIDT);
  await getContract().voteTechnical(candidateIDT,userID);
  alert("done");
 }
 const voteHostel = async () => {
  alert(candidateIDH);
  await getContract().voteHostel(candidateIDH,userID);
  alert("done");
 }
 const voteStudent = async () => {
  alert(candidateIDST);
  await getContract().voteStudent(candidateIDST,userID);
  alert("done");
 }

  return (
    <div className="pParentDiv">
        <div>
            <div className='homebuttonDiv'><Link to="/"><button className="hbutton">Home</button></Link></div>
            <div className="sheader"><Header/></div>
        </div>
        <br></br>
        <div className="parentDiv">
        <table>
            <tr className="thr">
             <td><b>Posts</b></td>
             <td><b>Candidate Id</b></td>
             <td><b>VoterId</b></td>
            </tr>
            <tr>
              <td>Gymkhana Council</td>
              <td>
              <select className="p" onChange = {(e) => setCandidateIDG(e.target.value)}>
                      {ca.map((candidates) => (
                          <option  value={candidates}>{candidates}</option>
                      ))}
                </select>
              </td>
              <td>
              <input className="p" placeholder="VoterID" value={userID} onChange={(e) => setUserID(e.target.value)} />
              </td>
              <td>
              <button className="pr" onClick={voteGymkhana}>Vote</button>
              </td>
             </tr>

             <tr>
              <td>Cultural Board</td>
              <td>
              <select className="p" onChange = {(e) => setCandidateIDC(e.target.value)}>
                      {cb.map((candidates) => (
                          <option value={candidates}>{candidates}</option>
                      ))}
                </select>
              </td>
              <td>
              <input className="p" placeholder="VoterID" value={userID} onChange={(e) => setUserID(e.target.value)} />
              </td>
              <td>
              <button className="pr" onClick={voteCultural}>Vote</button>
              </td>
             </tr>


             <tr>
              <td>Sports Board</td>
              <td>
              <select className="p" onChange = {(e) => setCandidateIDS(e.target.value)}>
                      {cc.map((candidates) => (
                          <option value={candidates}>{candidates}</option>
                      ))}
                </select>
              </td>
              <td>
              <input className="p" placeholder="VoterID" value={userID} onChange={(e) => setUserID(e.target.value)} />
              </td>
              <td>
              <button className="pr" onClick={voteSports}>Vote</button>
              </td>
             </tr>


             <tr>
              <td>Technical Board</td>
              <td>
              <select className="p" onChange = {(e) => setCandidateIDT(e.target.value)}>
                      {cd.map((candidates) => (
                          <option value={candidates}>{candidates}</option>
                      ))}
                </select>
              </td>
              <td>
              <input className="p" placeholder="VoterID" value={userID} onChange={(e) => setUserID(e.target.value)} />
              </td>
              <td>
              <button className="pr" onClick={voteTechnical}>Vote</button>
              </td>
             </tr>


             <tr>
              <td>HostelAffairs Board</td>
              <td>
              <select className="p" onChange = {(e) => setCandidateIDH(e.target.value)}>
                      {ce.map((candidates) => (
                          <option value={candidates}>{candidates}</option>
                      ))}
                </select>
              </td>
              <td>
              <input className="p" placeholder="VoterID" value={userID} onChange={(e) => setUserID(e.target.value)} />
              </td>
              <td>
              <button className="pr" onClick={voteHostel}>Vote</button>
              </td>
             </tr>


             <tr>
              <td>StudentWelfareBoard</td>
              <td>
              <select className="p" onChange = {(e) => setCandidateIDST(e.target.value)}>
                      {cf.map((candidates) => (
                          <option value={candidates}>{candidates}</option>
                      ))}
                </select>
              </td>
              <td>
              <input className="p" placeholder="VoterID" value={userID} onChange={(e) => setUserID(e.target.value)} />
              </td>
              <td>
              <button className="pr"  onClick={voteStudent}>Vote</button>
              </td>
             </tr>
            </table> 
            <div className="winner1">
            <Link to="/result" className='s'><button  className="rbutton" >Election Result</button></Link>
            </div>
        </div>
    </div>
  
  
  );
}
export default Second;

