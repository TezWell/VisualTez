import React from 'react';

import Settings from 'src/settings.json';
import Button from 'src/components/common/Button';
import Http from 'src/utils/http';
import Logger from 'src/utils/logger';
import useEditor from 'src/context/hooks/useEditor';
import { EditorActionKind } from 'src/context/Editor';

import DrawerTitle from './DrawerTitle';

const loadTemplate = async (path: string) => {
    const { data } = await Http.get(`${location.origin}/${path}`, {
        timeout: 5000,
    });

    return data;
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TemplatesDrawerProps {}

const TemplatesDrawer: React.FC<TemplatesDrawerProps> = () => {
    const { dispatch } = useEditor();

    const selectTemplate = React.useCallback(
        (path: string) => {
            try {
                loadTemplate(path).then((xml) =>
                    dispatch({ type: EditorActionKind.UPDATE_VOLATILE_WORKSPACE, payload: xml }),
                );
            } catch (e: any) {
                const errorMessage: string = e?.message || e.toString();
                Logger.debug(errorMessage);
                dispatch({
                    type: EditorActionKind.UPDATE_ERROR,
                    payload: {
                        msg: errorMessage,
                    },
                });
            }
        },
        [dispatch],
    );

    return (
        <div className="flex flex-col w-full h-full p-5">
            <DrawerTitle title="Templates" />
            <div className="mt-5">
                <span className="inline-flex items-center justify-center w-full p-1 border-2 font-bold font-mono mb-3">
                    Contracts
                </span>
                {Settings.templates.contracts.map((template) => (
                    <Button
                        key={template.name}
                        onClick={() => selectTemplate(template.path)}
                        className="w-full bg-yellow-600 hover:bg-yellow-500 active:bg-yellow-400 border-yellow-700 hover:border-yellow-500 p-2 my-1"
                    >
                        {template.name}
                    </Button>
                ))}

                <span className="inline-flex items-center justify-center w-full p-1 border-2 font-bold font-mono mb-3 mt-3">
                    Values
                </span>
                {Settings.templates.values.map((template) => (
                    <Button
                        key={template.name}
                        onClick={() => selectTemplate(template.path)}
                        className="w-full bg-yellow-600 hover:bg-yellow-500 active:bg-yellow-400 border-yellow-700 hover:border-yellow-500 p-2 my-1"
                    >
                        {template.name}
                    </Button>
                ))}

                <span className="inline-flex items-center justify-center w-full p-1 border-2 font-bold font-mono mb-3 mt-3">
                    Types
                </span>
                {Settings.templates.types.map((template) => (
                    <Button
                        key={template.name}
                        onClick={() => selectTemplate(template.path)}
                        className="w-full bg-yellow-600 hover:bg-yellow-500 active:bg-yellow-400 border-yellow-700 hover:border-yellow-500 p-2 my-1"
                    >
                        {template.name}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default TemplatesDrawer;
