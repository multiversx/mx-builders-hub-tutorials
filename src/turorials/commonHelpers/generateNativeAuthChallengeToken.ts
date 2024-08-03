import { NativeAuthClient } from "@multiversx/sdk-native-auth-client";

export const generateNativeAuthChallengeToken = async () => {
  const client = new NativeAuthClient({
    apiUrl: "https://devnet-api.multiversx.com",
    expirySeconds: 7200,
  });
  return await client.initialize();
};
