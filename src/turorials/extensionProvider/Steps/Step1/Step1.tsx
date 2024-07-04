import { useDispatch, useSelector } from "react-redux";
import { setKey, tutorialSelector, unlockStep } from "../../../../redux";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { NativeAuthClient } from "@multiversx/sdk-native-auth-client";
import {
  challengeTokenSample,
  challengeTokenSignatureAndAddressSample,
  nativeAuthTokenSample,
} from "./codeExamples";
import { ExtensionProvider } from "@multiversx/sdk-extension-provider/out";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { vs2015, darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useEffect } from "react";

export const Step1 = () => {
  const {
    tutorialData: {
      challengeToken,
      challengeTokenSignature,
      address,
      nativeAuthToken,
    },
  } = useSelector(tutorialSelector);

  const dispatch = useDispatch();

  const generateNativeAuthChallengeToken = async () => {
    const client = new NativeAuthClient({
      apiUrl: "https://devnet-api.multiversx.com",
      expirySeconds: 7200,
    });
    const challengeToken = await client.initialize();
    dispatch(setKey({ key: "challengeToken", value: challengeToken }));
  };

  useEffect(() => {
    if (challengeToken && challengeTokenSignature && address && nativeAuthToken)
      dispatch(unlockStep());
  }, [challengeToken, challengeTokenSignature, address, nativeAuthToken]);

  const loginWithToken = async () => {
    const provider = ExtensionProvider.getInstance();
    await provider.init();
    await provider.login({ token: challengeToken });

    const address = provider.account.address;
    const signature = provider.account.signature;

    dispatch(setKey({ key: "address", value: address }));
    dispatch(setKey({ key: "challengeTokenSignature", value: signature }));
  };

  const getNativeAuthToken = async () => {
    const client = new NativeAuthClient();
    const nativeAuthToekn = client.getToken(
      address,
      challengeToken,
      challengeTokenSignature
    );

    dispatch(setKey({ key: "nativeAuthToken", value: nativeAuthToekn }));
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
            Generate nativeAuth challenge token
          </Typography>
          <SyntaxHighlighter language="javascript" style={vs2015}>
            {challengeTokenSample}
          </SyntaxHighlighter>
        </CardBody>
        <CardFooter placeholder="" className="pt-0">
          {challengeToken ? (
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
                {`challengeToken = "${challengeToken}"`}
              </SyntaxHighlighter>
            </>
          ) : (
            <Button onClick={generateNativeAuthChallengeToken} placeholder="">
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
            Obtain challenge token signature and wallet address
          </Typography>
          <SyntaxHighlighter language="javascript" style={vs2015}>
            {challengeTokenSignatureAndAddressSample}
          </SyntaxHighlighter>
        </CardBody>
        <CardFooter placeholder="" className="pt-0">
          {challengeTokenSignature ? (
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
                {`address = "${address}"
signature = "${challengeTokenSignature}"
              `}
              </SyntaxHighlighter>
            </>
          ) : (
            <Button
              disabled={!challengeToken}
              onClick={loginWithToken}
              placeholder=""
            >
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
            Obtain native auth token
          </Typography>
          <SyntaxHighlighter language="javascript" style={vs2015}>
            {nativeAuthTokenSample}
          </SyntaxHighlighter>
        </CardBody>
        <CardFooter placeholder="" className="pt-0">
          {nativeAuthToken ? (
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
                {`nativeAuthToken = "${nativeAuthToken}"

Normally, you would now send this token to your server, which would then validate it.
Go and check it on:
https://utils.multiversx.com/auth (switch to Devnet)              `}
              </SyntaxHighlighter>
            </>
          ) : (
            <Button
              disabled={!address || !challengeTokenSignature}
              onClick={getNativeAuthToken}
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
