import React from 'react';
import { Disclosure } from '@headlessui/react';
import {
    TrashIcon,
    PencilAltIcon,
    DocumentAddIcon,
    ChevronDownIcon,
    ExternalLinkIcon,
    DownloadIcon,
    UploadIcon,
} from '@heroicons/react/outline';

import Button from 'src/components/common/Button';
import useEditor from 'src/context/hooks/useEditor';
import { buildClassName } from 'src/utils/className';
import Modal from 'src/components/common/Modal';
import { EditorActionKind, IEditorWorkspace } from 'src/context/Editor';
import { downloadFile } from 'src/utils/download_upload';
import FileDropZone from 'src/components/common/FileDropZone';
import ConditionalRender from 'src/components/common/ConditionalRender';

import DrawerTitle from './DrawerTitle';

interface DeleteWorkspaceModalProps {
    workspace: IEditorWorkspace;
    onClose: () => void;
}

const DeleteWorkspaceModal: React.FC<DeleteWorkspaceModalProps> = ({ workspace, onClose }) => {
    const { dispatch } = useEditor();

    const deleteWorkspace = React.useCallback(() => {
        dispatch({
            type: EditorActionKind.DELETE_WORKSPACE,
            payload: {
                workspaceID: workspace.id,
            },
        });
        onClose();
    }, [dispatch, onClose, workspace.id]);

    return (
        <Modal
            open={true}
            onClose={onClose}
            title={
                <div className="flex items-center text-xl text-center align-middle font-mono text-ellipsis overflow-hidden">
                    Delete Workspace
                </div>
            }
            actions={[
                <Button
                    key="delete"
                    onClick={deleteWorkspace}
                    className="bg-yellow-500 hover:bg-yellow-400 border-yellow-700 hover:border-yellow-500 p-2"
                >
                    Delete
                </Button>,
                <Button
                    key="close"
                    onClick={onClose}
                    className="bg-gray-400 hover:bg-gray-300 border-gray-700 hover:border-gray-600 p-2"
                >
                    Close
                </Button>,
            ]}
        >
            <div className="p-2">
                <h1 className="text-md font-mono text-black dark:text-white">
                    Are you sure you want to delete worspace <span className="font-bold">{workspace.name}</span> ?
                </h1>
            </div>
        </Modal>
    );
};

interface CreateWorkspaceModalProps {
    onClose: () => void;
}

const CreateWorkspaceModal: React.FC<CreateWorkspaceModalProps> = ({ onClose }) => {
    const [name, setName] = React.useState('');
    const { dispatch } = useEditor();

    const updateName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);

    const newWorkspace = React.useCallback(() => {
        if (name) {
            dispatch({
                type: EditorActionKind.CREATE_WORKSPACE,
                payload: {
                    name,
                },
            });
            onClose();
        }
    }, [dispatch, name, onClose]);

    return (
        <Modal
            open={true}
            onClose={onClose}
            title={
                <div className="flex items-center text-xl text-center align-middle font-mono text-ellipsis overflow-hidden">
                    Create Workspace
                </div>
            }
            actions={[
                <Button
                    key="create"
                    onClick={newWorkspace}
                    className="bg-yellow-500 hover:bg-yellow-400 border-yellow-700 hover:border-yellow-500 p-2"
                >
                    Create
                </Button>,
                <Button
                    key="close"
                    onClick={onClose}
                    className="bg-gray-400 hover:bg-gray-300 border-gray-700 hover:border-gray-600 p-2"
                >
                    Close
                </Button>,
            ]}
        >
            <div className="p-2">
                <input
                    type="text"
                    name="workspace-name"
                    className={buildClassName([
                        {
                            classes:
                                'focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border-gray-300 dark:text-black',
                        },
                        {
                            classes: 'border-red-500 dark:border-red-500 border-2',
                            append: !name,
                        },
                    ])}
                    placeholder="Workspace Name"
                    value={name}
                    onChange={updateName}
                />
            </div>
        </Modal>
    );
};

