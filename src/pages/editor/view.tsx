import React from 'react';
import type { Workspace, WorkspaceSvg } from 'blockly';
import Blockly from 'blockly';
import { DatabaseIcon, PuzzleIcon, RefreshIcon, ScaleIcon } from '@heroicons/react/solid';
import { FingerPrintIcon, HashtagIcon, TableIcon } from '@heroicons/react/outline';

import { Block, Category, ToolboxSearch, Value } from 'src/components/blockly';
import BlocklyEditor from 'src/components/blockly/Editor';
import BlockKind from 'src/blocks/enums/BlockKind';

import useEditor from 'src/context/hooks/useEditor';
import ToolsBar from './toolbar/ToolsBar';
import Drawer from './toolbar/Drawer';
import Label from 'src/components/blockly/Label';
import { EditorActionKind } from 'src/context/Editor';
import Entrypoint from 'src/components/blockly/blocks/Entrypoint';
import OnChainView from 'src/components/blockly/blocks/OnChainView';
import Contract from 'src/components/blockly/blocks/Contract';
import CategoryIcon from 'src/components/blockly/CategoryIcon';
import {
    BooleanLiteral,
    IntLiteral,
    NatLiteral,
    MutezLiteral,
    TimestampLiteral,
    UnitLiteral,
    StringLiteral,
    AddressLiteral,
    BytesLiteral,
    ChainIdLiteral,
    KeyLiteral,
    KeyHashLiteral,
    SignatureLiteral,
    Bls12_381_FrLiteral,
    Bls12_381_G1Literal,
    Bls12_381_G2Literal,
} from 'src/components/blockly/blocks/literals';
import {
    AddressType,
    Bls12_381_FrType,
    Bls12_381_G1Type,
    Bls12_381_G2Type,
    BooleanType,
    BytesType,
    ChainIdType,
    IntType,
    KeyHashType,
    KeyType,
    MutezType,
    NatType,
    SignatureType,
    StringType,
    TimestampType,
    UnitType,
    NeverType,
    OperationType,
    BigMapType,
    ContractType,
    LambdaType,
    ListType,
    SetType,
    MapType,
    OptionType,
    PairType,
    SaplingStateType,
    SaplingTransactionType,
    TicketType,
    RecordType,
    VariantType,
    RecordVariantTypeEntry,
} from 'src/components/blockly/blocks/types';
import ValueCompilation from 'src/components/blockly/blocks/ValueCompilation';
import TypeCompilation from 'src/components/blockly/blocks/TypeCompilation';
import {
    AssertStatement,
    CallContractStatement,
    DelegateStatement,
    ForEachStatement,
    ForStatement,
    IfStatement,
    TransferStatement,
    VariantMatchCase,
    VariantMatchStatement,
    WhileStatement,
} from 'src/components/blockly/blocks/statements';
import {
    GetAmountExpression,
    GetBalanceExpression,
    GetChainIdExpression,
    GetCurrentContractAddressExpression,
    GetCurrentContractExpression,
    GetLevelExpression,
    GetSenderExpression,
    GetSourceExpression,
    GetTimestampExpression,
    GetTotalVotingPowerExpression,
    GetVotingPowerExpression,
    Blake2b,
    Keccak,
    SHA256,
    SHA3,
    SHA512,
    CheckSignatureExpression,
} from 'src/components/blockly/blocks/expressions';

interface EditorViewProps {
    workspaceRef: React.MutableRefObject<WorkspaceSvg | undefined>;
    compile: () => void;
    onError: (error: string) => void;
}

