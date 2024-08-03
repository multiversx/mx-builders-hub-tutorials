import { useDispatch, useSelector } from "react-redux";
import { setKey, tutorialSelector, unlockStep } from "../../../../redux";
import { IframeProvider } from "@multiversx/sdk-web-wallet-cross-window-provider/out/IFrameProvider/IframeProvider";
import { Address, SignableMessage } from "@multiversx/sdk-core";
import { signMessageSample } from "../codeExamples";
import { TutorialCard } from "../../../../components/TutorialCard";
import { useEffect } from "react";

export const Step3 = () => {
  const {
    tutorialData: { signedMessage, address: stateAddress },
  } = useSelector(tutorialSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    if (stateAddress) {
      (async () => {
        const provider = IframeProvider.getInstance();
        provider.setWalletUrl("https://devnet-wallet.multiversx.com");
        await provider.init();
        provider.setAddress(stateAddress);
      })();
    }
  }, []);

  const signMessage = async () => {
    const provider = IframeProvider.getInstance();

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
      <TutorialCard
        title="Prepare and sign message"
        codeSample={signMessageSample}
        outputResult={
          signedMessage ? `signedMessage = ${signedMessage}` : undefined
        }
        actionButtonHandler={signMessage}
      />
    </>
  );
};
