import { Step1, Step2, Step3 } from "./Steps";
import {} from "./Steps/Step1";

export const relayedV3Map = [
  {
    title: "Generate key pairs",
    description:
      "Generate two key pairs. One will act as a user key pair and the other as a relayer key pair.",
    unlocked: false,
  },

  {
    title: "Second step title",
    description: "Second step description",
    unlocked: false,
  },

  {
    title: "Third step title",
    description: "Third step description",
    unlocked: false,
  },
];

export const relayedV3MapComponents = [Step1, Step2, Step3];
