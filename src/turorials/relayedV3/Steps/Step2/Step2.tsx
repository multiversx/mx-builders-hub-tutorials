import { useDispatch } from "react-redux";
import { unlockStep } from "../../../../redux";
import { Button } from "@material-tailwind/react";

export const Step2 = () => {
  const dispatch = useDispatch();
  const unlock = () => {
    dispatch(unlockStep());
  };

  return (
    <>
      this is step2{" "}
      <Button placeholder="" className="" onClick={unlock}>
        unlock
      </Button>
    </>
  );
};
