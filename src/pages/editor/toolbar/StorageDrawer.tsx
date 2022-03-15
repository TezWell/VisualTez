import React from 'react';
import { Disclosure } from '@headlessui/react';
import {
    TrashIcon,
    PencilAltIcon,
    DocumentAddIcon,
    ChevronDownIcon,
    ExternalLinkIcon,
    DownloadIcon,
} from '@heroicons/react/outline';

import Button from 'src/components/common/Button';
import useEditor from 'src/context/hooks/useEditor';
import DrawerTitle from './DrawerTitle';
import { buildClassName } from 'src/utils/className';
import Modal from 'src/components/common/Modal';
import { IEditorWorkspace } from 'src/context/Editor';
import { downloadFile } from 'src/utils/download_upload';

interface DeleteWorkspaceModalProps {
    workspace: IEditorWorkspace;
    onClose: () => void;
}

const DeleteWorkspaceModal: React.FC<DeleteWorkspaceModalProps> = ({ workspace, onClose }) => {
    const { deleteWorkspace } = useEditor();

    const delWorkspace = React.useCallback(() => {
        deleteWorkspace(workspace.id);
        onClose();
    }, [deleteWorkspace, onClose, workspace.id]);

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
                    onClick={delWorkspace}
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
    const { createWorkspace } = useEditor();

    const updateName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);

    const newWorkspace = React.useCallback(() => {
        if (name) {
            createWorkspace(name);
            onClose();
        }
    }, [createWorkspace, name, onClose]);

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
    const { updateWorkspace } = useEditor();

    const updateName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);

    const changeWorkspaceName = React.useCallback(() => {
        if (name) {
            updateWorkspace({
                ...workspace,
                name,
            });
            onClose();
        }
    }, [updateWorkspace, workspace, name, onClose]);

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
    const { state, workspace, updateEditorState } = useEditor();
    const [createWorkspaceModal, setCreateWorkspaceModal] = React.useState(false);
    const [deleteWorkspaceModal, setDeleteWorkspaceModal] = React.useState<IEditorWorkspace>();
    const [updateWorkspaceModal, setUpdateWorkspaceModal] = React.useState<IEditorWorkspace>();

    const downloadWorkspace = () => {
        console.error(workspace);
        const fileName = `${workspace.name.replace(/\s/g, '_').toLowerCase()}.xml`;
        downloadFile(fileName, workspace.xml);
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
                                            onClick={() => updateEditorState({ currentWorkspace: w.id })}
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
                                            <span className="text-sm">Download</span>
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
                    onClick={() => setCreateWorkspaceModal(true)}
                    className="flex justify-center items-center w-full bg-yellow-500 hover:bg-yellow-400 border-yellow-700 hover:border-yellow-500 p-2"
                >
                    <DocumentAddIcon className="block" width={32} height={32} />
                    New Workplace
                </Button>
            </div>

            {!!deleteWorkspaceModal ? (
                <DeleteWorkspaceModal
                    workspace={deleteWorkspaceModal}
                    onClose={() => setDeleteWorkspaceModal(undefined)}
                />
            ) : null}
            {updateWorkspaceModal ? (
                <UpdateWorkspaceModal
                    workspace={updateWorkspaceModal}
                    onClose={() => setUpdateWorkspaceModal(undefined)}
                />
            ) : null}
            {createWorkspaceModal ? <CreateWorkspaceModal onClose={() => setCreateWorkspaceModal(false)} /> : null}
        </div>
    );
};

export default StorageDrawer;
