import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { PresentationChartBarIcon } from "@heroicons/react/24/solid";
import { PropsWithChildren } from "react";
import { routeNames } from "../../routes";
import { useNavigate } from "react-router-dom";

export const SideBarLayout = ({ children }: PropsWithChildren) => {
  const routes = Object.values(routeNames.dashboard.children);
  const navigate = useNavigate();
  return (
    <div className="flex">
      <div>
        <Card
          placeholder=""
          className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5"
        >
          <div className="mb-2 p-4">
            <Typography placeholder="" variant="h5" color="blue-gray">
              Tutorials
            </Typography>
          </div>
          <List placeholder="">
            {routes.map((route, i) => {
              return (
                <ListItem
                  key={i}
                  placeholder=""
                  onClick={() => navigate(route.name)}
                >
                  <ListItemPrefix placeholder="">
                    <PresentationChartBarIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  {route.displayName}
                </ListItem>
              );
            })}
          </List>
        </Card>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};
