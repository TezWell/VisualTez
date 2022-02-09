import React from 'react';
import ElapsedTime from 'src/components/common/ElapsedTime';

export interface NodeStatus {
    network: string;
    historyMode?: string;
    version?: {
        commit_info: {
            commit_date: string;
            commit_hash: string;
        };
        version: {
            additional_info: Record<string, number>;
            major: number;
            minor: number;
        };
    };
    level?: number;
    timestamp?: string;
    online: boolean;
    synchronizing: boolean;
}

const ShowStatus = ({ online, synchronizing }: { online: boolean; synchronizing: boolean }) =>
    online ? (
        synchronizing ? (
            <p className="text-yellow-600">Synchronizing</p>
        ) : (
            <p className="text-green-600">Online</p>
        )
    ) : (
        <p className="text-red-600">Offline</p>
    );

interface NodesViewProps {
    nodes: NodeStatus[];
}

const NodesView: React.FC<NodesViewProps> = ({ nodes }) => {
    return (
        <div className="flex-1 flex flex-row justify-center items-center p-2 flex-wrap">
            {nodes.map(({ network, historyMode, online, level, version, timestamp, synchronizing }) => (
                <div
                    key={network}
                    className="basis-full md:basis-[40%] border-2 border-black dark:border-white rounded-lg p-2 m-1 shadow-xl "
                >
                    <div className="text-base leading-7 font-bold text-center border-b-2 border-black dark:border-white">
                        <p className="text-base leading-7 font-bold">
                            {network.toUpperCase()} / {historyMode}
                        </p>
                    </div>
                    <div className="mt-2">
                        <table className="table-auto w-full">
                            <tbody>
                                <tr>
                                    <td className="text-base font-bold">Status</td>
                                    <td className={`text-base text-${online ? 'online' : 'offline'} font-bold`}>
                                        <ShowStatus online={online} synchronizing={synchronizing} />
                                    </td>
                                </tr>

                                <tr>
                                    <td className="text-base font-bold">Node Version</td>
                                    <td>
                                        {version?.version?.major}.{version?.version?.minor}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-base font-bold">Latest Block</td>
                                    <td>
                                        {level}
                                        {timestamp ? (
                                            <>
                                                {' / '}
                                                <ElapsedTime timestamp={timestamp} />
                                            </>
                                        ) : null}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-base font-bold">RPC</td>
                                    <td>
                                        <a
                                            href={`https://${network}.visualtez.com/chains/main/blocks/head`}
                                            target={'_blank'}
                                            className="text-cyan-500 no-underline hover:underline"
                                            children={`https://${network}.visualtez.com`}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NodesView;
