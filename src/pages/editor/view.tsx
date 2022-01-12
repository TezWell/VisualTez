import React from 'react';
import type { WorkspaceSvg } from 'blockly';
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

// Debouncer
const onDebouncer = debounce(10);

interface EditorViewProps {
    workspaceRef: React.MutableRefObject<WorkspaceSvg | undefined>;
    compile: () => void;
}

const EditorView: React.FC<EditorViewProps> = ({ workspaceRef, compile }) => {
    const { state, updateDivider, drawer } = useEditor();

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
                                <Block type={BlockKind.string_literal} />
                                <Block type={BlockKind.some_literal} />
                                <Block type={BlockKind.none_literal} />
                                <Block type={BlockKind.nat_literal} />
                                <Block type={BlockKind.int_literal} />
                                <Block type={BlockKind.address_literal} />
                                <Block type={BlockKind.boolean_literal} />
                            </Category>
                            <Category name="Types" categorystyle="type_category">
                                <Block type={BlockKind.string_type} />
                                <Block type={BlockKind.unit_type} />
                            </Category>
                            <Category name="Blockchain Operations" categorystyle="blockchain_category">
                                <Block type="head_level_block" />
                                <Block type="operation_sender_block" />
                            </Category>
                            <Category name="Variables & Operations" categorystyle="variables_category">
                                <Block type={BlockKind.get_contract_storage} />
                                <Block type="set_variable_block" />
                                <Block type="get_variable_block" />
                            </Category>
                            <Category name="Logic" categorystyle="logic_category">
                                <Category name="Boolean" categorystyle="logic_category">
                                    <Block type={BlockKind.compare_block}></Block>
                                </Category>
                            </Category>
                            <Category name="Assertion" categorystyle="assertion_category">
                                <Block type="assert_block" />
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
