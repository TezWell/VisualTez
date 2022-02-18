import React from 'react';

import type { Workspace, WorkspaceSvg } from 'blockly';
import Blockly from 'blockly';

import DarkTheme from './themes/dark';
import LightTheme from './themes/light';

import 'src/blocks';
import './overrides';
import './blockly.css';
import useTheme from 'src/context/hooks/useTheme';
import Logger from 'src/utils/logger';

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
    readOnly?: boolean;
    currentXML?: string;
    onLoad?: () => void;
    onError?: (error: string) => void;
    onChange?: (event: any) => void;
    renderer?: 'zelos';
}

const BlocklyContainer: React.FC<BlocklyContainerProps> = ({
    children,
    workspaceRef,
    noToolbox = false,
    currentXML,
    onLoad,
    onError,
    onChange,
    ...props
}) => {
    const { isDark } = useTheme();
    const loaded = React.useRef(false);
    const blocklyDiv = React.useRef<HTMLDivElement>(null);
    const toolbox = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (loaded.current && workspaceRef.current) {
            workspaceRef.current.setTheme(isDark ? DarkTheme : LightTheme);
        }
    }, [isDark, workspaceRef]);

    React.useEffect(() => {
        if (!loaded.current && blocklyDiv.current && toolbox.current) {
            try {
                workspaceRef.current = Blockly.inject(blocklyDiv.current, {
                    toolbox: noToolbox ? undefined : toolbox.current,
                    theme: isDark ? DarkTheme : LightTheme,
                    ...props,
                });
                const baseXML = `<xml xmlns="http://www.w3.org/1999/xhtml"></xml>`;
                Blockly.Xml.domToWorkspace(
                    Blockly.Xml.textToDom(currentXML || baseXML),
                    workspaceRef.current as Workspace,
                );
                onChange && workspaceRef.current.addChangeListener(onChange);
                workspaceRef.current.scrollCenter();
                onLoad?.();
                loaded.current = true;
            } catch (e: any) {
                Logger.debug(e);
                onError?.(e?.message);
            }
        }
        return () => {
            onChange && workspaceRef.current?.removeChangeListener(onChange);
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
