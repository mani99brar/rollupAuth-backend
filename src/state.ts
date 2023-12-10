import { RollupState, STF } from "@stackr/stackr-js/execution";
import { ethers } from "ethers";

export type StateVariable = number;

interface StateTransport {
  currentOtp: StateVariable;
}

export interface OTPActionInput {
  type: "valid" | "notValid";
  otp: number;
}

export class OTPRollup extends RollupState<StateVariable, StateTransport> {
  constructor(initialOtp: StateVariable) {
    super(initialOtp);
  }

  createTransport(state: StateVariable): StateTransport {
    return { currentOtp: state };
  }

  getState(): StateVariable {
    return this.transport.currentOtp;
  }

  calculateRoot(): ethers.BytesLike {
    return ethers.solidityPackedKeccak256(
      ["uint256"],
      [this.transport.currentOtp]
    );
  }
}



export const otpSTF: STF<OTPRollup, OTPActionInput> = {
  identifier: "otpSTF",

  apply(inputs: OTPActionInput, state: OTPRollup): void {
    let newState = state.getState();
    const now = Date.now();
    const roundedTimestamp = Math.floor(now / (5 * 60 * 1000)); 
    let combinedData = newState + "0xFa00D29d378EDC57AA1006946F0fc6230a5E3288" + Math.floor(roundedTimestamp).toString(); // Floor to the last 5 minutes

    // Hash the combined data to generate OTP
    // const otp = combinedData; // Take first 6 characters
    const encoder = new TextEncoder();
    const data = encoder.encode(combinedData);

    const buffer  = ethers.solidityPackedKeccak256(["bytes"],[data]).toString();
    combinedData = buffer.substring(0, 6);
    

    if (inputs.otp === parseInt(combinedData)) {
      // newState *=2;
      
    } else{
      
      throw new Error("Incorrect");
    }
    // state.transport.currentOtp = newState;
  },
};
