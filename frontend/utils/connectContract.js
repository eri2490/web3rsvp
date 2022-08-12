import { ethers } from "ethers";
import abiJSON from "./Web3RSVP.json"

const connectContract = () => {
  const contractAddress = "0xFb4B6aD39323005170Ab8008436248D04622Ff7B";
  const contractABI = abiJSON.abi;
  let rsvpContract;
  try {
    const { ethereum } = window;

    if (ethereum) {
      // checking for wth object in the window
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      // instantiating new connection to the contract
      rsvpContract = new ethers.Contract(contractAddress, contractABI, signer);
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log("ERROR:", error);
  }

  return rsvpContract;
}

export default connectContract;
