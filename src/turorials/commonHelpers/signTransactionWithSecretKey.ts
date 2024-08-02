import { ITransaction, TransactionComputer } from "@multiversx/sdk-core/out";
import { UserSecretKey, UserSigner } from "@multiversx/sdk-wallet/out";

export const signTransactionWithSecretKey = async ({
  secretKey,
  transaction,
}: {
  secretKey: string;
  transaction: ITransaction;
}) => {
  const signer = new UserSigner(UserSecretKey.fromString(secretKey));
  const computer = new TransactionComputer();
  const serializedTx = computer.computeBytesForSigning(transaction);
  return await signer.sign(serializedTx);
};