interface UpdateWorkspaceModalProps {
    workspace: IEditorWorkspace;
    onClose: () => void;
}

const UpdateWorkspaceModal: React.FC<UpdateWorkspaceModalProps> = ({ workspace, onClose }) => {
    const [name, setName] = React.useState(workspace.name);
    const { dispatch } = useEditor();

    const updateName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);

    const changeWorkspaceName = React.useCallback(() => {
        if (name) {
            dispatch({
                type: EditorActionKind.UPDATE_WORKSPACE,
                payload: {
                    id: workspace.id,
                    name,
                },
            });
            onClose();
        }
    }, [name, dispatch, workspace.id, onClose]);

    return (
        <Modal
            open={true}
            onClose={onClose}
            title={
                <div className="flex items-center text-xl text-center align-middle font-mono text-ellipsis overflow-hidden">
                    Update Workspace
                </div>
            }
            actions={[
                <Button
                    key="update"
                    onClick={changeWorkspaceName}
                    className="bg-yellow-500 hover:bg-yellow-400 border-yellow-700 hover:border-yellow-500 p-2"
                >
                    Update
                </Button>,
                <Button
                    key="close"
                    onClick={onClose}
                    className="bg-gray-400 hover:bg-gray-300 border-gray-700 hover:border-gray-600 p-2"
                >
                    Close
                </Button>,
            ]}
        >
            <div className="p-2">
                <input
                    type="text"
                    name="workspace-name"
                    className={buildClassName([
                        {
                            classes:
                                'focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border-gray-300 dark:text-black',
                        },
                        {
                            classes: 'border-red-500 dark:border-red-500 border-2',
                            append: !name,
                        },
                    ])}
                    placeholder="Workspace Name"
                    value={name}
                    onChange={updateName}
                />
            </div>
        </Modal>
    );
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface StorageDrawerProps {}

