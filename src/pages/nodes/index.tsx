import React from 'react';

import settings from 'src/settings.json';
import Http from 'src/utils/http';
import Logger from 'src/utils/logger';
import NodesView, { NodeStatus } from './view';

const Nodes = () => {
    const isMounted = React.useRef(false);
    const intervalId = React.useRef(null as unknown as ReturnType<typeof setInterval>);
    const [nodes, setNodes] = React.useState<NodeStatus[]>([]);

    const updateNodeStatus = React.useCallback(async () => {
        const nodes = await Promise.all(
            settings.networks.map(async (network: string) => {
                const rpc = `https://${network}.visualtez.com`;
                return await Http.get(`${rpc}/chains/main/blocks/head/header`, { timeout: 5000 })
                    .then(async ({ data: { timestamp, level } }) => {
                        // Get version info
                        const version = await Http.get(`${rpc}/version`, { timeout: 5000 })
                            .then(({ data }) => data)
                            .catch(() => ({}));

                        // Get history mode
                        const historyMode = await Http.get(`${rpc}/chains/main/checkpoint`, { timeout: 5000 })
                            .then(({ data: { history_mode } }) =>
                                typeof history_mode === 'string' ? history_mode : Object.keys(history_mode)[0],
                            )
                            .catch(() => 'unknown')
                            .then((s) => s);

                        return {
                            network,
                            online: true,
                            synchronizing: Date.now() - new Date(timestamp).getTime() > settings.node_monitor.max_delay,
                            timestamp,
                            level,
                            version,
                            historyMode,
                        };
                    })
                    .catch((e) => {
                        Logger.debug(e);
                        return {
                            network: network,
                            online: false,
                            synchronizing: false,
                        };
                    });
            }),
        );
        if (isMounted.current) {
            setNodes(nodes);
        }
    }, []);

    React.useEffect(() => {
        isMounted.current = true;

        updateNodeStatus();
        intervalId.current = setInterval(updateNodeStatus, settings.node_monitor.interval);

        return () => {
            isMounted.current = false;
            clearInterval(intervalId.current);
        };
    }, [updateNodeStatus]);

    return <NodesView nodes={nodes} />;
};

export default Nodes;
