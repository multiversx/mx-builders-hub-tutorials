import { useDispatch, useSelector } from "react-redux";
import { setKey, tutorialSelector, unlockStep } from "../../../../redux";
import { NativeAuthClient } from "@multiversx/sdk-native-auth-client";
import {
  challengeTokenSample,
  challengeTokenSignatureAndAddressSample,
  nativeAuthTokenSample,
} from "../codeExamples";
import { ExtensionProvider } from "@multiversx/sdk-extension-provider/out";
import { useEffect } from "react";
import { TutorialCard } from "../../../../components/TutorialCard";

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
      <TutorialCard
        title="Generate nativeAuth challenge token"
        codeSample={challengeTokenSample}
        outputResult={
          challengeToken ? `challengeToken = "${challengeToken}"` : undefined
        }
        actionButtonHandler={generateNativeAuthChallengeToken}
      />

      <TutorialCard
        title="Obtain challenge token signature and wallet address"
        codeSample={challengeTokenSignatureAndAddressSample}
        outputResult={
          challengeTokenSignature
            ? `address = "${address}"
signature = "${challengeTokenSignature}"
                        `
            : undefined
        }
        actionButtonHandler={loginWithToken}
        actionButtonDisabled={!challengeToken}
      />

      <TutorialCard
        title="Obtain native auth token"
        codeSample={nativeAuthTokenSample}
        outputResult={
          nativeAuthToken
            ? `nativeAuthToken = "${nativeAuthToken}"
            
Normally, you would now send this token to your server, which would then validate it.
Go and check it on:
https://utils.multiversx.com/auth (switch to Devnet)               
          `
            : undefined
        }
        actionButtonHandler={getNativeAuthToken}
        actionButtonDisabled={!address || !challengeTokenSignature}
      />
    </>
  );
};
