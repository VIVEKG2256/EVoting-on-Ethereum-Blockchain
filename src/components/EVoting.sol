// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

contract Voting{

    address public commission;

    uint public startTime;
    uint public endTime;

    mapping(bytes32 => bool) public votersExists;
    mapping(bytes32 => bool) public hasVotedgym;
    mapping(bytes32 => bool) public hasVotedcul;
    mapping(bytes32 => bool) public hasVotedspo;
    mapping(bytes32 => bool) public hasVotedtec;
    mapping(bytes32 => bool) public hasVotedhos;
    mapping(bytes32 => bool) public hasVotedstu;
     
    string [] public candidates;
    mapping(string => string) public candidateName;
    mapping(string => uint) public candidateAge;
    mapping(string => uint) public candidateCgpa;

    string [] public ca;
    string [] public cb;
    string [] public cc;
    string [] public cd;
    string [] public ce;
    string [] public cf;
   

    mapping(string => bool) public candidateExists;
    mapping(string => uint) public gymkhanaCandidate;
    mapping(string => uint) public culturalCandidate;
    mapping(string => uint) public sportsCandidate;
    mapping(string => uint) public technicalCandidate;
    mapping(string => uint) public hostelCandidate;
    mapping(string => uint) public studentCandidate;

    string [6] public winners; 
    
    bool internal isVotesCounted;
    
    mapping(int => int) partyVotes;

    

    constructor(){
        commission = msg.sender;
    }

   function setElectionTime(uint _startTime, uint _endTime) public onlyElectionCommission{
        require(msg.sender == commission,"You are not authorised");
        startTime = _startTime;
        endTime = _endTime;
   }
    
    modifier onlyElectionCommission() {
        require(msg.sender == commission,"Only the election commission can access this function.");
        _;
    }

    
    modifier allowVoting() {
        require(startTime!=endTime,"Please set the election start time and end time");
        require(startTime <= block.timestamp, "You can not vote now. The voting has not started yet.");
        require(endTime >= block.timestamp, "You can not vote now. The voting has been completed.");
        _;
    }

   
    modifier onlyAfterEndTime() {
        require(startTime!=endTime,"Please set the election start time and end time");
        require(endTime <= block.timestamp, "Counting can not be started now.");
        isVotesCounted = true;
        _;
    }

    
    modifier onlyAfterCountingVotes() {
        require(isVotesCounted, "Results can be viewed only after the counting has been done.");
        _;
    }


    function createVoter(string memory voterId) public onlyElectionCommission {
        
        bytes32 userId = sha256(abi.encodePacked(voterId));
        require(!votersExists[userId], "Account has already been created.");
        votersExists[userId] = true;
        hasVotedgym[userId]=false;
        hasVotedcul[userId]=false;
        hasVotedspo[userId]=false;
        hasVotedspo[userId]=false;
        hasVotedtec[userId]=false;
        hasVotedstu[userId]=false;

    }

    function createGymkhana(string memory id,string memory name,uint age, uint cgpa) public onlyElectionCommission {
        require(!candidateExists[id],"This Candidate hasbeen already created");
        candidateExists[id]=true;
        candidates.push(id);
        candidateName[id]=name;
        candidateAge[id]=age;
        candidateCgpa[id]=cgpa;
        gymkhanaCandidate[id]=1;
        ca.push(id);

    }

    function createCultural(string memory id,string memory name,uint age, uint cgpa) public onlyElectionCommission {
        require(!candidateExists[id],"This Candidate hasbeen already created");
        candidateExists[id]=true;
        candidates.push(id);
        candidateName[id]=name;
        candidateAge[id]=age;
        candidateCgpa[id]=cgpa;
        culturalCandidate[id]=1;
        cb.push(id);
    }

    function createSports(string memory id,string memory name,uint age, uint cgpa) public onlyElectionCommission {
        require(!candidateExists[id],"This Candidate hasbeen already created");
        candidateExists[id]=true;
        candidates.push(id);
        candidateName[id]=name;
        candidateAge[id]=age;
        candidateCgpa[id]=cgpa;
        sportsCandidate[id]=1;
        cc.push(id);
    }

    function createTechnical(string memory id,string memory name,uint age, uint cgpa) public onlyElectionCommission {
        require(!candidateExists[id],"This Candidate hasbeen already created");
        candidateExists[id]=true;
        candidates.push(id);
        candidateName[id]=name;
        candidateAge[id]=age;
        candidateCgpa[id]=cgpa;
        technicalCandidate[id]=1;
        cd.push(id);
    }

    function createHostel(string memory id,string memory name,uint age, uint cgpa) public onlyElectionCommission {
        require(!candidateExists[id],"This Candidate hasbeen alraedy created");
        candidateExists[id]=true;
        candidates.push(id);
        candidateName[id]=name;
        candidateAge[id]=age;
        candidateCgpa[id]=cgpa;
        hostelCandidate[id]=1;
        ce.push(id);
    }
    
    function createStudent(string memory id,string memory name,uint age, uint cgpa) public onlyElectionCommission {
        require(!candidateExists[id],"This candiadte hasbeen already created");
        candidateExists[id]=true;
        candidates.push(id);
        candidateName[id]=name;
        candidateAge[id]=age;
        candidateCgpa[id]=cgpa;
        studentCandidate[id]=1;
        cf.push(id);
    }
    
    function voteGymkhana(string memory candidateId , bytes32 voterId) public allowVoting {
        require(candidateExists[candidateId],"This candidate does not exits");
        require(votersExists[voterId],"This voter does not exits");
        require(!hasVotedgym[voterId],"You have already voted");
        gymkhanaCandidate[candidateId]+=1;
        hasVotedgym[voterId]=true;
        
    }

    function voteCultural(string memory candidateId , bytes32 voterId) public allowVoting{
        require(candidateExists[candidateId],"This candidate does not exits");
        require(votersExists[voterId],"This voter does not exits");
        require(!hasVotedcul[voterId],"You have already voted");
        culturalCandidate[candidateId]+=1;
        hasVotedcul[voterId]=true;

    }

    function voteSports(string memory candidateId , bytes32 voterId) public allowVoting {
        require(candidateExists[candidateId],"This candidate does not exits");
        require(votersExists[voterId],"This voter does not exits");
        require(!hasVotedspo[voterId],"You have already voted");
        sportsCandidate[candidateId]+=1;
        hasVotedspo[voterId]=true;
       
    }

    function voteTechnical(string memory candidateId, bytes32 voterId) public allowVoting {
        require(candidateExists[candidateId],"This candidate does not exits");
        require(votersExists[voterId],"This voter does not exits");
        require(!hasVotedtec[voterId],"You have already voted");
        technicalCandidate[candidateId]+=1;
        hasVotedtec[voterId]=true;
        
    }

    function voteHostel(string memory candidateId, bytes32 voterId) public allowVoting {
        require(candidateExists[candidateId],"This candidate does not exits");
        require(votersExists[voterId],"This voter does not exits");
        require(!hasVotedhos[voterId],"You have already voted");
        hostelCandidate[candidateId]+=1;
        hasVotedhos[voterId]=true;
       
    }
     
    function voteStudent(string memory candidateId, bytes32 voterId) public allowVoting {
        require(candidateExists[candidateId],"This candidate does not exits");
        require(votersExists[voterId],"This voter does not exits");
        require(!hasVotedstu[voterId],"You have already voted");
        studentCandidate[candidateId]+=1;
        hasVotedstu[voterId]=true;
        
    } 

    function countVotes() public onlyAfterEndTime {
      uint totalCandidate = candidates.length;
      string memory s0;
      string memory s1;
      string memory s2;
      string memory s3;
      string memory s4;
      string memory s5;
      uint maxi=0;

      for(uint i=0;i<totalCandidate;i++)
      { 
          if(gymkhanaCandidate[candidates[i]] >= maxi)
          {
              if(maxi<gymkhanaCandidate[candidates[i]])
                 {
                     maxi=gymkhanaCandidate[candidates[i]];
                     s0=candidates[i];
                 }
          }
      }
     
      for(uint i=0;i<totalCandidate;i++)
      { 
          if(gymkhanaCandidate[candidates[i]] == maxi)
          {
              if(candidateCgpa[s0] < candidateCgpa[candidates[i]])
                 {
                    s0=candidates[i];
                 }
          }
      }
       winners[0]=s0;

      //s1
      maxi=0;
      for(uint i=0;i<totalCandidate;i++)
      { 
          if(culturalCandidate[candidates[i]] >= maxi)
          {
              if(maxi<culturalCandidate[candidates[i]])
                 {
                     maxi=culturalCandidate[candidates[i]];
                     s1=candidates[i];
                 }
          }
      }
     
      for(uint i=0;i<totalCandidate;i++)
      { 
          if(culturalCandidate[candidates[i]] == maxi)
          {
              if(candidateCgpa[s1] < candidateCgpa[candidates[i]])
                 {
                     s1=candidates[i];
                 }
          }
      }
      winners[1]=s1;
      //s2
      maxi=0;
      for(uint i=0;i<totalCandidate;i++)
      { 
          if(sportsCandidate[candidates[i]] >= maxi)
          {
              if(maxi<sportsCandidate[candidates[i]])
                 {
                     maxi=sportsCandidate[candidates[i]];
                     s2=candidates[i];
                 }
          }
      }
     
      for(uint i=0;i<totalCandidate;i++)
      { 
          if(sportsCandidate[candidates[i]] == maxi)
          {
              if(candidateCgpa[s2] < candidateCgpa[candidates[i]])
                 {
                     s2=candidates[i];
                 }
          }
      }
      winners[2]=s2;
    //s3
      maxi=0;
      for(uint i=0;i<totalCandidate;i++)
      { 
          if(technicalCandidate[candidates[i]] >= maxi)
          {
              if(maxi<technicalCandidate[candidates[i]])
                 {
                     maxi=technicalCandidate[candidates[i]];
                     s3=candidates[i];
                 }
          }
      }
     
      for(uint i=0;i<totalCandidate;i++)
      { 
          if(technicalCandidate[candidates[i]] == maxi)
          {
              if(candidateCgpa[s3] < candidateCgpa[candidates[i]])
                 {
                     s3=candidates[i];
                 }
          }
      }
     winners[3]=s3;
     //s4
      maxi=0;
      for(uint i=0;i<totalCandidate;i++)
      { 
          if(hostelCandidate[candidates[i]] >= maxi)
          {
              if(maxi<hostelCandidate[candidates[i]])
                 {
                     maxi=hostelCandidate[candidates[i]];
                     s4=candidates[i];
                 }
          }
      }
     
      for(uint i=0;i<totalCandidate;i++)
      { 
          if(hostelCandidate[candidates[i]] == maxi)
          {
              if(candidateCgpa[s4] < candidateCgpa[candidates[i]])
                 {
                     s4=candidates[i];
                 }
          }
      }
      winners[4]=s4;
      //s5
      maxi=0;
      for(uint i=0;i<totalCandidate;i++)
      { 
          if(studentCandidate[candidates[i]] >= maxi)
          {
              if(maxi<studentCandidate[candidates[i]])
                 {
                     maxi=studentCandidate[candidates[i]];
                     s5=candidates[i];
                 }
          }
      }
     
      for(uint i=0;i<totalCandidate;i++)
      { 
          if(studentCandidate[candidates[i]] == maxi)
          {
              if(candidateCgpa[s5] < candidateCgpa[candidates[i]])
                 {
                     s5=candidates[i];
                 }
          }
      }
      winners[5]=s5;

    }

    function viewResultsOf(uint partyNumber) public view onlyAfterCountingVotes returns(string memory){
        return winners[partyNumber];
    }
    

    function hashCode(string memory str) public view onlyElectionCommission returns(bytes32){
        return sha256(abi.encodePacked(str));
    }

    function gym() public view returns(string [] memory){
       return ca;
    }

    function cult() public view returns(string [] memory){
       return cb;
    }

    function spo() public view returns(string [] memory){
       return cc;
    }

    function tec() public view returns(string [] memory){
       return cd;
    }

    function hos() public view returns(string [] memory){
       return ce;
    }
    
     function stu() public view returns(string [] memory){
       return cf;
    }
}