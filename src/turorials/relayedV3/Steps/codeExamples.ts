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
