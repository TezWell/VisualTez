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
    const { state, updateXML, updateDivider, drawer } = useEditor();

    const resizeWorkspace = React.useCallback(() => {
        if (workspaceRef.current) {
            Blockly.svgResize(workspaceRef.current);
            workspaceRef.current.scrollCenter();
        }
    }, [workspaceRef]);

    const saveSectionSizes = React.useCallback(
        (sizes: { editorSize: string; outputSize: string }) => {
            updateDivider(sizes.editorSize, sizes.outputSize);
            resizeWorkspace();
        },
        [updateDivider, resizeWorkspace],
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
                    updateXML(xml);
                }
            }
        },
        [updateXML, workspaceRef],
    );

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
                            currentXML={state.currentXML}
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
                            onLoad={initiateDefaultVariables}
                            onError={onError}
                            onChange={onChange}
                            renderer="zelos"
                        >
                            <Category name="Contract Base" categorystyle="class_category">
                                <Block type={BlockKind.contract_block}>
                                    {/* Default input type */}
                                    <Value name="initial_storage">
                                        <Block type={BlockKind.unit_literal} />
                                    </Value>
                                </Block>
                                <Block type={BlockKind.entry_point_block}>
                                    {/* Default input type */}
                                    <Value name="input_type">
                                        <Block type={BlockKind.unit_type} />
                                    </Value>
                                </Block>
                            </Category>
                            <Category name="Literals" categorystyle="literal_category">
                                <Block type={BlockKind.unit_literal} />
                                <Separator gap={40} />
                                <Block type={BlockKind.string_literal} />
                                <Block type={BlockKind.address_literal} />
                                <Block type={BlockKind.bytes_literal} />
                                <Separator gap={40} />
                                <Block type={BlockKind.boolean_literal} />
                                <Label text="-- Option --" web-class="defaultLabel" />
                                <Block type={BlockKind.some_literal} />
                                <Block type={BlockKind.none_literal} />
                                <Label text="-- Number --" web-class="defaultLabel" />
                                <Block type={BlockKind.nat_literal} />
                                <Block type={BlockKind.int_literal} />
                                <Label text="-- Record --" web-class="defaultLabel" />
                                <Block type={BlockKind.record_literal} />
                                <Block type={BlockKind.record_field} />
                                <Separator gap={40} />
                            </Category>
                            <Category name="Types" categorystyle="type_category">
                                <Label text="-- Singleton types --" web-class="defaultLabel" />
                                <Block type={BlockKind.string_type} />
                                <Block type={BlockKind.unit_type} />
                                <Block type={BlockKind.boolean_type} />
                                <Block type={BlockKind.address_type} />
                                <Block type={BlockKind.nat_type} />
                                <Block type={BlockKind.int_type} />
                                <Block type={BlockKind.mutez_type} />
                                <Block type={BlockKind.chain_id_type} />
                                <Block type={BlockKind.timestamp_type} />
                                <Block type={BlockKind.bytes_type} />
                                <Block type={BlockKind.bls12_381_fr_type} />
                                <Block type={BlockKind.bls12_381_g1_type} />
                                <Block type={BlockKind.bls12_381_g2_type} />
                                <Block type={BlockKind.key_type} />
                                <Block type={BlockKind.key_hash_type} />
                                <Block type={BlockKind.signature_type} />
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
                                <Block type={BlockKind.record_type} />
                                <Block type={BlockKind.variant_type} />
                                <Block type={BlockKind.record_variant_field_type} />
                            </Category>
                            <Category name="Blockchain Operations" categorystyle="blockchain_category">
                                <Block type={BlockKind.get_level_block} />
                                <Block type={BlockKind.get_sender_block} />
                            </Category>
                            <Category name="Variables" custom="VARIABLE" categorystyle="variables_category">
                                <Block type={BlockKind.param_access} />
                            </Category>
                            <Category name="Logic" categorystyle="logic_category">
                                <Category name="Boolean" categorystyle="logic_category">
                                    <Block type={BlockKind.compare_block} />
                                </Category>
                            </Category>
                            <Category name="Math" categorystyle="logic_category">
                                <Block type={BlockKind.math_block} />
                            </Category>
                            <Category name="Assertion" categorystyle="assertion_category">
                                <Block type="assert_block">
                                    {/* Default error message */}
                                    <Value name="error_message">
                                        <Block type={BlockKind.unit_literal} />
                                    </Value>
                                </Block>
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
