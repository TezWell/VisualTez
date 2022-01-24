import React from 'react';
import type { WorkspaceSvg } from 'blockly';
import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';

import BlocklyEditor from 'src/components/blockly/Editor';
import Separator from 'src/components/blockly/Separator';
import useDeployment from 'src/context/hooks/useDeployment';
interface InitialStorageProps {
    workspaceRef: React.MutableRefObject<WorkspaceSvg | undefined>;
}
const InitialStorage: React.FC<InitialStorageProps> = ({ workspaceRef }) => {
    const { state } = useDeployment();

    return (
        <div className="relative w-full h-96 shadow-lg rounded-md p-2 border-2 border-black dark:border-white bg-[#F4F0FD] dark:bg-[#1e1e1e]">
            <div className="relative border-b border-black dark:border-white" style={{ height: 24 }}>
                <label className="block text-sm font-medium">Initial Storage</label>
            </div>
            <div className="relative w-full" style={{ height: 'calc(100% - 24px)' }}>
                {state.storageXML ? (
                    <BlocklyEditor
                        currentXML={state.storageXML}
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
                    >
                        <Block type={BlockKind.unit_literal} />
                        <Block type={BlockKind.string_literal} />
                        <Block type={BlockKind.some_literal} />
                        <Block type={BlockKind.none_literal} />
                        <Block type={BlockKind.nat_literal} />
                        <Block type={BlockKind.int_literal} />
                        <Block type={BlockKind.address_literal} />
                        <Block type={BlockKind.boolean_literal} />
                        <Separator gap={40} />
                        <Block type={BlockKind.record_literal} />
                        <Block type={BlockKind.record_field} />
                        <Separator gap={40} />
                    </BlocklyEditor>
                ) : null}
            </div>
        </div>
    );
};
export default InitialStorage;
