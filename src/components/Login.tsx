"use client";
import { WalletConnectLoginButton, ExtensionLoginButton } from "@multiversx/sdk-dapp/UI";
import { useGetAccountInfo, useLogout } from "@multiversx/sdk-dapp/hooks";

export default function Login() {
  const { address } = useGetAccountInfo();
  const logout = useLogout();

  if (address)
    return (
      <div className="p-6 border border-green-400 rounded-lg text-green-800 bg-green-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium mb-2">Conectat cu succes!</p>
            <p className="text-xs break-all">
              Adresă: <span className="font-mono font-semibold">{address}</span>
            </p>
          </div>
          <button
            onClick={logout}
            className="ml-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Deconectează-te
          </button>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-4 p-6 border border-gray-200 rounded-lg bg-white">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Conectează-te la MultiversX
      </h3>
      <WalletConnectLoginButton
        callbackRoute="/"
        loginButtonText="Conectează-te cu xPortal / WalletConnect"
        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
      />
      <ExtensionLoginButton
        callbackRoute="/"
        loginButtonText="Conectează-te cu Extension"
        className="w-full px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
      />
    </div>
  );
}
