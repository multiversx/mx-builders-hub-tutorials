import { useDispatch, useSelector } from "react-redux";
import { setKey, tutorialSelector, unlockStep } from "../../../../redux";

import { Transaction, TransactionPayload, Address } from "@multiversx/sdk-core";
import {
  getAccountFromNetworkSample,
  signTransactionSample,
} from "../codeExamples";
import { useEffect } from "react";
import { TutorialCard } from "../../../../components/TutorialCard";
import { getAccountFromNetwork } from "../../../commonHelpers";
import { MetamaskProxyProvider } from "@multiversx/sdk-metamask-proxy-provider/out";

export const Step2 = () => {
  const dispatch = useDispatch();
  const {
    tutorialData: { signedTransaction, address, account },
  } = useSelector(tutorialSelector);

  useEffect(() => {
    if (address) {
      (async () => {
        const provider = MetamaskProxyProvider.getInstance();
        provider.setWalletUrl("https://devnet-wallet.multiversx.com");
        await provider.init();
        provider.setAddress(address);
      })();
    }
  }, []);

  useEffect(() => {
    if (account && signedTransaction) dispatch(unlockStep());
  }, [account, signedTransaction]);

  const signTransactions = async () => {
    const provider = MetamaskProxyProvider.getInstance();
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

  const retrieveAccountInfo = async () => {
    const provider = MetamaskProxyProvider.getInstance();
    const address = new Address(await provider.getAddress());
    const account = await getAccountFromNetwork({
      address: address.toBech32(),
      networkURL: "https://devnet-api.multiversx.com",
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
        actionButtonHandler={retrieveAccountInfo}
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
