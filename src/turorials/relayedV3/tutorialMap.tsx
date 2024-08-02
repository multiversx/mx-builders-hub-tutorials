import { Step1, Step2 } from "./Steps";
import {} from "./Steps/Step1";

export const relayedV3Map = [
  {
    title: "Generate key pairs",
    description:
      "Generate two key pairs. One will act as a user key pair and the other as a relayer key pair.",
    unlocked: false,
  },

  {
    title: "Prepare and sign relayed transaction",
    description:
      "Generate transactions that will be signed by user and relayer",
    unlocked: false,
  },
];

export const relayedV3MapComponents = [Step1, Step2];
