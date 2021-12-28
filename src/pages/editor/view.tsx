import React from 'react';

import SmartML from '@tezwell/smartts-sdk/smartml';

import BlocklySmartML from 'src/generators/SmartML';
import { Block, Category } from 'src/components/blockly';
import DarkTheme from 'src/pages/editor/Blockly/themes/dark';

import BlocklyContainer from './Blockly';
import VARIABLES from 'src/blocks/enums/variables';
import CodeBlock from 'src/components/CodeBlock';

const EditorView: React.FC = () => {
    const workspaceRef = React.useRef<any>();
    const [code, setCode] = React.useState<string>();

    const generateCode = React.useCallback(() => {
        if (workspaceRef.current) {
            const code = BlocklySmartML.workspaceToCode(workspaceRef.current);
            const michelson = SmartML.compileContract(code);
            setCode(JSON.stringify(michelson, null, 4));
        }
    }, []);

    return (
        <div className="flex flex-1">
            <div className="flex-1">
                <BlocklyContainer
                    workspaceRef={workspaceRef}
                    trashcan={false}
                    theme={DarkTheme}
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
                    <Category name="Base" categorystyle="class_category">
                        <Block type="contract_block" />
                        <Block type="entry_point_block" />
                    </Category>
                    <Category name="Literals" categorystyle="literal_category">
                        <Block type="string_block" />
                        <Block type="nat_block" />
                        <Block type="int_block" />
                        <Block type="address_block" />
                        <Block type="boolean_block" />
                    </Category>
                    <Category name="Blockchain Operations" categorystyle="blockchain_category">
                        <Block type="head_level_block" />
                        <Block type="operation_sender_block" />
                    </Category>
                    <Category name="Variables & Operations" categorystyle="variables_category">
                        <Block type={`variable_getter_${VARIABLES.contract_storage}`} />
                        <Block type="set_variable_block" />
                        <Block type="get_variable_block" />
                    </Category>
                    <Category name="Logic" categorystyle="logic_category">
                        <Category name="Boolean" categorystyle="logic_category">
                            <Block type="logic_compare"></Block>
                        </Category>
                    </Category>
                    <Category name="Assertion" categorystyle="assertion_category">
                        <Block type="assert_block" />
                    </Category>
                </BlocklyContainer>
            </div>
            <div className="flex flex-col" style={{ width: 500 }}>
                <div className="flex basis-1/4 items-center justify-center">
                    <h1 className="text-2xl text-center align-middle">Output</h1>
                </div>
                <div className="flex basis-1/2 items-center justify-center overflow-y-auto">
                    {code && <CodeBlock language="json" showLineNumbers text={code} />}
                </div>
                <div className="flex basis-1/4 items-center justify-evenly">
                    <button
                        onClick={generateCode}
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Compile
                    </button>
                    <button
                        onClick={() => setCode('')}
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditorView;
