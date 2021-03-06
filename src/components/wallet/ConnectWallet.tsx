import React from 'react';

import useTezos from 'src/context/hooks/useTezos';
import Button from 'src/components/common/Button';
import AccountInformation from './AccountInformation';

const ConnectWallet = () => {
    const { connectWallet, walletStatus } = useTezos();

    return (
        <div className="flex flex-col">
            <Button
                onClick={() => connectWallet(false)}
                className="items-center justify-center bg-yellow-500 hover:bg-yellow-400 border-yellow-700 hover:border-yellow-500 p-2"
            >
                {walletStatus.connected ? 'Reconnect' : 'Connect'} Wallet
            </Button>
            <div className="border-t m-3 border-black dark:border-white" />
            <AccountInformation />
        </div>
    );
};

export default ConnectWallet;
