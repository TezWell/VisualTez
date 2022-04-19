import React from 'react';
import type { Workspace, WorkspaceSvg } from 'blockly';
import Blockly from 'blockly';
import { DatabaseIcon, PuzzleIcon, ReceiptRefundIcon, RefreshIcon, ScaleIcon } from '@heroicons/react/solid';
import {
    FingerPrintIcon,
    HashtagIcon,
    TableIcon,
    BeakerIcon,
    CubeTransparentIcon,
    TagIcon,
    VariableIcon,
    EyeIcon,
    SwitchHorizontalIcon,
    CalculatorIcon,
    PencilIcon,
} from '@heroicons/react/outline';

import { Category, ToolboxSearch } from 'src/components/blockly';
import BlocklyEditor from 'src/components/blockly/Editor';

import useEditor from 'src/context/hooks/useEditor';
import ToolsBar from './toolbar/ToolsBar';
import Drawer from './toolbar/Drawer';
import Label from 'src/components/blockly/Label';
import { EditorActionKind } from 'src/context/Editor';
import Entrypoint from 'src/components/blockly/blocks/Entrypoint';
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
    MapLiteral,
    BigMapLiteral,
    MapEntry,
    ListLiteral,
    SetLiteral,
    SequenceItem,
    SomeLiteral,
    NoneWithTypeLiteral,
    LambdaLiteral,
    PairLiteral,
    RecordLiteral,
    RecordField,
    LeftLiteral,
    RightLiteral,
    VariantLiteral,
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
    OrType,
} from 'src/components/blockly/blocks/types';
import ValueCompilation from 'src/components/blockly/blocks/ValueCompilation';
import TypeCompilation from 'src/components/blockly/blocks/TypeCompilation';
import {
    AddElementToSetStatement,
    AddToListStatement,
    AssertStatement,
    CallContractStatement,
    CreateContractStatement,
    DelegateStatement,
    DeleteMapEntryStatement,
    FailWithStatement,
    ForEachStatement,
    ForStatement,
    IfStatement,
    RemoveElementFromSetStatement,
    TransferStatement,
    VariableSetterStatement,
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
    OrExpression,
    XorExpression,
    AndExpression,
    NotExpression,
    Concat,
    SizeOf,
    Slice,
    CallView,
    OnChainView,
    ImplicitAccountExpression,
    HashKey,
    GetSomeExpression,
    IsNoneExpression,
    IsSomeExpression,
    CallLambda,
    PackExpression,
    UnpackExpression,
    GetMapValueExpression,
    GetMapValuesExpression,
    GetMapKeysExpression,
    GetMapEntriesExpression,
    MapConstainsKeyExpression,
    PrependToListExpression,
    GetSecondElementExpression,
    GetFirstElementExpression,
    CompareExpression,
    AsTypeExpression,
    IntOfNatExpression,
    NatOfIntExpression,
    GetElementsFromSetExpression,
    GetContractExpression,
    AddressOfContractExpression,
    ArithmeticExpression,
    ABSExpression,
    NegateExpression,
    AccessRecordPropertyExpression,
    GetStorageExpression,
    GetVariableExpression,
    ModExpression,
    EdivExpression,
    ShiftRightExpression,
    ShiftLeftExpression,
    SetContainsElementExpression,
} from 'src/components/blockly/blocks/expressions';
import { isDevelopment } from 'src/utils';
import Logger from 'src/utils/logger';
import { validateBlockLocation } from 'src/blocks/utils/workspace';
import { IsVariantExpression, OpenVariantExpression } from 'src/components/blockly/blocks/expressions/variant';
import {
    Testing_AddressOfAccount,
    Testing_BalanceOfAccount,
    Testing_CreateImplicitAccount,
    Testing_OriginateContract,
    TestTarget,
} from 'src/components/blockly/blocks/Testing';

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
            Logger.debug(event.type);
            if (workspaceRef.current) {
                if (event.type === Blockly.Events.MOVE) {
                    validateBlockLocation(workspaceRef.current, event.blockId);
                }
                if (
                    [
                        Blockly.Events.BLOCK_CHANGE,
                        Blockly.Events.MOVE,
                        Blockly.Events.DELETE,
                        Blockly.Events.CREATE,
                        Blockly.Events.VAR_RENAME,
                        Blockly.Events.CHANGE,
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

                            <ListLiteral />
                            <SetLiteral />
                            <SequenceItem />

                            <MapLiteral />
                            <BigMapLiteral />
                            <MapEntry />

                            <SomeLiteral />
                            <NoneWithTypeLiteral />

                            <PairLiteral />
                            <RecordLiteral />
                            <RecordField />

                            <LambdaLiteral />

                            <LeftLiteral />
                            <RightLiteral />
                            <VariantLiteral />

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
                            <OrType />
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
                            <HashKey />

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

                            <CompareExpression />
                            <OrExpression />
                            <AndExpression />
                            <XorExpression />
                            <NotExpression />

                            <PrependToListExpression />
                            <Concat />
                            <SizeOf />
                            <Slice />

                            <ImplicitAccountExpression />

                            <GetSomeExpression />
                            <IsSomeExpression />
                            <IsNoneExpression />

                            <CallView />
                            <CallLambda />

                            <PackExpression />
                            <UnpackExpression />

                            <GetMapEntriesExpression />
                            <GetMapKeysExpression />
                            <GetMapValuesExpression />
                            <GetMapValueExpression />
                            <MapConstainsKeyExpression />

                            <GetFirstElementExpression />
                            <GetSecondElementExpression />

                            <AsTypeExpression />
                            <IntOfNatExpression />
                            <NatOfIntExpression />

                            <ArithmeticExpression />
                            <ABSExpression />
                            <NegateExpression />
                            <ModExpression />
                            <EdivExpression />
                            <ShiftLeftExpression />
                            <ShiftRightExpression />

                            <AccessRecordPropertyExpression />

                            <GetElementsFromSetExpression />
                            <AddressOfContractExpression />
                            <GetStorageExpression />
                            <GetVariableExpression />

                            <IsVariantExpression />
                            <OpenVariantExpression />

                            {/* Statements */}
                            <AssertStatement />
                            <IfStatement />
                            <VariantMatchStatement />
                            <VariantMatchCase />
                            <AddToListStatement />
                            <DeleteMapEntryStatement />
                            <RemoveElementFromSetStatement />
                            <AddElementToSetStatement />
                            <VariableSetterStatement />

                            {/* Loops */}
                            <ForStatement />
                            <ForEachStatement />
                            <WhileStatement />
                            {/* Operations */}
                            <TransferStatement />
                            <CallContractStatement />
                            <DelegateStatement />
                            <CreateContractStatement />

                            {/* Testing */}
                            <TestTarget />
                            <Testing_CreateImplicitAccount />
                            <Testing_OriginateContract />
                        </ToolboxSearch>

                        <Category name="Main Blocks" categorystyle="class_category">
                            <CategoryIcon>
                                <PuzzleIcon className="block h-6 w-6 mr-2" />
                            </CategoryIcon>
                            <Contract />
                            <Entrypoint />
                            <ValueCompilation />
                            <TypeCompilation />
                        </Category>

                        <Category name="Values" categorystyle="literal_category">
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
                                <NoneWithTypeLiteral />
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
                        </Category>
                        <Category name="Types" categorystyle="type_category">
                            <Category name="Singleton Types" categorystyle="type_category">
                                <CategoryIcon>
                                    <TagIcon className="block h-6 w-6 mr-2" />
                                </CategoryIcon>
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
                                <CategoryIcon>
                                    <TagIcon className="block h-6 w-6 mr-2" />
                                </CategoryIcon>
                                <ListType />
                                <SetType />
                                <OptionType />
                                <MapType />
                                <BigMapType />
                                <PairType />
                                <OrType />
                                <LambdaType />
                                <ContractType />
                                <TicketType />
                                <SaplingStateType />
                                <SaplingTransactionType />
                            </Category>

                            <Category name="Artificial Types" categorystyle="type_category">
                                <CategoryIcon>
                                    <TagIcon className="block h-6 w-6 mr-2" />
                                </CategoryIcon>
                                <RecordType />
                                <VariantType />
                                <RecordVariantTypeEntry />
                            </Category>
                        </Category>

                        <Category name="Variables" custom="VARIABLE" categorystyle="variables_category">
                            <CategoryIcon>
                                <VariableIcon className="block h-6 w-6 mr-2" />
                            </CategoryIcon>
                        </Category>

                        <Category name="Logic (If, Assert, ...)" categorystyle="logic_category">
                            <CompareExpression />
                            <OrExpression />
                            <AndExpression />
                            <XorExpression />
                            <NotExpression />

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
                            <FailWithStatement />
                            <IfStatement />
                            <VariantMatchStatement />
                            <VariantMatchCase />
                        </Category>
                        <Category name="Loops" categorystyle="loop_statements_category">
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
                            <CreateContractStatement />
                        </Category>

                        <Category name="Block/Tx Properties" categorystyle="blockchain_category">
                            <CategoryIcon>
                                <CubeTransparentIcon className="block h-6 w-6 mr-2" />
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

                        <Category name="Cryptography" categorystyle="cryptography_category">
                            <CategoryIcon>
                                <FingerPrintIcon className="block h-6 w-6 mr-2" />
                            </CategoryIcon>

                            <Label text="-- Signatures --" web-class="defaultLabel" />

                            <CheckSignatureExpression />

                            <Label text="-- Hashes --" web-class="defaultLabel" />

                            <Blake2b />
                            <SHA256 />
                            <SHA512 />
                            <SHA3 />
                            <Keccak />

                            <HashKey />
                        </Category>

                        <Category name="Arithmetic" categorystyle="logic_category">
                            <CategoryIcon>
                                <CalculatorIcon className="block h-6 w-6 mr-2" />
                            </CategoryIcon>

                            <ArithmeticExpression />
                            <ABSExpression />
                            <NegateExpression />
                            <ModExpression />
                            <EdivExpression />
                            <ShiftLeftExpression />
                            <ShiftRightExpression />
                        </Category>

                        <Category name="Expressions / Statements" categorystyle="expr_stmt_category">
                            <Category name="Int" categorystyle="expr_stmt_category">
                                <IntOfNatExpression />
                                <NatOfIntExpression />
                                <ABSExpression />
                            </Category>
                            <Category name="Nat" categorystyle="expr_stmt_category">
                                <IntOfNatExpression />
                                <NatOfIntExpression />
                                <NegateExpression />
                            </Category>
                            <Category name="String" categorystyle="expr_stmt_category">
                                <SizeOf />
                                <Concat />
                            </Category>
                            <Category name="Bytes" categorystyle="expr_stmt_category">
                                <SizeOf />
                                <Concat />
                                <Slice />
                            </Category>
                            <Category name="Bool" categorystyle="expr_stmt_category">
                                <OrExpression />
                                <AndExpression />
                                <XorExpression />
                                <NotExpression />
                            </Category>
                            <Category name="Record" categorystyle="expr_stmt_category">
                                <AccessRecordPropertyExpression />
                            </Category>
                            <Category name="Map" categorystyle="expr_stmt_category">
                                <SizeOf />
                                <GetMapEntriesExpression />
                                <GetMapKeysExpression />
                                <GetMapValuesExpression />
                                <GetMapValueExpression />
                                <MapConstainsKeyExpression />

                                <DeleteMapEntryStatement />
                            </Category>
                            <Category name="Big Map" categorystyle="expr_stmt_category">
                                <GetMapValueExpression />
                                <MapConstainsKeyExpression />

                                <DeleteMapEntryStatement />
                            </Category>
                            <Category name="Pair" categorystyle="expr_stmt_category">
                                <GetFirstElementExpression />
                                <GetSecondElementExpression />
                            </Category>
                            <Category name="List" categorystyle="expr_stmt_category">
                                <SizeOf />
                                <Concat />
                                <PrependToListExpression />
                                <AddToListStatement />
                            </Category>
                            <Category name="Set" categorystyle="expr_stmt_category">
                                <SizeOf />
                                <GetElementsFromSetExpression />
                                <SetContainsElementExpression />

                                <AddElementToSetStatement />
                                <RemoveElementFromSetStatement />
                            </Category>

                            <Category name="Option" categorystyle="expr_stmt_category">
                                <GetSomeExpression />
                                <IsSomeExpression />
                                <IsNoneExpression />
                            </Category>

                            <Category name="Contract" categorystyle="expr_stmt_category">
                                <ImplicitAccountExpression />
                                <GetContractExpression />
                                <AddressOfContractExpression />
                            </Category>

                            <Category name="Variant" categorystyle="expr_stmt_category">
                                <IsVariantExpression />
                                <OpenVariantExpression />
                            </Category>
                        </Category>

                        <Category name="Advanced" categorystyle="advanced_category">
                            <Category name="Typing" categorystyle="advanced_category">
                                <CategoryIcon>
                                    <TagIcon className="block h-6 w-6 mr-2" />
                                </CategoryIcon>
                                <AsTypeExpression />
                            </Category>
                            <Category name="Serialization" categorystyle="advanced_category">
                                <CategoryIcon>
                                    <SwitchHorizontalIcon className="block h-6 w-6 mr-2" />
                                </CategoryIcon>
                                <PackExpression />
                                <UnpackExpression />
                            </Category>
                        </Category>

                        <Category name="Lambda" categorystyle="literal_category">
                            <CategoryIcon>
                                <ReceiptRefundIcon className="block h-6 w-6 mr-2" />
                            </CategoryIcon>
                            <LambdaLiteral />
                            <CallLambda />
                        </Category>

                        <Category name="Onchain View" categorystyle="view_category">
                            <CategoryIcon>
                                <EyeIcon className="block h-6 w-6 mr-2" />
                            </CategoryIcon>
                            <OnChainView />
                            <CallView />
                        </Category>

                        {isDevelopment() ? (
                            <Category name="Testing (In June)" categorystyle="testing_category">
                                <CategoryIcon>
                                    <BeakerIcon className="block h-6 w-6 mr-2" />
                                </CategoryIcon>
                                <TestTarget />

                                <Testing_AddressOfAccount />
                                <Testing_BalanceOfAccount />

                                <Testing_CreateImplicitAccount />
                                <Testing_OriginateContract />
                            </Category>
                        ) : null}
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
