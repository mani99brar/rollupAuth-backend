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
    if (inputs.otp === newState) {
      newState *=2;
    } else if (inputs.otp!== newState) {
      throw new Error("Incorrect");
    }
    state.transport.currentOtp = newState;
  },
};
