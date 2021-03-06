import React from 'react';
import Blockly from 'blockly';

import type { Workspace, WorkspaceSvg } from 'src/typings/blockly';

import DarkTheme from './themes/dark';
import LightTheme from './themes/light';

import './overrides';
import 'src/blocks';
import './blockly.css';
import useTheme from 'src/context/hooks/useTheme';
import Logger from 'src/utils/logger';
import useEditor from 'src/context/hooks/useEditor';
import * as BlocklyInject from 'src/components/blockly/overrides/inject';

interface BlocklyContainerProps extends Blockly.BlocklyOptions {
    children?: React.ReactNode;
    workspaceRef: React.MutableRefObject<WorkspaceSvg | undefined>;
    noToolbox?: boolean;
    trashcan?: boolean;
    move?: {
        scrollbars?: boolean;
        drag?: boolean;
        wheel?: boolean;
    };
    comments?: boolean;
    grid?: {
        spacing?: number;
        length?: number;
        colour?: string;
        snap?: boolean;
    };
    zoom?: {
        controls?: boolean;
        wheel?: boolean;
        startScale?: number;
        maxScale?: number;
        minScale?: number;
        scaleSpeed?: number;
    };
    readOnly?: boolean;
    currentXML?: string;
    onLoad?: () => void;
    onError?: (error: string) => void;
    onChange?: (event: any) => void;
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
    const { state } = useEditor();
    const blocklyDiv = React.useRef<HTMLDivElement>(null);
    const toolbox = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (workspaceRef.current) {
            workspaceRef.current.setTheme(isDark ? DarkTheme : LightTheme);
        }
    }, [isDark, workspaceRef]);

    React.useEffect(() => {
        if (blocklyDiv.current && toolbox.current) {
            try {
                workspaceRef.current = BlocklyInject.inject(blocklyDiv.current, {
                    toolbox: noToolbox ? undefined : toolbox.current,
                    theme: isDark ? DarkTheme : LightTheme,
                    renderer: state.renderer,
                    ...props,
                });
                const baseXML = `<xml xmlns="http://www.w3.org/1999/xhtml"></xml>`;
                Blockly.Xml.clearWorkspaceAndLoadFromXml(
                    Blockly.Xml.textToDom(currentXML || baseXML),
                    workspaceRef.current as Workspace,
                );
                Blockly.svgResize(workspaceRef.current);
                workspaceRef.current?.scrollCenter();
                onLoad?.();
            } catch (e: any) {
                Logger.debug(e);
                onError?.(e?.message);
            }
        }

        const container = blocklyDiv.current;
        return () => {
            if (container) {
                container.innerHTML = '';
            }
        };
    }, []);

    React.useEffect(() => {
        onChange && workspaceRef.current?.addChangeListener(onChange);
        return () => {
            onChange && workspaceRef.current?.removeChangeListener(onChange);
        };
    }, [onChange, workspaceRef]);

    return (
        <React.Fragment>
            <div ref={blocklyDiv} className="h-full w-full relative" />
            <div is="blockly" style={{ display: 'none' }} id="toolbox" ref={toolbox}>
                {children}
            </div>
        </React.Fragment>
    );
};

export default BlocklyContainer;
