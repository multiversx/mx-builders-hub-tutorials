import { NativeAuthClient } from "@multiversx/sdk-native-auth-client";

export const getNativeAuthToken = async ({
  address,
  challengeToken,
  challengeTokenSignature,
}: {
  address: string;
  challengeToken: string;
  challengeTokenSignature: string;
}) => {
  const client = new NativeAuthClient();
  return client.getToken(address, challengeToken, challengeTokenSignature);
};
