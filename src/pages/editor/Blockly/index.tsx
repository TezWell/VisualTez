import React, { MutableRefObject } from 'react';
import Blockly from 'blockly/core';
import locale from 'blockly/msg/en';

import useEditor from 'src/context/hooks/useEditor';

Blockly.setLocale(locale);

interface BlocklyContainerProps {
    workspaceRef: MutableRefObject<any>;
    [k: string]: any;
}

const BlocklyContainer: React.FC<BlocklyContainerProps> = ({ children, workspaceRef, ...props }) => {
    const loaded = React.useRef(false);
    const blocklyDiv = React.useRef<HTMLDivElement>(null);
    const toolbox = React.useRef<HTMLDivElement>(null);
    const { state, changeXML } = useEditor();

    const onChange = React.useCallback(
        (event: any) => {
            console.error(event.type);
            if (
                [
                    Blockly.Events.BLOCK_CHANGE,
                    Blockly.Events.MOVE,
                    Blockly.Events.DELETE,
                    Blockly.Events.CREATE,
                ].includes(event.type)
            ) {
                if (workspaceRef.current) {
                    const xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspaceRef.current));
                    changeXML(xml);
                }
            }
        },
        [changeXML, workspaceRef],
    );

    React.useEffect(() => {
        if (!loaded.current && blocklyDiv.current && toolbox.current) {
            workspaceRef.current = Blockly.inject(blocklyDiv.current, {
                toolbox: toolbox.current,
                ...props,
            });
            const baseXML = `<xml xmlns="http://www.w3.org/1999/xhtml"></xml>`;
            Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(state.currentXML || baseXML), workspaceRef.current);
            workspaceRef.current.addChangeListener(onChange);
            loaded.current = true;
        }
        return () => {
            workspaceRef.current?.removeChangeListener(onChange);
        };
    }, []);

    return (
        <React.Fragment>
            <div ref={blocklyDiv} className="h-full w-full" style={{ width: '100%', height: '100%' }} />
            <div is="blockly" style={{ display: 'none' }} id="toolbox" ref={toolbox}>
                {children}
            </div>
        </React.Fragment>
    );
};

export default BlocklyContainer;
