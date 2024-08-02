export const sameShardKeyPairsSample = `
import {
  Mnemonic,
  UserSecretKey,
} from "@multiversx/sdk-wallet/out";

const getKeyPairsOnSahrd = (shardId: number): any => {
  const mnemonic = Mnemonic.generate();

  const deriveKey = mnemonic.deriveKey(0);
  const secretKeyHex = deriveKey.hex();
  const secretKey = UserSecretKey.fromString(secretKeyHex);
  const address = secretKey.generatePublicKey().toAddress();
  const publicKey = address.bech32();

  const addressShard = getShardOfAddress(address.hex());
  if (addressShard !== shardId) {
    return getKeyPairsOnSahrd(shardId);
  }
  return { publicKey, privateKey: secretKeyHex, addressShard };
};

const getShardOfAddress = (hexPubKey: any) => {
  try {
    const numShards = 3;
    const maskHigh = parseInt("11", 2);
    const maskLow = parseInt("01", 2);
    const pubKey = Buffer.from(hexPubKey, "hex");
    const lastByteOfPubKey = pubKey[31];
    let shard = lastByteOfPubKey & maskHigh;
    if (shard > numShards - 1) {
      shard = lastByteOfPubKey & maskLow;
    }
    return shard;
  } catch (err) {
    return -1;
  }
};

const userKeys = getKeyPairsOnSahrd(2);
const relayerKeys = getKeyPairsOnSahrd(2);
`;

export const accountNonceSample = `

import { Account, Address } from "@multiversx/sdk-core/out";
import { ApiNetworkProvider } from "@multiversx/sdk-network-providers/out";

  const getAccountFromNetwork = async ({
    address,
    networkURL,
  }: {
    address: string;
    networkURL: string;
  }) => {
    const networkProvider = new ApiNetworkProvider(networkURL);
  
    const addressObj = Address.fromBech32(address);
  
    const accountOnNetwork = await networkProvider.getAccount(addressObj);
    const account = new Account(addressObj);
    account.update({
      nonce: accountOnNetwork.nonce,
      balance: accountOnNetwork.balance,
    });
  
    return account;
  };
  

  const { nonce: userNonce } = await getAccountFromNetwork({
    address: userKeys.public,
    networkURL: "https://testnet-api.multiversx.com",
  });

  const { nonce: relayerNonce } = await getAccountFromNetwork({
    address: relayerKeys.public,
    networkURL: "https://testnet-api.multiversx.com",
  });
  `;

export const buildAndSignUserTransactionSample = `
import {
  Address,
  Transaction,
  TransactionPayload,
} from "@multiversx/sdk-core/out";

import { TransactionComputer } from "@multiversx/sdk-core/out";
import { UserSecretKey, UserSigner } from "@multiversx/sdk-wallet/out";

const userTransaction = new Transaction({
  nonce: userNonce,
  value: "0",
  sender: new Address(userKeys.public),
  receiver: new Address(
    "erd1uv40ahysflse896x4ktnh6ecx43u7cmy9wnxnvcyp7deg299a4sq6vaywa"
  ),
  relayer: relayerKeys.public,
  gasPrice: 1000000000,
  gasLimit: 50000,
  data: new TransactionPayload(),
  chainID: "T",
  version: 1,
});

const signer = new UserSigner(UserSecretKey.fromString(userKeys.private));
const computer = new TransactionComputer();
const serializedTx = computer.computeBytesForSigning(userTransaction);
userTransaction.signature = await signer.sign(serializedTx);
`;

export const buildAndSignRelayerTransactionSample = `
import {
  Address,
  RelayedTransactionsFactory,
  TransactionsFactoryConfig,
} from "@multiversx/sdk-core/out";

import { TransactionComputer } from "@multiversx/sdk-core/out";
import { UserSecretKey, UserSigner } from "@multiversx/sdk-wallet/out";

const { chainID, minGasLimit, gasLimitPerByte } = new TransactionsFactoryConfig({ chainID: "T" });

const relayedTransactionsFactory = new RelayedTransactionsFactory({
config: {
  chainID,
  minGasLimit,
  gasLimitPerByte,
},
});

const relayedTransaction =
relayedTransactionsFactory.createRelayedV3Transaction({
  relayerAddress: Address.fromBech32(relayerKeys.public),
  innerTransactions: [userTransaction],
});
relayedTransaction.setNonce(relayerNonce);

const signer = new UserSigner(UserSecretKey.fromString(relayerKeys.private));
const computer = new TransactionComputer();
const serializedTx = computer.computeBytesForSigning(relayedTransaction);
relayedTransaction.signature = await signer.sign(serializedTx);
`;
