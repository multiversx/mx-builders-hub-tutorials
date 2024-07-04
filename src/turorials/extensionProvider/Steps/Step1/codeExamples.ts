export const challengeTokenSample = `
import { NativeAuthClient } from "@multiversx/sdk-native-auth-client";

const client = new NativeAuthClient({
    apiUrl: "https://devnet-api.multiversx.com",
    expirySeconds: 7200,
  });

const challengeToken = await client.initialize();
`;

export const challengeTokenSignatureAndAddressSample = `
import { ExtensionProvider } from "@multiversx/sdk-extension-provider/out";

const provider = ExtensionProvider.getInstance();
await provider.init();
await provider.login({ token: challengeToken });

const address = provider.account.address;
const signature = provider.account.signature;
`;

export const nativeAuthTokenSample = `
import { NativeAuthClient } from "@multiversx/sdk-native-auth-client";

const client = new NativeAuthClient();
const nativeAuthToekn = client.getToken(
  address,
  challengeToken,
  challengeTokenSignature
);
`;

export const signTransactionSample = `
import { ExtensionProvider } from "@multiversx/sdk-extension-provider/out";
import { Transaction, TransactionPayload, Address } from "@multiversx/sdk-core";

const provider = ExtensionProvider.getInstance();
const sender = await provider.getAddress();

const transaction = new Transaction({
  nonce: 42,
  value: "1",
  sender: new Address(sender),
  receiver: new Address(
    "erd1uv40ahysflse896x4ktnh6ecx43u7cmy9wnxnvcyp7deg299a4sq6vaywa"
  ),
  gasPrice: 1000000000,
  gasLimit: 50000,
  data: new TransactionPayload(),
  chainID: "D",
  version: 1,
});

const signedTransaction = await provider.signTransactions([transaction]);
const transactionSignature = signedTransaction[0].toPlainObject().signature;
`;

export const signMessageSample = `
import { ExtensionProvider } from "@multiversx/sdk-extension-provider";
import { Address, SignableMessage } from "@multiversx/sdk-core";

const provider = ExtensionProvider.getInstance();
const address = await provider.getAddress();
const message = new SignableMessage({
  message: Buffer.from("hello"),
  address: new Address(address),
});
await provider.signMessage(message);
const signedMessage = JSON.stringify(message.toJSON(), null, 4);
`;
