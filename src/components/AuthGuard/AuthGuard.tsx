import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { routeNames } from "../../routes";
import { useCheckToken } from "../../hooks";
import { useSelector } from "react-redux";
import { accountSelector } from "../../redux";

export const AuthGuard = ({ children }: PropsWithChildren) => {
  const { jwt } = useSelector(accountSelector);
  const { isTokenValid, isLoading: tokenDataLoading } = useCheckToken({ jwt });

  if (!isTokenValid && !tokenDataLoading) {
    return <Navigate to={routeNames.home.name} />;
  }

  return <>{children}</>;
};
