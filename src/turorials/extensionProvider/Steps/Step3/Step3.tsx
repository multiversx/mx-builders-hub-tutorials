import { useDispatch, useSelector } from "react-redux";
import { setKey, tutorialSelector, unlockStep } from "../../../../redux";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { ExtensionProvider } from "@multiversx/sdk-extension-provider";
import { Address, SignableMessage } from "@multiversx/sdk-core";
import { signMessageSample } from "../Step1/codeExamples";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { darcula, vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const Step3 = () => {
  const { signedMessage } = useSelector(tutorialSelector);
  const dispatch = useDispatch();

  const signMessage = async () => {
    const provider = ExtensionProvider.getInstance();
    const address = await provider.getAddress();
    const message = new SignableMessage({
      message: Buffer.from("hello"),
      address: new Address(address),
    });
    await provider.signMessage(message);
    const signedMessage = JSON.stringify(message.toJSON(), null, 4);

    dispatch(
      setKey({
        key: "signedMessage",
        value: signedMessage,
      })
    );

    dispatch(unlockStep());
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
            Prepare and sign message
          </Typography>
          <SyntaxHighlighter language="javascript" style={vs2015}>
            {signMessageSample}
          </SyntaxHighlighter>
        </CardBody>
        <CardFooter placeholder="" className="pt-0">
          {signedMessage ? (
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
                {`signedMessage = ${signedMessage}`}
              </SyntaxHighlighter>
            </>
          ) : (
            <Button onClick={signMessage} placeholder="">
              Generate
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
};
