import { Step1, Step2, Step3 } from "./Steps";
import {} from "./Steps/Step1";

export const crossWindowProviderMap = [
  {
    title: "Login",
    description:
      "Obtain the challenge token signature, logged in address and native auth token.",
    unlocked: false,
  },

  {
    title: "Sign transactions",
    description:
      "You can send multiple transactions to be signed by cross window provider",
    unlocked: false,
  },

  {
    title: "Sign message",
    description: "Different use cases require message signing.",
    unlocked: true,
  },
];

export const crossWindowProviderMapComponents = [Step1, Step2, Step3];
