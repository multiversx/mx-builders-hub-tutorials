import { useDispatch, useSelector } from "react-redux";
import { setKey, tutorialSelector, unlockStep } from "../../../../redux";
import { TutorialCard } from "../../../../components/TutorialCard";
import {
  Address,
  IPlainTransactionObject,
  RelayedTransactionsFactory,
  Transaction,
  TransactionPayload,
  TransactionsFactoryConfig,
} from "@multiversx/sdk-core/out";
import { useEffect } from "react";
import {
  getAccountFromNetwork,
  signTransactionWithSecretKey,
} from "../../../commonHelpers";
import {
  accountNonceSample,
  buildAndSignRelayerTransactionSample,
  buildAndSignUserTransactionSample,
} from "../codeExamples";
export const Step2 = () => {
  const {
    tutorialData: {
      relayedTransaction,
      relayerKeys,
      userKeys,
      userNonce,
      relayerNonce,
      userTransaction,
    },
  } = useSelector(tutorialSelector);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const getAccountNonce = async () => {
    const { nonce: userAccountNonce } = await getAccountFromNetwork({
      address: userKeys.public,
      networkURL: "https://testnet-api.multiversx.com",
    });
    dispatch(setKey({ key: "userNonce", value: userAccountNonce }));

    const { nonce: relayerAccountNonce } = await getAccountFromNetwork({
      address: relayerKeys.public,
      networkURL: "https://testnet-api.multiversx.com",
    });
    dispatch(setKey({ key: "relayerNonce", value: relayerAccountNonce }));
  };

  const buildUserTransaction = async () => {
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

    userTransaction.signature = await signTransactionWithSecretKey({
      secretKey: userKeys.private,
      transaction: userTransaction,
    });

    dispatch(
      setKey({ key: "userTransaction", value: userTransaction.toPlainObject() })
    );
  };

  const prepareRelayedTransactions = async () => {
    const { chainID, minGasLimit, gasLimitPerByte } =
      new TransactionsFactoryConfig({ chainID: "T" });

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
        innerTransactions: [
          Transaction.fromPlainObject(
            userTransaction as unknown as IPlainTransactionObject
          ),
        ],
      });
    relayedTransaction.setNonce(relayerNonce);

    relayedTransaction.signature = await signTransactionWithSecretKey({
      secretKey: relayerKeys.private,
      transaction: relayedTransaction,
    });

    dispatch(
      setKey({
        key: "relayedTransaction",
        value: relayedTransaction.toPlainObject(),
      })
    );

    dispatch(unlockStep());
  };

  return (
    <>
      <TutorialCard
        title="Get user and relayer accounts nonce"
        codeSample={accountNonceSample}
        outputResult={
          userNonce !== undefined
            ? `
userNonce = ${userNonce}
relayerNonce = ${relayerNonce}        
`
            : undefined
        }
        actionButtonHandler={getAccountNonce}
      />

      <TutorialCard
        title="Build and sign user transaction"
        codeSample={buildAndSignUserTransactionSample}
        outputResult={
          userTransaction !== undefined
            ? `
userTransaction = ${JSON.stringify(userTransaction, null, 4)}
        `
            : undefined
        }
        actionButtonHandler={buildUserTransaction}
        actionButtonDisabled={userNonce === undefined}
      />

      <TutorialCard
        title="Build and sign relayer transaction"
        codeSample={buildAndSignRelayerTransactionSample}
        outputResult={
          relayedTransaction
            ? `

relayedTransaction = "${JSON.stringify(relayedTransaction, null, 4)}"
        `
            : undefined
        }
        actionButtonHandler={prepareRelayedTransactions}
        actionButtonDisabled={!userTransaction}
      />
    </>
  );
};
