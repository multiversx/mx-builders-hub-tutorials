export const challengeTokenSample = `
import { NativeAuthClient } from "@multiversx/sdk-native-auth-client";

const client = new NativeAuthClient({
    apiUrl: "https://devnet-api.multiversx.com",
    expirySeconds: 7200,
  });

const challengeToken = await client.initialize();
`;

export const nativeAuthTokenSample = `
import { NativeAuthClient } from "@multiversx/sdk-native-auth-client";

const client = new NativeAuthClient();
const nativeAuthToekn = client.getToken(
  address,
  challengeToken,
  challengeTokenSignature
);
`;
