import { ethers } from "ethers";
import { stackrConfig } from "../stackr.config";
import { ActionSchema } from "@stackr/stackr-js";

const actionSchemaType = {
  type: "String",
  otp:  "uint256"
};

const otpInput = new ActionSchema("verify-otp", actionSchemaType);

console.log(otpInput.EIP712TypedData.types)

const getRandomValue = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getData = async () => {
  const wallet = ethers.Wallet.createRandom();

  const data = {
    type: "valid",
    otp: 733120692707
  };

  console.log("Stackr config: ", stackrConfig);
  console.log("OTP input: ", otpInput.EIP712TypedData.types);
  console.log("Data: ", data);

  const sign = await wallet.signTypedData(
    stackrConfig.domain,
    otpInput.EIP712TypedData.types,
    data
  );

  const payload = JSON.stringify({
    msgSender: wallet.address,
    signature: sign,
    payload: data,
  });
  
  console.log(payload);

  return payload;
};

const run = async () => {
  const start = Date.now();
  const payload = await getData();

  const res = await fetch("http://localhost:3000/", {
    method: "POST",
    body: payload,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const end = Date.now();

  const json = await res.json();

  const elapsedSeconds = (end - start) / 1000;
  const requestsPerSecond = 1 / elapsedSeconds;

  console.log(`Requests per second: ${requestsPerSecond.toFixed(2)}`);
  console.log("response : ", json);
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let sent = 0;

while (true) {
  sent++;
  await run();
  if (sent === 16) {
    break;
  }
}
