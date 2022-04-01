import type { Workspace, WorkspaceSvg } from 'blockly';
import React from 'react';
import Blockly from 'blockly';

import BlocklyEditor from 'src/components/blockly/Editor';
import useDeployment from 'src/context/hooks/useDeployment';
import Label from 'src/components/blockly/Label';
import { DeploymentActionKind } from 'src/context/Deployment';
import ConditionalRender from 'src/components/common/ConditionalRender';
import {
    AddressLiteral,
    BigMapLiteral,
    Bls12_381_FrLiteral,
    Bls12_381_G1Literal,
    Bls12_381_G2Literal,
    BooleanLiteral,
    BytesLiteral,
    ChainIdLiteral,
    IntLiteral,
    KeyHashLiteral,
    KeyLiteral,
    LambdaLiteral,
    LeftLiteral,
    ListLiteral,
    MapEntry,
    MapLiteral,
    MutezLiteral,
    NatLiteral,
    NoneLiteral,
    PairLiteral,
    RecordField,
    RecordLiteral,
    RightLiteral,
    SequenceItem,
    SetLiteral,
    SignatureLiteral,
    SomeLiteral,
    StringLiteral,
    TimestampLiteral,
    UnitLiteral,
    VariantLiteral,
} from 'src/components/blockly/blocks/literals';
import { Category, ToolboxSearch } from 'src/components/blockly';

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
        <div className="w-full h-[600px] shadow-lg rounded-md p-2 shadow-xl border-2 border-black dark:border-amber-400 dark:bg-[#1e1e1e]">
            <div className="border-b border-black dark:border-white h-[24px] ">
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
                                wheel: true,
                                startScale: 0.6,
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
                            <ToolboxSearch>
                                <NatLiteral />
                                <IntLiteral />
                                <MutezLiteral />
                                <TimestampLiteral />
                                <UnitLiteral />
                                <BooleanLiteral />
                                <StringLiteral />
                                <AddressLiteral />
                                <BytesLiteral />
                                <ChainIdLiteral />
                                <KeyLiteral />
                                <KeyHashLiteral />
                                <SignatureLiteral />
                                <Bls12_381_FrLiteral />
                                <Bls12_381_G1Literal />
                                <Bls12_381_G2Literal />

                                <ListLiteral />
                                <SetLiteral />
                                <SequenceItem />

                                <MapLiteral />
                                <BigMapLiteral />
                                <MapEntry />

                                <SomeLiteral />
                                <NoneLiteral />

                                <PairLiteral />
                                <RecordLiteral />
                                <RecordField />

                                <LambdaLiteral />

                                <LeftLiteral />
                                <RightLiteral />
                                <VariantLiteral />
                            </ToolboxSearch>

                            <Category name="Basic" categorystyle="literal_category">
                                <NatLiteral />
                                <IntLiteral />
                                <MutezLiteral />
                                <TimestampLiteral />
                                <UnitLiteral />
                                <BooleanLiteral />
                                <StringLiteral />
                                <AddressLiteral />
                                <BytesLiteral />
                                <ChainIdLiteral />
                                <KeyLiteral />
                                <KeyHashLiteral />
                                <SignatureLiteral />
                                <Bls12_381_FrLiteral />
                                <Bls12_381_G1Literal />
                                <Bls12_381_G2Literal />
                            </Category>

                            <Category name="Sequences" categorystyle="literal_category">
                                <ListLiteral />
                                <SetLiteral />
                                <SequenceItem />
                            </Category>

                            <Category name="Maps" categorystyle="literal_category">
                                <MapLiteral />
                                <BigMapLiteral />
                                <MapEntry />
                            </Category>

                            <Category name="Option" categorystyle="literal_category">
                                <SomeLiteral />
                                <NoneLiteral />
                            </Category>

                            <Category name="Pair / Record" categorystyle="literal_category">
                                <PairLiteral />

                                <Label text="-- Record --" web-class="defaultLabel" />
                                <RecordLiteral />
                                <RecordField />
                            </Category>

                            <Category name="Variants" categorystyle="literal_category">
                                <LeftLiteral />
                                <RightLiteral />
                                <VariantLiteral />
                            </Category>
                        </BlocklyEditor>
                    )}
                </ConditionalRender>
            </div>
        </div>
    );
};
export default InitialStorage;
