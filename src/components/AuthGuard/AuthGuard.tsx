import { PropsWithChildren } from "react";

export const AuthGuard = ({ children }: PropsWithChildren) => {
  // const { jwt } = useSelector(accountSelector);
  // const { isTokenValid, isLoading: tokenDataLoading } = useCheckToken({ jwt });

  // if (!isTokenValid && !tokenDataLoading) {
  //   return <Navigate to={routeNames.home.name} />;
  // }

  return <>{children}</>;
};
