import React from 'react';
import type { Workspace, WorkspaceSvg } from 'blockly';
import Blockly from 'blockly';

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
import { IntLiteral, NatLiteral } from 'src/components/blockly/blocks/literals';

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
                            startScale: 0.7,
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
                        </ToolboxSearch>
                        <Category name="Bootstrap Blocks" categorystyle="class_category">
                            <Contract />
                            <Entrypoint />
                            <OnChainView />
                            <Block type={BlockKind.value_compilation} />
                            <Block type={BlockKind.type_compilation} />
                        </Category>

                        <Category name="Variables" custom="VARIABLE" categorystyle="variables_category" />
                        <Category name="Logic (If, Assert, ...)" categorystyle="logic_category">
                            <Block type="assert_block">
                                {/* Default error message */}
                                <Value name="error_message">
                                    <Block type={BlockKind.unit_literal} />
                                </Value>
                            </Block>
                            <Block type={BlockKind.if_block} />
                            <Block type={BlockKind.match_variant}>
                                <Value name="CASES">
                                    <Block type={BlockKind.match_variant_case} />
                                </Value>
                            </Block>
                            <Block type={BlockKind.match_variant_case} />
                        </Category>
                        <Category name="Loops" categorystyle="control_statements_category">
                            <Block type={BlockKind.for_block}>
                                <Value name="FROM">
                                    <Block type={BlockKind.nat_literal} />
                                </Value>
                                <Value name="TO">
                                    <Block type={BlockKind.nat_literal} />
                                </Value>
                                <Value name="BY">
                                    <Block type={BlockKind.nat_literal} />
                                </Value>
                            </Block>
                            <Block type={BlockKind.for_each_block} />
                            <Block type={BlockKind.while_block} />
                        </Category>

                        <Category name="Transfer, Delegate, ..." categorystyle="operation_statements_category">
                            <Block type={BlockKind.transfer_statement}>
                                <Value name="AMOUNT">
                                    <Block type={BlockKind.mutez_literal} />
                                </Value>
                                <Value name="ADDRESS">
                                    <Block type={BlockKind.address_literal} />
                                </Value>
                            </Block>
                            <Block type={BlockKind.call_contract_statement}>
                                <Value name="AMOUNT">
                                    <Block type={BlockKind.mutez_literal} />
                                </Value>
                                <Value name="ARGUMENT">
                                    <Block type={BlockKind.unit_literal} />
                                </Value>
                            </Block>
                            <Block type={BlockKind.delegate_statement}>
                                <Value name="DELEGATE">
                                    <Block type={BlockKind.none_with_type_literal}>
                                        <Value name="TYPE">
                                            <Block type={BlockKind.key_hash_type} />
                                        </Value>
                                    </Block>
                                </Value>
                            </Block>
                        </Category>

                        <Category name="Values" categorystyle="literal_category">
                            <Category name="Simple" categorystyle="simple_literal_category">
                                <NatLiteral />
                                <IntLiteral />
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
                                <Block type={BlockKind.nat_type} />
                                <Block type={BlockKind.int_type} />
                                <Block type={BlockKind.mutez_type} />
                                <Block type={BlockKind.timestamp_type} />
                                <Block type={BlockKind.unit_type} />
                                <Block type={BlockKind.boolean_type} />
                                <Block type={BlockKind.string_type} />
                                <Block type={BlockKind.address_type} />
                                <Block type={BlockKind.bytes_type} />
                                <Block type={BlockKind.chain_id_type} />
                                <Block type={BlockKind.key_type} />
                                <Block type={BlockKind.key_hash_type} />
                                <Block type={BlockKind.signature_type} />
                                <Block type={BlockKind.bls12_381_fr_type} />
                                <Block type={BlockKind.bls12_381_g1_type} />
                                <Block type={BlockKind.bls12_381_g2_type} />
                                <Block type={BlockKind.operation_type} />
                                <Block type={BlockKind.never_type} />
                            </Category>

                            <Category name="Container Types" categorystyle="type_category">
                                <Block type={BlockKind.list_type} />
                                <Block type={BlockKind.set_type} />
                                <Block type={BlockKind.option_type} />
                                <Block type={BlockKind.map_type} />
                                <Block type={BlockKind.big_map_type} />
                                <Block type={BlockKind.pair_type} />
                                <Block type={BlockKind.lambda_type} />
                                <Block type={BlockKind.ticket_type} />
                                <Block type={BlockKind.contract_type} />
                                <Block type={BlockKind.sapling_state_type} />
                                <Block type={BlockKind.sapling_transaction_type} />
                            </Category>

                            <Category name="Artificial Types" categorystyle="type_category">
                                <Block type={BlockKind.record_type}>
                                    <Value name="fields">
                                        <Block type={BlockKind.record_variant_field_type} />
                                    </Value>
                                    <Value name="fields">
                                        <Block type={BlockKind.record_variant_field_type} />
                                    </Value>
                                </Block>
                                <Block type={BlockKind.variant_type}>
                                    <Value name="fields">
                                        <Block type={BlockKind.record_variant_field_type} />
                                    </Value>
                                    <Value name="fields">
                                        <Block type={BlockKind.record_variant_field_type} />
                                    </Value>
                                </Block>
                                <Block type={BlockKind.record_variant_field_type} />
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
                        </Category>

                        <Category name="Statements" categorystyle="control_statements_category">
                            <Category name="Map Statements" categorystyle="logic_category">
                                <Block type={BlockKind.delete_map_entry} />
                            </Category>
                        </Category>

                        <Category name="Blockchain Properties" categorystyle="blockchain_category">
                            <Category name="Block" categorystyle="block_properties_category">
                                <Block type={BlockKind.get_chain_id_block} />
                                <Block type={BlockKind.get_level_block} />
                                <Block type={BlockKind.get_timestamp_block} />
                                <Block type={BlockKind.get_total_voting_power_block} />
                                <Block type={BlockKind.get_voting_power} />
                            </Category>
                            <Category name="Transaction" categorystyle="transaction_properties_category">
                                <Block type={BlockKind.get_amount_block} />
                                <Block type={BlockKind.get_balance_block} />
                                <Block type={BlockKind.get_current_contract_block} />
                                <Block type={BlockKind.get_current_contract_address_block} />
                                <Block type={BlockKind.get_sender_block} />
                                <Block type={BlockKind.get_source_block} />
                            </Category>
                        </Category>

                        <Category name="Various" categorystyle="logic_category">
                            <Block type={BlockKind.param_access} />
                            <Block type={BlockKind.not} />
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
