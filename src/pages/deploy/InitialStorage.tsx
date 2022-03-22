import type { Workspace, WorkspaceSvg } from 'blockly';
import React from 'react';
import Blockly from 'blockly';

import BlockKind from 'src/blocks/enums/BlockKind';
import Block from 'src/components/blockly/Block';
import BlocklyEditor from 'src/components/blockly/Editor';
import Separator from 'src/components/blockly/Separator';
import useDeployment from 'src/context/hooks/useDeployment';
import Label from 'src/components/blockly/Label';
import Value from 'src/components/blockly/Value';
import { DeploymentActionKind } from 'src/context/Deployment';
import ConditionalRender from 'src/components/common/ConditionalRender';

interface InitialStorageProps {
    workspaceRef: React.MutableRefObject<WorkspaceSvg | undefined>;
}
const InitialStorage: React.FC<InitialStorageProps> = ({ workspaceRef }) => {
    const { state, dispatch } = useDeployment();

    const onChange = React.useCallback(
        (event: any) => {
            if (
                [
                    Blockly.Events.BLOCK_CHANGE,
                    Blockly.Events.MOVE,
                    Blockly.Events.DELETE,
                    Blockly.Events.CREATE,
                ].includes(event.type)
            ) {
                if (workspaceRef.current) {
                    const xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspaceRef.current as Workspace));
                    dispatch({
                        type: DeploymentActionKind.UPDATE_STATE,
                        payload: {
                            storageXML: xml,
                        },
                    });
                }
            }
        },
        [dispatch, workspaceRef],
    );

    return (
        <div className="w-full h-96 shadow-lg rounded-md p-2 shadow-xl border-2 border-black dark:border-amber-400 dark:bg-[#1e1e1e]">
            <div className="border-b border-black dark:border-white" style={{ height: 24 }}>
                <label className="block text-sm font-medium">Initial Storage</label>
            </div>
            <div className="relative w-full" style={{ height: 'calc(100% - 24px)' }}>
                <ConditionalRender props={{ storageXML: state.storageXML }}>
                    {({ storageXML }) => (
                        <BlocklyEditor
                            currentXML={storageXML}
                            workspaceRef={workspaceRef}
                            trashcan={false}
                            comments={true}
                            grid={{
                                spacing: 50,
                                length: 3,
                                colour: '#ccc',
                            }}
                            zoom={{
                                controls: true,
                                wheel: false,
                                startScale: 0.8,
                                maxScale: 4,
                                minScale: 0.25,
                                scaleSpeed: 1.1,
                            }}
                            move={{
                                drag: true,
                                scrollbars: true,
                            }}
                            onChange={onChange}
                        >
                            <Block type={BlockKind.nat_literal} />
                            <Block type={BlockKind.int_literal} />
                            <Block type={BlockKind.mutez_literal} />
                            <Block type={BlockKind.timestamp_literal} />
                            <Block type={BlockKind.unit_literal} />
                            <Block type={BlockKind.boolean_literal} />
                            <Block type={BlockKind.string_literal} />
                            <Block type={BlockKind.address_literal} />
                            <Block type={BlockKind.bytes_literal} />
                            <Block type={BlockKind.chain_id_literal} />
                            <Block type={BlockKind.key_literal} />
                            <Block type={BlockKind.key_hash_literal} />
                            <Block type={BlockKind.signature_literal} />
                            <Block type={BlockKind.bls12_381_fr_literal} />
                            <Block type={BlockKind.bls12_381_g1_literal} />
                            <Block type={BlockKind.bls12_381_g2_literal} />

                            <Separator gap={40} />
                            <Block type={BlockKind.pair_literal} />
                            <Separator gap={40} />

                            <Label text="-- Option --" web-class="defaultLabel" />
                            <Block type={BlockKind.some_literal} />
                            <Block type={BlockKind.none_literal} />

                            <Label text="-- Sequences --" web-class="defaultLabel" />

                            <Block type={BlockKind.list_literal}>
                                <Value name="items">
                                    <Block type={BlockKind.sequence_item} />
                                </Value>
                            </Block>
                            <Block type={BlockKind.set_literal}>
                                <Value name="items">
                                    <Block type={BlockKind.sequence_item} />
                                </Value>
                            </Block>
                            <Block type={BlockKind.sequence_item} />

                            <Label text="-- Maps --" web-class="defaultLabel" />

                            <Block type={BlockKind.map_literal}>
                                <Value name="entries">
                                    <Block type={BlockKind.map_entry} />
                                </Value>
                            </Block>
                            <Block type={BlockKind.big_map_literal}>
                                <Value name="entries">
                                    <Block type={BlockKind.map_entry} />
                                </Value>
                            </Block>
                            <Block type={BlockKind.map_entry} />

                            <Label text="-- Record --" web-class="defaultLabel" />

                            <Block type={BlockKind.record_literal}>
                                <Value name="entries">
                                    <Block type={BlockKind.record_field} />
                                </Value>
                                <Value name="entries">
                                    <Block type={BlockKind.record_field} />
                                </Value>
                            </Block>
                            <Block type={BlockKind.record_field} />
                        </BlocklyEditor>
                    )}
                </ConditionalRender>
            </div>
        </div>
    );
};
export default InitialStorage;
