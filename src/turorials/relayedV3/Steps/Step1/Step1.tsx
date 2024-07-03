import { useDispatch } from "react-redux";
import { unlockStep } from "../../../../redux";
import { Button } from "@material-tailwind/react";

export const Step1 = () => {
  const dispatch = useDispatch();
  const unlock = () => {
    dispatch(unlockStep());
  };

  return (
    <>
      this is step1{" "}
      <Button placeholder="" className="" onClick={unlock}>
        unlock
      </Button>
    </>
  );
};
