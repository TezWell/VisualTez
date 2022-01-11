import React from 'react';

import type { Workspace } from 'blockly';
import Blockly from 'blockly';

import useEditor from 'src/context/hooks/useEditor';
import DarkTheme from './themes/dark';
import LightTheme from './themes/light';

import './overrides';
import './blockly.css';
import useTheme from 'src/context/hooks/useTheme';
import type { WorkspaceSvg } from 'blockly';

interface BlocklyContainerProps extends Blockly.BlocklyOptions {
    workspaceRef: React.MutableRefObject<WorkspaceSvg | undefined>;
    noToolbox?: boolean;
    trashcan?: boolean;
    move?: {
        scrollbars: boolean;
        drag: boolean;
        wheel: boolean;
    };
    comments?: boolean;
    grid?: {
        spacing: number;
        length: number;
        colour: string;
        snap: boolean;
    };
    zoom?: {
        controls: boolean;
        wheel: boolean;
        startScale: number;
        maxScale: number;
        minScale: number;
        scaleSpeed: number;
    };
    renderer?: 'zelos';
}

const BlocklyContainer: React.FC<BlocklyContainerProps> = ({ children, workspaceRef, noToolbox = false, ...props }) => {
    const { isDark } = useTheme();
    const loaded = React.useRef(false);
    const blocklyDiv = React.useRef<HTMLDivElement>(null);
    const toolbox = React.useRef<HTMLDivElement>(null);
    const { state, updateXML } = useEditor();

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
                    const xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspaceRef.current as Workspace));
                    updateXML(xml);
                }
            }
        },
        [updateXML, workspaceRef],
    );

    React.useEffect(() => {
        if (loaded.current && workspaceRef.current) {
            workspaceRef.current.setTheme(isDark ? DarkTheme : LightTheme);
        }
    }, [isDark, workspaceRef]);

    React.useEffect(() => {
        if (!loaded.current && blocklyDiv.current && toolbox.current) {
            workspaceRef.current = Blockly.inject(blocklyDiv.current, {
                toolbox: noToolbox ? undefined : toolbox.current,
                theme: isDark ? DarkTheme : LightTheme,
                ...props,
            });
            const baseXML = `<xml xmlns="http://www.w3.org/1999/xhtml"></xml>`;
            Blockly.Xml.domToWorkspace(
                Blockly.Xml.textToDom(state.currentXML || baseXML),
                workspaceRef.current as Workspace,
            );
            workspaceRef.current.addChangeListener(onChange);
            workspaceRef.current.scrollCenter();
            loaded.current = true;
        }
        return () => {
            workspaceRef.current?.removeChangeListener(onChange);
        };
    }, []);

    return (
        <React.Fragment>
            <div ref={blocklyDiv} className="h-full w-full absolute" />
            <div is="blockly" style={{ display: 'none' }} id="toolbox" ref={toolbox}>
                {children}
            </div>
        </React.Fragment>
    );
};

export default BlocklyContainer;
