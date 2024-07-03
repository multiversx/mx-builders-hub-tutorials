import { ArrowPathIcon, XCircleIcon } from "@heroicons/react/16/solid";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

export const ErrorCard = ({
  title,
  description,
  reset,
  buttonLabel,
}: {
  title: string;
  description: string;
  reset: () => void;
  buttonLabel: string;
}) => {
  return (
    <Card placeholder={undefined} className="md:w-96 ">
      <CardBody placeholder={undefined}>
        <CardHeader placeholder={undefined} className="relative mb-8 p-2">
          <Typography
            variant="paragraph"
            color="gray"
            className="text-center"
            placeholder={undefined}
          >
            {title}
          </Typography>
        </CardHeader>
        <div className="flex flex-row justify-center gap-3">
          <XCircleIcon className="w-10 text-red-400" />
          {description}
        </div>
        <Button
          variant="filled"
          color="light-blue"
          type="button"
          onClick={reset}
          fullWidth
          placeholder=""
          className="flex items-center gap-2 mt-5"
        >
          <ArrowPathIcon className="h-5 w-5 stroke-2" strokeWidth={2} />
          {buttonLabel}
        </Button>
      </CardBody>
    </Card>
  );
};
