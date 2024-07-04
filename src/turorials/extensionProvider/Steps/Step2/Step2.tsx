import { useDispatch, useSelector } from "react-redux";
import { setKey, tutorialSelector, unlockStep } from "../../../../redux";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
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
} from "../Step1/codeExamples";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { darcula, vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ApiNetworkProvider } from "@multiversx/sdk-network-providers";
import { useEffect } from "react";

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
      <Card placeholder="" className="mt-6 w-full">
        <CardBody placeholder="">
          <Typography
            placeholder=""
            variant="h5"
            color="blue-gray"
            className="mb-2"
          >
            Get account data from network
          </Typography>
          <SyntaxHighlighter language="javascript" style={vs2015}>
            {getAccountFromNetworkSample}
          </SyntaxHighlighter>
        </CardBody>
        <CardFooter placeholder="" className="pt-0">
          {account ? (
            <>
              <Typography
                placeholder=""
                variant="paragraph"
                color="blue-gray"
                className="mb-2"
              >
                Output:
              </Typography>
              <SyntaxHighlighter language="javascript" style={darcula}>
                {`account = ${account}`}
              </SyntaxHighlighter>
            </>
          ) : (
            <Button onClick={getAccountFromNetwork} placeholder="">
              Generate
            </Button>
          )}
        </CardFooter>
      </Card>

      <Card placeholder="" className="mt-6 w-full">
        <CardBody placeholder="">
          <Typography
            placeholder=""
            variant="h5"
            color="blue-gray"
            className="mb-2"
          >
            Prepare and sign transaction
          </Typography>
          <SyntaxHighlighter language="javascript" style={vs2015}>
            {signTransactionSample}
          </SyntaxHighlighter>
        </CardBody>
        <CardFooter placeholder="" className="pt-0">
          {signedTransaction ? (
            <>
              <Typography
                placeholder=""
                variant="paragraph"
                color="blue-gray"
                className="mb-2"
              >
                Output:
              </Typography>
              <SyntaxHighlighter language="javascript" style={darcula}>
                {`signedTransaction[0] = "${signedTransaction}"`}
              </SyntaxHighlighter>
            </>
          ) : (
            <Button
              disabled={!account}
              onClick={signTransactions}
              placeholder=""
            >
              Generate
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
};
