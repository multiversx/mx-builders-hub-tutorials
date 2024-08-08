import { useDispatch, useSelector } from "react-redux";
import { setKey, tutorialSelector } from "../../../../redux";
import { challengeTokenSignatureAndAddressSample } from "../codeExamples";
import { MetamaskProxyProvider } from "@multiversx/sdk-metamask-proxy-provider";
import { TutorialCard } from "../../../../components/TutorialCard";
import { useProvidersCommon } from "../../../commonHooks";
import {
  challengeTokenSample,
  nativeAuthTokenSample,
} from "../../../commonCodeSamples";

export const Step1 = () => {
  const {
    tutorialData: {
      challengeToken,
      challengeTokenSignature,
      address,
      nativeAuthToken,
    },
  } = useSelector(tutorialSelector);

  const { setChallengeTokenToState, setNativeAuthTokenToState } =
    useProvidersCommon();
  const dispatch = useDispatch();

  const loginWithToken = async () => {
    const provider = MetamaskProxyProvider.getInstance();
    provider.setWalletUrl("https://devnet-snap-wallet.multiversx.com");
    await provider.init();
    await provider.login({ token: challengeToken });

    const address = provider.account.address;
    const signature = provider.account.signature;

    dispatch(setKey({ key: "address", value: address }));
    dispatch(setKey({ key: "challengeTokenSignature", value: signature }));
  };

  return (
    <>
      <TutorialCard
        title="Generate nativeAuth challenge token"
        codeSample={challengeTokenSample}
        outputResult={
          challengeToken ? `challengeToken = "${challengeToken}"` : undefined
        }
        actionButtonHandler={setChallengeTokenToState}
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
        actionButtonHandler={setNativeAuthTokenToState}
        actionButtonDisabled={!address || !challengeTokenSignature}
      />
    </>
  );
};
