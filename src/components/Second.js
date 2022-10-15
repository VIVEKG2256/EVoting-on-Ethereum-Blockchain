import Header from "./Header";
import { Link } from "react-router-dom";
import "./second.css";
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

  return (
    <>
        <div>
            <div><Link to="/" className='s'><button >Home</button></Link></div>
            <div className="sheader"><Header/></div>
        </div>
        <div>
        <table>
            <tr className="thr">
             <td><b>Posts</b></td>
             <td><b>Candidate Id</b></td>
             <td><b>VoterId</b></td>
            </tr>
            <tr>
              <td>GymkhanaCouncil</td>
              <td>
              <select>
                      {ca.map((candidates) => (
                          <option value={candidates}>{candidates}</option>
                      ))}
                </select>
              </td>
              <td>
              <input placeHolder="VoterID" value={userID} onChange={(e) => setUserID(e.target.value)} />
              </td>
              <td>
              <button className="votebutton" type="submit">Vote</button>
              </td>
             </tr>

             <tr>
              <td>CulturalBoard</td>
              <td>
              <select>
                      {cb.map((candidates) => (
                          <option value={candidates}>{candidates}</option>
                      ))}
                </select>
              </td>
              <td>
              <input placeHolder="VoterID" value={userID} onChange={(e) => setUserID(e.target.value)} />
              </td>
              <td>
              <button className="votebutton" type="submit">Vote</button>
              </td>
             </tr>


             <tr>
              <td>SportsBoard</td>
              <td>
              <select>
                      {cc.map((candidates) => (
                          <option value={candidates}>{candidates}</option>
                      ))}
                </select>
              </td>
              <td>
              <input placeHolder="VoterID" value={userID} onChange={(e) => setUserID(e.target.value)} />
              </td>
              <td>
              <button className="votebutton" type="submit">Vote</button>
              </td>
             </tr>


             <tr>
              <td>TechnicalBoard</td>
              <td>
              <select>
                      {cd.map((candidates) => (
                          <option value={candidates}>{candidates}</option>
                      ))}
                </select>
              </td>
              <td>
              <input placeHolder="VoterID" value={userID} onChange={(e) => setUserID(e.target.value)} />
              </td>
              <td>
              <button className="votebutton" type="submit">Vote</button>
              </td>
             </tr>


             <tr>
              <td>HostelAffairsBoard</td>
              <td>
              <select>
                      {ce.map((candidates) => (
                          <option value={candidates}>{candidates}</option>
                      ))}
                </select>
              </td>
              <td>
              <input placeHolder="VoterID" value={userID} onChange={(e) => setUserID(e.target.value)} />
              </td>
              <td>
              <button className="votebutton" type="submit">Vote</button>
              </td>
             </tr>


             <tr>
              <td>StudentWelfareBoard</td>
              <td>
              <select>
                      {cf.map((candidates) => (
                          <option value={candidates}>{candidates}</option>
                      ))}
                </select>
              </td>
              <td>
              <input placeHolder="VoterID" value={userID} onChange={(e) => setUserID(e.target.value)} />
              </td>
              <td>
              <button className="votebutton" type="submit">Vote</button>
              </td>
             </tr>

            </table> 
        </div>
    </>
  
  
  );
}
export default Second;

// return(
//     <>
//     <div>
//         <div><Link to="/" className='s'><button >Home</button></Link></div>
//         <div className="sheader"><Header/></div>
//     </div>
//     <div>
//     <table>
//         <tr className="thr">
//          <td><b>Posts</b></td>
//          <td><b>Candidate Id</b></td>
//          <td><b>VoterId</b></td>
//         </tr>
//         <tr>
//          1
//         </tr>
//         <tr>
//          2
//        </tr>
//        <tr>
//         3
//       </tr>
//       <tr>
//         4
//       </tr>
//       <tr>
//         5
//       </tr>
//       <tr>
//         6
//       </tr>

//     </table>
//     </div>
//     </>
// );
