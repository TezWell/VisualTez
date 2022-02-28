import React from 'react';
import type { Workspace, WorkspaceSvg } from 'blockly';
import Blockly from 'blockly';

import { Block, Category, Value } from 'src/components/blockly';
import BlocklyEditor from 'src/components/blockly/Editor';
import BlockKind from 'src/blocks/enums/BlockKind';

import { Section } from 'src/components/section-divider';
import { Sections } from 'src/components/section-divider';

import debounce from 'src/utils/debounce';
import useEditor from 'src/context/hooks/useEditor';
import ToolsBar from './toolbar/ToolsBar';
import Drawer from './toolbar/Drawer';
import { initiateDefaultVariables } from 'src/blocks/utils/variables';
import Separator from 'src/components/blockly/Separator';
import Label from 'src/components/blockly/Label';

// Debouncer
const onDebouncer = debounce(10);

interface EditorViewProps {
    workspaceRef: React.MutableRefObject<WorkspaceSvg | undefined>;
    compile: () => void;
    onError: (error: string) => void;
}

const EditorView: React.FC<EditorViewProps> = ({ workspaceRef, compile, onError }) => {
    const { state, workspace, updateWorkspace, updateEditorState, drawer } = useEditor();
    const workspaceID = React.useRef(workspace.id);

    const resizeWorkspace = React.useCallback(() => {
        if (workspaceRef.current) {
            Blockly.svgResize(workspaceRef.current);
            workspaceRef.current.scrollCenter();
        }
    }, [workspaceRef]);

    const saveSectionSizes = React.useCallback(
        (sizes: { editorSize: string; outputSize: string }) => {
            updateEditorState({
                divider: {
                    left: sizes.editorSize,
                    right: sizes.outputSize,
                },
            });
            resizeWorkspace();
        },
        [updateEditorState, resizeWorkspace],
    );

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
                    updateWorkspace({
                        ...workspace,
                        xml,
                    });
                }
            }
        },
        [updateWorkspace, workspace, workspaceRef],
    );

    React.useEffect(() => {
        if (workspaceRef.current && workspaceID.current !== workspace.id) {
            const baseXML = `<xml xmlns="http://www.w3.org/1999/xhtml"></xml>`;
            Blockly.Xml.clearWorkspaceAndLoadFromXml(
                Blockly.Xml.textToDom(workspace.xml || baseXML),
                workspaceRef.current as Workspace,
            );
            resizeWorkspace();
            workspaceID.current = workspace.id;
        }
    }, [resizeWorkspace, workspace, workspaceRef]);

    return (
        <div className="flex flex-row flex-1">
            <div className="flex-1">
                <Sections
                    split="vertical"
                    onChange={([editorSize, outputSize]: string[]) =>
                        onDebouncer(saveSectionSizes, { editorSize, outputSize })
                    }
                >
                    <Section minSize={'40%'} size={(drawer && state.divider?.left) || '100%'} className="relative">
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
                                wheel: false,
                                startScale: 0.8,
                                maxScale: 4,
                                minScale: 0.25,
                                scaleSpeed: 1.1,
                            }}
                            onLoad={initiateDefaultVariables}
                            onError={onError}
                            onChange={onChange}
                        >
                            <Category name="Base" categorystyle="class_category">
                                <Block type={BlockKind.contract_block}>
                                    {/* Default input type */}
                                    <Value name="initial_storage">
                                        <Block type={BlockKind.unit_literal} />
                                    </Value>
                                    {/* Default empty entry point */}
                                    <Value name="entry_points">
                                        <Block type={BlockKind.entry_point_block}>
                                            {/* Default input type */}
                                            <Value name="input_type">
                                                <Block type={BlockKind.unit_type} />
                                            </Value>
                                        </Block>
                                    </Value>
                                </Block>
                                <Block type={BlockKind.entry_point_block}>
                                    {/* Default input type */}
                                    <Value name="input_type">
                                        <Block type={BlockKind.unit_type} />
                                    </Value>
                                </Block>
                                <Block type={BlockKind.value_compilation} />
                                <Block type={BlockKind.type_compilation} />
                            </Category>
                            <Category name="Values" categorystyle="literal_category">
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
                                <Block type={BlockKind.none_with_type_literal} />

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

                                <Label text="-- Variant --" web-class="defaultLabel" />

                                <Block type={BlockKind.variant_value} />
                            </Category>
                            <Category name="Types" categorystyle="type_category">
                                <Label text="-- Singleton types --" web-class="defaultLabel" />
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
                                <Label text="-- Container types --" web-class="defaultLabel" />
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
                                <Label text="-- Artificial types --" web-class="defaultLabel" />
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
                            <Category name="Operation Properties" categorystyle="blockchain_category">
                                <Block type={BlockKind.get_amount_block} />
                                <Block type={BlockKind.get_balance_block} />
                                <Block type={BlockKind.get_chain_id_block} />
                                <Block type={BlockKind.get_level_block} />
                                <Block type={BlockKind.get_timestamp_block} />
                                <Block type={BlockKind.get_current_contract_block} />
                                <Block type={BlockKind.get_current_contract_address_block} />
                                <Block type={BlockKind.get_sender_block} />
                                <Block type={BlockKind.get_source_block} />
                                <Block type={BlockKind.get_total_voting_power_block} />
                                <Block type={BlockKind.get_voting_power} />
                            </Category>
                            {/* <Category name="Logic" categorystyle="logic_category">
                                <Category name="Boolean" categorystyle="logic_category">
                                    <Block type={BlockKind.compare_block} />
                                </Category>
                            </Category> */}
                            <Category name="Various" categorystyle="logic_category">
                                <Block type={BlockKind.compare_block} />
                                <Block type={BlockKind.math_block} />
                            </Category>

                            <Category name="Variables" custom="VARIABLE" categorystyle="variables_category">
                                <Block type={BlockKind.variable_setter_block} />
                                <Block type={BlockKind.param_access} />
                            </Category>
                            <Category name="Control Statements" categorystyle="control_statements_category">
                                <Category name="Logic" categorystyle="logic_category">
                                    <Block type="assert_block">
                                        {/* Default error message */}
                                        <Value name="error_message">
                                            <Block type={BlockKind.unit_literal} />
                                        </Value>
                                    </Block>
                                    <Block type={BlockKind.if_block} />
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
                            </Category>
                        </BlocklyEditor>
                    </Section>
                    <Section
                        show={!!drawer}
                        minSize={'20%'}
                        size={state.divider?.right || '30%'}
                        className="overflow-auto"
                    >
                        <Drawer resizeWorkspace={resizeWorkspace} />
                    </Section>
                </Sections>
            </div>
            <ToolsBar resizeWorkspace={resizeWorkspace} compile={compile} />
        </div>
    );
};

export default EditorView;
