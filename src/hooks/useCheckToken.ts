import { useEffect, useState } from "react";

export const useCheckToken = ({ jwt }: { jwt: string | null | undefined }) => {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (jwt) {
      const decodedJwt = JSON.parse(atob(jwt.split(".")[1]));
      if (decodedJwt.exp * 1000 < Date.now()) {
        setIsTokenValid(false);
      } else {
        setIsTokenValid(true);
      }
    } else {
      setIsTokenValid(false);
    }
  }, [isTokenValid, jwt]);

  return { isTokenValid, isLoading };
};
