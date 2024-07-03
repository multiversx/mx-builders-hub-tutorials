import { Button, Step, Stepper, Typography } from "@material-tailwind/react";
import { ITutorialProps } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { tutorialStepsSelector } from "../../redux/selectors/tutorialSteps";
import { CenterLayout } from "../CenterLayout";
import { Loader } from "../Loader";
import { useEffect } from "react";
import {
  setActiveStep,
  setIsFirstStep,
  setIsLastStep,
  setSteps,
} from "../../redux";

export const Tutorial = ({
  title,
  tutorialMap,
  tutorialMapComponents,
}: ITutorialProps) => {
  const { tutorialSteps, activeStep, isLastStep, isFirstStep } = useSelector(
    tutorialStepsSelector
  );
  const dispatch = useDispatch();

  const setStep = (step: number) => {
    dispatch(setActiveStep(step));
  };

  useEffect(() => {
    if (!tutorialSteps) dispatch(setSteps(tutorialMap));

    return () => {
      console.log("herere!");
      dispatch(setSteps(null));
    };
  }, []);

  if (!tutorialSteps) {
    return (
      <CenterLayout>
        <Loader />
      </CenterLayout>
    );
  }

  return (
    <div className="mt-2 ml-3 px-10 ">
      <div>
        <Typography placeholder="" variant="h3">
          {title}
        </Typography>
      </div>

      <div className="w-full mt-10">
        <Stepper
          className="w-full"
          placeholder=""
          activeStep={activeStep}
          isLastStep={(value) => {
            dispatch(setIsLastStep(value));
          }}
          isFirstStep={(value) => {
            dispatch(setIsFirstStep(value));
          }}
        >
          {tutorialSteps?.map((tutorialStep, index) => {
            return (
              <Step key={index} placeholder="">
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
          >
            Prev
          </Button>
          <Button
            placeholder=""
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
