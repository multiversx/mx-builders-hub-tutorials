export const challengeTokenSignatureAndAddressSample = `
import { MetamaskProxyProvider } from "@multiversx/sdk-metamask-proxy-provider/out";


const provider = MetamaskProxyProvider.getInstance();
await provider.init();
provider.setWalletUrl("https://devnet-snap-wallet.multiversx.com");
await provider.login({ token: challengeToken });

const address = provider.account.address;
const signature = provider.account.signature;
`;

export const signTransactionSample = `
import { MetamaskProxyProvider } from "@multiversx/sdk-metamask-proxy-provider/out";

import { Transaction, TransactionPayload, Address } from "@multiversx/sdk-core";

const provider = MetamaskProxyProvider.getInstance();
const sender = await provider.getAddress();

const transaction = new Transaction({
  nonce: account.nonce,
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

const signedTransactions = await provider.signTransactions([transaction]);
`;

export const signMessageSample = `
import { MetamaskProxyProvider } from "@multiversx/sdk-metamask-proxy-provider/out";

import { Address, SignableMessage } from "@multiversx/sdk-core";

const provider = MetamaskProxyProvider.getInstance();
const address = await provider.getAddress();
const message = new SignableMessage({
  message: Buffer.from("hello"),
  address: new Address(address),
});
await provider.signMessage(message);
const signedMessage = JSON.stringify(message.toJSON(), null, 4);
`;

export const getAccountFromNetworkSample = `
import { MetamaskProxyProvider } from "@multiversx/sdk-metamask-proxy-provider/out";

import { Address } from "@multiversx/sdk-core";
import { ApiNetworkProvider } from "@multiversx/sdk-network-providers";

const provider = MetamaskProxyProvider.getInstance();
const address = new Address(await provider.getAddress());
const networkProvider = new ApiNetworkProvider(
  "https://devnet-api.multiversx.com"
);

const accountOnNetwork = await networkProvider.getAccount(address);
const account = new Account(address);
account.update({
  nonce: accountOnNetwork.nonce,
  balance: accountOnNetwork.balance,
});
`;
