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
import { Transaction, TransactionPayload, Address } from "@multiversx/sdk-core";
import { signTransactionSample } from "../Step1/codeExamples";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { darcula, vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const Step2 = () => {
  const dispatch = useDispatch();
  const { transactionSignature } = useSelector(tutorialSelector);

  const signTransactions = async () => {
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
    dispatch(
      setKey({ key: "transactionSignature", value: transactionSignature })
    );
    dispatch(unlockStep());
  };

  return (
    <>
      {/* this is step2{" "}
      <Button placeholder="" className="" onClick={unlock}>
        unlock
      </Button> */}

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
          {transactionSignature ? (
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
                {`transactionSignature = "${transactionSignature}"`}
              </SyntaxHighlighter>
            </>
          ) : (
            <Button onClick={signTransactions} placeholder="">
              Generate
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
};
