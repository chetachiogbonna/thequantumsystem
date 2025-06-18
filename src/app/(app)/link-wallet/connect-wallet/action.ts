"use server";

import { connectUserWalletConnect } from "@/lib/actions/connect-wallet";

export const connectUserWalletConnectAction = async ( 
    uid: string,
    type: WalletConnectType,
    value: string | KeystoreEntry
) => {  
    return await connectUserWalletConnect(uid, type, value);
}
