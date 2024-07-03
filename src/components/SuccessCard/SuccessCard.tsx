import { CheckCircleIcon } from "@heroicons/react/16/solid";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

export const SuccessCard = ({
  title,
  description,
  button,
}: {
  title: string;
  description: string;
  button?: {
    label: string;
    action: () => void;
  };
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
          <CheckCircleIcon className="w-10 text-green-400" />
          {description}
        </div>
        {button && (
          <Button
            variant="filled"
            color="light-blue"
            type="button"
            onClick={button.action}
            fullWidth
            placeholder=""
            className="flex items-center gap-2 mt-5"
          >
            {button.label}
          </Button>
        )}
      </CardBody>
    </Card>
  );
};
