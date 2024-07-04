import { Navigate } from "react-router-dom";
import { routeNames } from "../../routes";

export const Home = () => {
  return <Navigate to={routeNames.dashboard.children.extensionProvider.name} />;
};
