import React from 'react';
import { Disclosure } from '@headlessui/react';
import { TrashIcon, PencilAltIcon, DocumentAddIcon, ChevronDownIcon, ExternalLinkIcon } from '@heroicons/react/outline';

import Button from 'src/components/common/Button';
import useEditor from 'src/context/hooks/useEditor';
import DrawerTitle from './DrawerTitle';
import { buildClassName } from 'src/utils/className';
import Modal from 'src/components/common/Modal';
import { IEditorWorkspace } from 'src/context/Editor';

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
                    key="import"
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
                    key="import"
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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface StorageDrawerProps {}

const StorageDrawer: React.FC<StorageDrawerProps> = () => {
    const { state, updateEditorState } = useEditor();
    const [createWorkspaceModal, setCreateWorkspaceModal] = React.useState(false);
    const [deleteWorkspaceModal, setDeleteWorkspaceModal] = React.useState<IEditorWorkspace>();

    return (
        <div className="flex flex-col w-full h-full">
            <div className="p-5">
                <DrawerTitle title="Storage" />
            </div>

            <div className="flex flex-col grow basis-0 p-5 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
                {Object.values(state.workspaces).map((workspace) => (
                    <Disclosure key={workspace.id}>
                        {({ open }) => (
                            <div
                                className={buildClassName([
                                    {
                                        classes: 'border rounded border-black dark:border-white mb-2 p-2',
                                    },
                                    {
                                        classes: 'border-blue-500 dark:border-blue-500',
                                        append: workspace.id === state.currentWorkspace,
                                    },
                                ])}
                            >
                                <Disclosure.Button className="flex justify-between w-full p-2 text-sm font-medium bg-blue-400 rounded hover:bg-blue-300">
                                    <span>{workspace.name}</span>
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
                                            onClick={() => updateEditorState({ currentWorkspace: workspace.id })}
                                            className="flex justify-between items-center w-full bg-amber-500 hover:bg-amber-400 border-amber-700 hover:border-amber-500 p-1 px-5"
                                        >
                                            <ExternalLinkIcon className="block" width={24} height={24} />
                                            <span className="pt-1">Select Worksplace</span>
                                        </Button>
                                        <div className="border border-black dark:border-white m-1" />
                                        <Button
                                            onClick={() => setDeleteWorkspaceModal(workspace)}
                                            className="flex justify-between items-center w-full bg-green-500 hover:bg-green-400 border-green-700 hover:border-green-500 p-1 px-5"
                                        >
                                            <PencilAltIcon className="block" width={24} height={24} />
                                            <span className="pt-1">Rename</span>
                                        </Button>
                                        <div className="border border-black dark:border-white m-1" />
                                        <Button
                                            onClick={() => setDeleteWorkspaceModal(workspace)}
                                            className="flex justify-between items-center w-full bg-red-500 hover:bg-red-400 border-red-700 hover:border-red-500 p-1 px-5"
                                        >
                                            <TrashIcon className="block" width={24} height={24} />
                                            <span className="pt-1">Delete Worksplace</span>
                                        </Button>
                                    </div>
                                </Disclosure.Panel>
                            </div>
                        )}
                    </Disclosure>
                    // <div
                    //     key={workspace.id}
                    //     className={buildClassName([
                    //         {
                    //             classes:
                    //                 'flex mb-3 bg-white shadow-lg rounded-md p-2 dark:bg-black border-2 border-black dark:border-white',
                    //         },
                    //         {
                    //             classes: 'border-blue-500 dark:border-blue-500',
                    //             append: workspace.id === state.currentWorkspace,
                    //         },
                    //     ])}
                    // >

                    //     <input
                    //         key={workspace.id}
                    //         type="text"
                    //         name="workspace-name"
                    //         className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border-gray-300  dark:text-black"
                    //         value={workspace.name}
                    //     />
                    //     <div className="p-2" />
                    //     <button
                    //         className="text-blue-200 hover:text-blue-500"
                    //         onClick={() => updateEditorState({ currentWorkspace: workspace.id })}
                    //     >
                    //         <PencilAltIcon className="block" width={24} height={24} />
                    //     </button>
                    //     <div className="p-2" />
                    //     <button
                    //         className="text-red-200 hover:text-red-500"
                    //         onClick={() => setDeleteWorkspaceModal(workspace)}
                    //     >
                    //         <TrashIcon className="block" width={24} height={24} />
                    //     </button>
                    // </div>
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
            {createWorkspaceModal ? <CreateWorkspaceModal onClose={() => setCreateWorkspaceModal(false)} /> : null}
        </div>
    );
};

export default StorageDrawer;