const StorageDrawer: React.FC<StorageDrawerProps> = () => {
    const { state, workspace, dispatch } = useEditor();
    const [createWorkspaceModal, setCreateWorkspaceModal] = React.useState(false);
    const [deleteWorkspaceModal, setDeleteWorkspaceModal] = React.useState<IEditorWorkspace>();
    const [updateWorkspaceModal, setUpdateWorkspaceModal] = React.useState<IEditorWorkspace>();
    const [openImportModal, setOpenImportModal] = React.useState(false);

    const selectWorkspace = (id: string) => {
        dispatch({
            type: EditorActionKind.CHANGE_SELECTED_WORKSPACE,
            payload: id,
        });
    };

    const downloadWorkspace = () => {
        const fileName = `${workspace.name.replace(/\s/g, '_').toLowerCase()}.xml`;
        downloadFile(fileName, workspace.xml);
    };

    const handleImportComplete = (file: File) => {
        setOpenImportModal(false);
        const reader = new FileReader();

        const fail = () => {
            dispatch({
                type: EditorActionKind.UPDATE_ERROR,
                payload: {
                    msg: 'Could not import workspace.',
                },
            });
        };

        reader.onabort = fail;
        reader.onerror = fail;
        reader.onload = () => {
            dispatch({
                type: EditorActionKind.UPDATE_VOLATILE_WORKSPACE,
                payload: reader.result as string,
            });
        };
        reader.readAsText(file);
    };

    return (
        <div className="flex flex-col w-full h-full">
            <div className="p-5">
                <DrawerTitle title="Storage" />
            </div>

            <div className="flex flex-col grow basis-0 p-5 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
                {Object.values(state.workspaces).map((w) => (
                    <Disclosure key={w.id}>
                        {({ open }) => (
                            <div
                                className={buildClassName([
                                    {
                                        classes: 'border rounded border-black dark:border-white mb-2 p-2',
                                    },
                                    {
                                        classes: 'border-blue-500 dark:border-blue-500',
                                        append: w.id === workspace.id,
                                    },
                                ])}
                            >
                                <Disclosure.Button className="flex justify-between w-full p-2 bg-blue-400 rounded hover:bg-blue-300">
                                    <span className="text-sm font-medium truncate">{w.name}</span>
                                    <ChevronDownIcon
                                        className={buildClassName([
                                            {
                                                classes: 'block w-5 h-5',
                                            },
                                            {
                                                classes: 'transform rotate-180',
                                                append: open,
                                            },
                                        ])}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel>
                                    <div className="mt-2 border rounded border-black dark:border-white p-2">
                                        <Button
                                            onClick={() => selectWorkspace(w.id)}
                                            className="flex justify-between items-center w-full bg-amber-500 hover:bg-amber-400 border-amber-700 hover:border-amber-500 p-1 px-5"
                                        >
                                            <ExternalLinkIcon className="block" width={16} height={16} />
                                            <span className="text-sm">Select Worksplace</span>
                                        </Button>
                                        <div className="border border-black dark:border-white m-1" />
                                        <Button
                                            onClick={downloadWorkspace}
                                            className="flex justify-between items-center w-full bg-indigo-500 hover:bg-indigo-400 border-indigo-700 hover:border-indigo-500 p-1 px-5"
                                        >
                                            <DownloadIcon className="block" width={16} height={16} />
                                            <span className="text-sm">Export Workplace (.xml)</span>
                                        </Button>
                                        <div className="border border-black dark:border-white m-1" />
                                        <Button
                                            onClick={() => setUpdateWorkspaceModal(w)}
                                            className="flex justify-between items-center w-full bg-green-500 hover:bg-green-400 border-green-700 hover:border-green-500 p-1 px-5"
                                        >
                                            <PencilAltIcon className="block" width={16} height={16} />
                                            <span className="text-sm">Rename</span>
                                        </Button>
                                        <div className="border border-black dark:border-white m-1" />
                                        <Button
                                            onClick={() => setDeleteWorkspaceModal(w)}
                                            className="flex justify-between items-center w-full bg-red-500 hover:bg-red-400 border-red-700 hover:border-red-500 p-1 px-5"
                                        >
                                            <TrashIcon className="block" width={16} height={16} />
                                            <span className="text-sm">Delete Worksplace</span>
                                        </Button>
                                    </div>
                                </Disclosure.Panel>
                            </div>
                        )}
                    </Disclosure>
                ))}
            </div>

            <div className="p-5">
                <Button
                    onClick={() => setOpenImportModal(true)}
                    className="flex justify-between items-center w-full bg-indigo-500 hover:bg-indigo-400 border-indigo-700 hover:border-indigo-500 p-2"
                >
                    <UploadIcon className="block" width={32} height={32} />
                    Import Workplace (.xml)
                </Button>
                <Button
                    onClick={() => setCreateWorkspaceModal(true)}
                    className="flex justify-between items-center w-full bg-yellow-500 hover:bg-yellow-400 border-yellow-700 hover:border-yellow-500 p-2 mt-2"
                >
                    <DocumentAddIcon className="block" width={32} height={32} />
                    New Workplace
                </Button>
            </div>

            <FileDropZone
                open={openImportModal}
                title="Import Workspace"
                onComplete={handleImportComplete}
                onClose={() => setOpenImportModal(false)}
                accept=".xml, text/xml"
            />

            <ConditionalRender
                props={{
                    workspace: deleteWorkspaceModal,
                }}
            >
                {(props) => <DeleteWorkspaceModal onClose={() => setDeleteWorkspaceModal(undefined)} {...props} />}
            </ConditionalRender>
            <ConditionalRender
                props={{
                    workspace: updateWorkspaceModal,
                }}
            >
                {(props) => <UpdateWorkspaceModal onClose={() => setUpdateWorkspaceModal(undefined)} {...props} />}
            </ConditionalRender>
            {createWorkspaceModal ? <CreateWorkspaceModal onClose={() => setCreateWorkspaceModal(false)} /> : null}
        </div>
    );
};

export default StorageDrawer;
