import React from 'react';
import { ExclamationIcon } from '@heroicons/react/outline';

import useTezos from 'src/context/hooks/useTezos';
import Avatar from 'src/components/common/Avatar';

const AccountInformation = () => {
    const { account, error } = useTezos();

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center p-5">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationIcon className="block h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="text-center mt-5">
                    <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
                </div>
            </div>
        );
    }

    if (account) {
        return (
            <div className=" container mx-auto rounded flex flex-col md:flex-row justify-center items-center p-5 shadow-xl border-2 border-amber-500 dark:border-amber-400">
                <div className="flex items-center justify-center p-2 rounded-full border-2 border-amber-500 dark:border-amber-400">
                    <Avatar value={account.address} size={64} />
                </div>
                <div className="m-2" />
                <div className="flex flex-col w-full">
                    <div className="flex shadow-sm w-full">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            Address
                        </span>
                        <span className="flex-1 px-3 rounded-r-md border border-gray-300 bg-gray-50 text-gray-500 text-lg p-2 truncate">
                            {account.address}
                        </span>
                    </div>
                    <div className="flex shadow-sm mt-4 w-full">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            Balance
                        </span>
                        <span className="flex-1 px-3 rounded-r-md border border-gray-300 bg-gray-50 text-gray-500 text-lg p-2">
                            {account.balance / 1_000_000} ꜩ
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default AccountInformation;