const EditorView: React.FC<EditorViewProps> = ({ workspaceRef, compile, onError }) => {
    const { workspace, dispatch } = useEditor();

    // const saveSectionSizes = React.useCallback(
    //     (sizes: { editorSize: string; outputSize: string }) => {
    //         updateEditorState({
    //             divider: {
    //                 left: sizes.editorSize,
    //                 right: sizes.outputSize,
    //             },
    //         });
    //         resizeWorkspace();
    //     },
    //     [updateEditorState, resizeWorkspace],
    // );

    const resizeWorkspace = () => {
        if (workspaceRef.current) {
            Blockly.svgResize(workspaceRef.current);
        }
    };

    const onChange = React.useCallback(
        (event: any) => {
            console.error(event.type);
            if (workspaceRef.current) {
                if (
                    [
                        Blockly.Events.BLOCK_CHANGE,
                        Blockly.Events.MOVE,
                        Blockly.Events.DELETE,
                        Blockly.Events.CREATE,
                        Blockly.Events.VAR_RENAME,
                    ].includes(event.type)
                ) {
                    const xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspaceRef.current as Workspace));
                    dispatch({
                        type: EditorActionKind.UPDATE_WORKSPACE,
                        payload: {
                            id: workspace.id,
                            xml,
                        },
                    });
                }
            }
        },
        [dispatch, workspace.id, workspaceRef],
    );

    return (
        <div className="flex flex-row flex-1">
            <div className="flex-1 flex">
                <div className="relative w-full">
                    <BlocklyEditor
                        currentXML={workspace.xml}
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
                            maxScale: 2,
                            minScale: 0.01,
                            scaleSpeed: 1.1,
                        }}
                        onError={onError}
                        onChange={onChange}
                    >
                        <ToolboxSearch>
                            <Contract />
                            <Entrypoint />
                            <OnChainView />
                            {/* Literals */}
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
                            {/* Types */}
                            <NatType />
                            <IntType />
                            <MutezType />
                            <TimestampType />
                            <UnitType />
                            <BooleanType />
                            <StringType />
                            <AddressType />
                            <BytesType />
                            <ChainIdType />
                            <KeyType />
                            <KeyHashType />
                            <SignatureType />
                            <Bls12_381_FrType />
                            <Bls12_381_G1Type />
                            <Bls12_381_G2Type />
                            <OperationType />
                            <NeverType />

                            <ListType />
                            <SetType />
                            <OptionType />
                            <MapType />
                            <BigMapType />
                            <PairType />
                            <LambdaType />
                            <ContractType />
                            <TicketType />
                            <SaplingStateType />
                            <SaplingTransactionType />

                            <RecordType />
                            <VariantType />
                            <RecordVariantTypeEntry />

                            {/* Expressions */}
                            <Blake2b />
                            <SHA256 />
                            <SHA512 />
                            <SHA3 />
                            <Keccak />

                            <CheckSignatureExpression />

                            <GetChainIdExpression />
                            <GetLevelExpression />
                            <GetTimestampExpression />
                            <GetTotalVotingPowerExpression />
                            <GetVotingPowerExpression />
                            <GetAmountExpression />
                            <GetBalanceExpression />
                            <GetCurrentContractExpression />
                            <GetCurrentContractAddressExpression />
                            <GetSenderExpression />
                            <GetSourceExpression />

                            {/* Statements */}
                            <AssertStatement />
                            <IfStatement />
                            <VariantMatchStatement />
                            <VariantMatchCase />
                            {/* Loops */}
                            <ForStatement />
                            <ForEachStatement />
                            <WhileStatement />
                            {/* Operations */}
                            <TransferStatement />
                            <CallContractStatement />
                            <DelegateStatement />
                        </ToolboxSearch>

                        <Category name="Main Blocks" categorystyle="class_category">
                            <CategoryIcon>
                                <PuzzleIcon className="block h-6 w-6 mr-2" />
                            </CategoryIcon>
                            <Contract />
                            <Entrypoint />
                            <OnChainView />
                            <ValueCompilation />
                            <TypeCompilation />
                        </Category>

                        <Category name="Variables" custom="VARIABLE" categorystyle="variables_category">
                            <CategoryIcon>
                                <DatabaseIcon className="block h-6 w-6 mr-2" />
                            </CategoryIcon>
                        </Category>
                        <Category name="Logic (If, Assert, ...)" categorystyle="logic_category">
                            <CategoryIcon>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="block h-6 w-6 mr-2"
                                    stroke="currentColor"
                                    fill="currentColor"
                                    viewBox="120 120 500 500"
                                >
                                    <g>
                                        <path d="m505.96 316.8h-327.28v-39.465h327.28l-25.512-25.512 27.906-27.906 73.152 73.152-73.152 73.148-27.906-27.906z" />
                                        <path d="m505.96 454.93-25.512-25.508 27.906-27.906 73.152 73.152-73.152 73.148-27.906-27.906 25.512-25.512h-119.88l-122.78-157.86h49.996l92.086 118.39z" />
                                    </g>
                                </svg>
                            </CategoryIcon>
                            <AssertStatement />
                            <IfStatement />
                            <VariantMatchStatement />
                            <VariantMatchCase />
                        </Category>
                        <Category name="Loops" categorystyle="control_statements_category">
                            <CategoryIcon>
                                <RefreshIcon className="block h-6 w-6 mr-2" />
                            </CategoryIcon>
                            <ForStatement />
                            <ForEachStatement />
                            <WhileStatement />
                        </Category>

                        <Category name="Transfer, Delegate, ..." categorystyle="operation_statements_category">
                            <CategoryIcon>
                                <ScaleIcon className="block h-6 w-6 mr-2" />
                            </CategoryIcon>
                            <TransferStatement />
                            <CallContractStatement />
                            <DelegateStatement />
                        </Category>

                        <Category name="Cryptography" categorystyle="cryptography_category">
                            <CategoryIcon>
                                <TableIcon className="block h-6 w-6 mr-2" />
                            </CategoryIcon>
                            <Category name="Signature" categorystyle="cryptography_category">
                                <CategoryIcon>
                                    <FingerPrintIcon className="block h-6 w-6 mr-2" />
                                </CategoryIcon>
                                <CheckSignatureExpression />
                            </Category>
                            <Category name="Hashing" categorystyle="cryptography_category">
                                <CategoryIcon>
                                    <HashtagIcon className="block h-6 w-6 mr-2" />
                                </CategoryIcon>
                                <Blake2b />
                                <SHA256 />
                                <SHA512 />
                                <SHA3 />
                                <Keccak />
                            </Category>
                        </Category>

                        <Category name="Block/Tx Properties" categorystyle="blockchain_category">
                            <CategoryIcon>
                                <TableIcon className="block h-6 w-6 mr-2" />
                            </CategoryIcon>
                            <GetChainIdExpression />
                            <GetLevelExpression />
                            <GetTimestampExpression />
                            <GetTotalVotingPowerExpression />
                            <GetVotingPowerExpression />
                            <GetAmountExpression />
                            <GetBalanceExpression />
                            <GetCurrentContractExpression />
                            <GetCurrentContractAddressExpression />
                            <GetSenderExpression />
                            <GetSourceExpression />
                        </Category>

                        <Category name="Values" categorystyle="literal_category">
                            <Category name="Simple" categorystyle="simple_literal_category">
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

                            <Category name="Sequences" categorystyle="sequence_literal_category">
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
                            </Category>

                            <Category name="Maps" categorystyle="map_literal_category">
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
                            </Category>

                            <Category name="Option" categorystyle="option_literal_category">
                                <Block type={BlockKind.some_literal} />
                                <Block type={BlockKind.none_with_type_literal} />
                            </Category>

                            <Category name="Pair / Record" categorystyle="pair_literal_category">
                                <Block type={BlockKind.pair_literal} />

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
                            </Category>

                            <Category name="Lambda" categorystyle="blockchain_category">
                                <Block type={BlockKind.lambda_literal}>
                                    <Value name="TYPE">
                                        <Block type={BlockKind.unit_type} />
                                    </Value>
                                    <Value name="RETURN">
                                        <Block type={BlockKind.unit_literal} />
                                    </Value>
                                </Block>
                            </Category>

                            <Category name="Variants" categorystyle="variant_literal_category">
                                <Block type={BlockKind.left_literal_block} />
                                <Block type={BlockKind.right_literal_block} />
                                <Block type={BlockKind.variant_value} />
                            </Category>
                        </Category>
                        <Category name="Types" categorystyle="type_category">
                            <Category name="Singleton Types" categorystyle="type_category">
                                <NatType />
                                <IntType />
                                <MutezType />
                                <TimestampType />
                                <UnitType />
                                <BooleanType />
                                <StringType />
                                <AddressType />
                                <BytesType />
                                <ChainIdType />
                                <KeyType />
                                <KeyHashType />
                                <SignatureType />
                                <Bls12_381_FrType />
                                <Bls12_381_G1Type />
                                <Bls12_381_G2Type />
                                <OperationType />
                                <NeverType />
                            </Category>

                            <Category name="Container Types" categorystyle="type_category">
                                <ListType />
                                <SetType />
                                <OptionType />
                                <MapType />
                                <BigMapType />
                                <PairType />
                                <LambdaType />
                                <ContractType />
                                <TicketType />
                                <SaplingStateType />
                                <SaplingTransactionType />
                            </Category>

                            <Category name="Artificial Types" categorystyle="type_category">
                                <RecordType />
                                <VariantType />
                                <RecordVariantTypeEntry />
                            </Category>
                        </Category>

                        <Category name="Expressions" categorystyle="container_type_category">
                            <Category name="Typing" categorystyle="logic_category">
                                <Block type={BlockKind.as_type} />
                                <Block type={BlockKind.int_of_nat} />
                                <Block type={BlockKind.nat_of_int} />
                            </Category>
                            <Category name="Equality & Comparison & Logic" categorystyle="logic_category">
                                <Block type={BlockKind.compare_block} />
                                <Block type={BlockKind.and} />
                                <Block type={BlockKind.or} />
                            </Category>
                            <Category name="Arithmetic" categorystyle="logic_category">
                                <Block type={BlockKind.math_block} />
                            </Category>
                            <Category name="Serialization" categorystyle="logic_category">
                                <Block type={BlockKind.pack} />
                                <Block type={BlockKind.unpack} />
                            </Category>
                            <Category name="Record Expressions" categorystyle="logic_category">
                                <Block type={BlockKind.param_access} />
                            </Category>
                            <Category name="Map Expressions" categorystyle="logic_category">
                                <Block type={BlockKind.get_map_entries} />
                                <Block type={BlockKind.get_map_value} />
                                <Block type={BlockKind.map_contains_key} />
                            </Category>
                            <Category name="Pair Expressions" categorystyle="logic_category">
                                <Block type={BlockKind.get_first_pair_element} />
                                <Block type={BlockKind.get_second_pair_element} />
                            </Category>
                            <Category name="List Expressions" categorystyle="logic_category">
                                <Block type={BlockKind.prepend_to_list} />
                            </Category>
                            <Category name="Boolean Expressions" categorystyle="logic_category">
                                <Block type={BlockKind.not} />
                            </Category>
                        </Category>

                        <Category name="Statements" categorystyle="control_statements_category">
                            <Category name="Map Statements" categorystyle="logic_category">
                                <Block type={BlockKind.delete_map_entry} />
                            </Category>
                        </Category>
                    </BlocklyEditor>
                </div>
                <Drawer />
                {/*
                    @TODO : Remove later if not necessary

                    <Sections
                        split="vertical"
                        onChange={([editorSize, outputSize]: string[]) =>
                            onDebouncer(saveSectionSizes, { editorSize, outputSize })
                        }
                    >
                        <Section
                            minSize={'100%'}
                            size={'100%'}
                            // size={(drawer && state.divider?.left) || '100%'}
                            className="relative"
                        >
                        </Section>
                        <Section
                            show={!!drawer}
                            minSize={'300px'}
                            size="300px"
                            // size={state.divider?.right || '30%'}
                        >
                            <Drawer resizeWorkspace={resizeWorkspace} />
                        </Section>
                    </Sections>
                */}
            </div>
            <ToolsBar resizeWorkspace={resizeWorkspace} compile={compile} />
        </div>
    );
};

export default EditorView;
