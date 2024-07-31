import { useDispatch, useSelector } from "react-redux";
import { setKey, tutorialSelector, unlockStep } from "../../../../redux";
import { ExtensionProvider } from "@multiversx/sdk-extension-provider/out";
import {
  Transaction,
  TransactionPayload,
  Address,
  Account,
} from "@multiversx/sdk-core";
import {
  getAccountFromNetworkSample,
  signTransactionSample,
} from "../codeExamples";
import { ApiNetworkProvider } from "@multiversx/sdk-network-providers";
import { useEffect } from "react";
import { TutorialCard } from "../../../../components/TutorialCard";

export const Step2 = () => {
  const dispatch = useDispatch();
  const {
    tutorialData: { signedTransaction, address, account },
  } = useSelector(tutorialSelector);

  useEffect(() => {
    if (address) {
      (async () => {
        const provider = ExtensionProvider.getInstance();
        await provider.init();
        provider.setAddress(address);
      })();
    }
  }, []);

  useEffect(() => {
    if (account && signedTransaction) dispatch(unlockStep());
  }, [account, signedTransaction]);

  const signTransactions = async () => {
    const provider = ExtensionProvider.getInstance();
    const sender = await provider.getAddress();
    const transaction = new Transaction({
      nonce: JSON.parse(account).nonce,
      value: "0",
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
    dispatch(
      setKey({
        key: "signedTransaction",
        value: JSON.stringify(signedTransaction[0].toSendable(), null, 4),
      })
    );
  };

  const getAccountFromNetwork = async () => {
    const provider = ExtensionProvider.getInstance();
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

    dispatch(
      setKey({
        key: "account",
        value: JSON.stringify(account.toJSON(), null, 4),
      })
    );
  };

  return (
    <>
      <TutorialCard
        title="Get account data from network"
        codeSample={getAccountFromNetworkSample}
        outputResult={account ? `account = ${account}` : undefined}
        actionButtonHandler={getAccountFromNetwork}
      />

      <TutorialCard
        title="Prepare and sign transaction"
        codeSample={signTransactionSample}
        outputResult={
          signedTransaction
            ? `signedTransactions[0] = "${signedTransaction}"`
            : undefined
        }
        actionButtonHandler={signTransactions}
        actionButtonDisabled={!account}
      />
    </>
  );
};
