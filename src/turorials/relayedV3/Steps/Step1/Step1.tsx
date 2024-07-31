import { useDispatch, useSelector } from "react-redux";
import { setKey, tutorialSelector, unlockStep } from "../../../../redux";
import { TutorialCard } from "../../../../components/TutorialCard";
import { Mnemonic, UserSecretKey } from "@multiversx/sdk-wallet/out";
import { sameShardKeyPairsSample } from "../codeExamples";

export const Step1 = () => {
  const {
    tutorialData: { userKeys, relayerKeys },
  } = useSelector(tutorialSelector);
  const dispatch = useDispatch();
  const createKeyPairs = () => {
    const userKeys = getKeyPairsOnSahrd(2);
    const relayerKeys = getKeyPairsOnSahrd(2);
    dispatch(
      setKey({
        key: "userKeys",
        value: { private: userKeys.privateKey, public: userKeys.publicKey },
      })
    );
    dispatch(
      setKey({
        key: "relayerKeys",
        value: {
          private: relayerKeys.privateKey,
          public: relayerKeys.publicKey,
        },
      })
    );
    dispatch(unlockStep());
  };

  const getKeyPairsOnSahrd = (
    shardId: number
  ): { publicKey: string; privateKey: string } => {
    const mnemonic = Mnemonic.generate();

    const deriveKey = mnemonic.deriveKey(0);
    const privateKeyHex = deriveKey.hex();
    const privateKey = UserSecretKey.fromString(privateKeyHex);
    const address = privateKey.generatePublicKey().toAddress();
    const publicKey = address.bech32();

    const addressShard = getShardOfAddress(address.hex());
    if (addressShard !== shardId) {
      return getKeyPairsOnSahrd(shardId);
    }
    return { publicKey, privateKey: privateKeyHex };
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

  return (
    <>
      <TutorialCard
        title="Generate two keypairs on the same shard"
        codeSample={sameShardKeyPairsSample}
        outputResult={
          userKeys && relayerKeys
            ? `
//User key pairs on shard 2
userKeys = "${JSON.stringify(userKeys, null, 4)}"

//Relayer key pairs on shard 2
relayerKeys = "${JSON.stringify(relayerKeys, null, 4)}"
        `
            : undefined
        }
        actionButtonHandler={createKeyPairs}
      />
    </>
  );
};
