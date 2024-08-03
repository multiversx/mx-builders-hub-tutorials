import { useDispatch, useSelector } from "react-redux";
import { generateNativeAuthChallengeToken } from "../commonHelpers";
import { setKey, tutorialSelector, unlockStep } from "../../redux";
import { getNativeAuthToken } from "../commonHelpers/getNativeAuthToken";

export const useProvidersCommon = () => {
  const {
    tutorialData: { challengeToken, challengeTokenSignature, address },
  } = useSelector(tutorialSelector);

  const dispatch = useDispatch();

  const setChallengeTokenToState = async () => {
    const challengeToken = await generateNativeAuthChallengeToken();
    dispatch(setKey({ key: "challengeToken", value: challengeToken }));
  };

  const setNativeAuthTokenToState = async () => {
    const nativeAuthToekn = await getNativeAuthToken({
      address,
      challengeToken,
      challengeTokenSignature,
    });
    dispatch(unlockStep());
    dispatch(setKey({ key: "nativeAuthToken", value: nativeAuthToekn }));
  };

  return { setChallengeTokenToState, setNativeAuthTokenToState };
};
