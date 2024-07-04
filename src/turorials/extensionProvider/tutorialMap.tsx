import { Step1, Step2, Step3 } from "./Steps";
import {} from "./Steps/Step1";

export const extensionProviderMap = [
  {
    title: "Login",
    description:
      "Obtain the logged in address, challenge token signature and native auth token.",
    unlocked: false,
  },

  {
    title: "Sign transactions",
    description:
      "You can send multiple transactions to be signed by extension provider",
    unlocked: false,
  },

  {
    title: "Sign message",
    description: "Different use cases require message signing.",
    unlocked: false,
  },
];

export const extensionProviderMapComponents = [Step1, Step2, Step3];
