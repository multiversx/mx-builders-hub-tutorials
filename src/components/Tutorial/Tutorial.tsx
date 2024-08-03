import { Button, Step, Stepper, Typography } from "@material-tailwind/react";
import { ITutorialProps } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { tutorialStepsSelector } from "../../redux/selectors/tutorialSteps";
import { CenterLayout } from "../CenterLayout";
import { Loader } from "../Loader";
import { useEffect } from "react";
import {
  currentRouteSelector,
  resetTutorial,
  setActiveStep,
  setCurrentRoute,
  setIsFirstStep,
  setIsLastStep,
  setSteps,
} from "../../redux";
import { useLocation } from "react-router-dom";
import { IframeProvider } from "@multiversx/sdk-web-wallet-cross-window-provider/out/IFrameProvider/IframeProvider";
import { CrossWindowProvider } from "@multiversx/sdk-web-wallet-cross-window-provider/out/CrossWindowProvider";

export const Tutorial = ({
  title,
  tutorialMap,
  tutorialMapComponents,
}: ITutorialProps) => {
  const { tutorialSteps, activeStep, isLastStep, isFirstStep } = useSelector(
    tutorialStepsSelector
  );
  const { currentRoute } = useSelector(currentRouteSelector);
  const dispatch = useDispatch();
  const location = useLocation();

  const setStep = (step: number) => {
    dispatch(setActiveStep(step));
  };

  useEffect(() => {
    console.log(title);
    if (currentRoute !== location.pathname) {
      dispatch(setCurrentRoute(location.pathname));
      const iframeProvider = IframeProvider.getInstance();
      iframeProvider.logout();

      const crossWindowProvider = CrossWindowProvider.getInstance();
      crossWindowProvider.logout();
      resetState();
    }
  }, [location]);

  const resetState = () => {
    dispatch(setSteps(tutorialMap));
    dispatch(resetTutorial());
  };

  if (!tutorialSteps) {
    return (
      <CenterLayout>
        <Loader />
      </CenterLayout>
    );
  }

  return (
    <div className="mt-2 ml-3 px-10 ">
      <div className="flex justify-between">
        <div>
          {/* <Typography placeholder="" variant="h3">
            // {title}
          </Typography> */}
        </div>
        <div>
          <Button
            placeholder=""
            onClick={resetState}
            size="sm"
            color="white"
            className="mt-7"
          >
            Reset state
          </Button>
        </div>
      </div>

      <div className="w-full mt-10">
        <Stepper
          className="w-full "
          placeholder=""
          activeStep={activeStep}
          isLastStep={(value) => {
            dispatch(setIsLastStep(value));
          }}
          isFirstStep={(value) => {
            dispatch(setIsFirstStep(value));
          }}
        >
          {tutorialSteps?.map((tutorialStep: any, index: number) => {
            console.log(tutorialStep);
            return (
              <Step key={index} placeholder="" className="">
                {index + 1}
              </Step>
            );
          })}
        </Stepper>
        <div className="mt-16">
          {tutorialMapComponents.map((Component, index) => {
            return (
              <>
                {activeStep === index && (
                  <div key={index}>
                    <div className="mb-8">
                      <Typography placeholder="" variant="h5">
                        {tutorialSteps[index].title}
                      </Typography>
                      <Typography placeholder="" variant="small">
                        {tutorialSteps[index].description}
                      </Typography>
                    </div>
                    <Component />
                  </div>
                )}
              </>
            );
          })}
        </div>
        <div className="mt-16 flex justify-between">
          <Button
            placeholder=""
            onClick={() => setStep(activeStep - 1)}
            disabled={isFirstStep}
            color="white"
          >
            Prev
          </Button>
          <Button
            placeholder=""
            color="white"
            onClick={() => setStep(activeStep + 1)}
            disabled={isLastStep || !tutorialSteps[activeStep].unlocked}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
