import React from 'react';

import BlocklyEditor from 'src/components/blockly/Editor';

const InitialStorage = () => {
    const workspaceRef = React.useRef<any>();

    return (
        <div className="relative w-full h-96 shadow-lg rounded-md p-2 border-2 border-black dark:border-white bg-[#F4F0FD] dark:bg-[#1e1e1e]">
            <div className="relative border-b border-black dark:border-white" style={{ height: 24 }}>
                <label className="block text-sm font-medium">Initial Storage</label>
            </div>
            <div className="relative w-full" style={{ height: 'calc(100% - 24px)' }}>
                <BlocklyEditor
                    noToolbox
                    workspaceRef={workspaceRef}
                    trashcan={false}
                    move={{
                        scrollbars: true,
                        drag: true,
                        wheel: true,
                    }}
                    comments={true}
                    grid={{
                        spacing: 50,
                        length: 3,
                        colour: '#ccc',
                        snap: true,
                    }}
                    zoom={{
                        controls: true,
                        wheel: true,
                        startScale: 0.8,
                        maxScale: 4,
                        minScale: 0.25,
                        scaleSpeed: 1.1,
                    }}
                    renderer="zelos"
                />
            </div>
        </div>
    );
};
export default InitialStorage;
