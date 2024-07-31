import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { vs2015, darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface ITutorialCardProps {
  title: string;
  codeSample?: string;
  outputResult?: string;
  actionButtonLabel?: string;
  actionButtonHandler: () => void;
  actionButtonDisabled?: boolean;
}

export const TutorialCard = ({
  title,
  codeSample,
  outputResult,
  actionButtonLabel,
  actionButtonHandler,
  actionButtonDisabled = false,
}: ITutorialCardProps) => {
  return (
    <>
      <Card placeholder="" className="mt-6 w-full">
        <CardBody placeholder="">
          <Typography
            placeholder=""
            variant="h5"
            color="blue-gray"
            className="mb-2"
          >
            {title}
          </Typography>

          {codeSample && (
            <SyntaxHighlighter language="javascript" style={vs2015}>
              {codeSample}
            </SyntaxHighlighter>
          )}
        </CardBody>
        <CardFooter placeholder="" className="pt-0">
          {outputResult ? (
            <>
              <Typography
                placeholder=""
                variant="paragraph"
                color="blue-gray"
                className="mb-2"
              >
                Output:
              </Typography>
              <SyntaxHighlighter language="javascript" style={darcula}>
                {outputResult}
              </SyntaxHighlighter>
            </>
          ) : (
            <Button
              disabled={actionButtonDisabled}
              onClick={actionButtonHandler}
              placeholder=""
            >
              {actionButtonLabel || "Generate"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
};
