import React from 'react';
import { Dialog, Transition } from '@headlessui/react';

export interface ModalProps {
    children?: React.ReactNode;
    open: boolean;
    title?: React.ReactElement;
    onClose: () => void;
    actions?: React.ReactElement[];
}

const Modal: React.FC<ModalProps> = ({ open, title, onClose, actions, children }) => {
    return (
        <Transition.Root show={open} as={React.Fragment}>
            <Dialog as="div" className="fixed z-100 inset-0 overflow-y-auto" onClose={onClose}>
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center block">
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
                    </Transition.Child>

                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block bg-white dark:bg-black rounded-lg text-left overflow-hidden shadow-xl transform transition-all align-middle w-[80%]">
                            <div className="flex flex-col bg-white dark:bg-black h-full">
                                {title ? (
                                    <div className="p-3 bg-gray-400 bg-opacity-20">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg leading-6 font-medium text-black dark:text-white"
                                        >
                                            {title}
                                        </Dialog.Title>
                                    </div>
                                ) : null}
                                <div className="relative h-96 border-t border-b border-yellow-400 dark:border-yellow-500 bg-white dark:bg-gray-400 dark:bg-opacity-20">
                                    {children}
                                </div>
                                <div className="bg-gray-400 bg-opacity-20 flex space-x-2 justify-end h-14 p-2">
                                    {actions}
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default Modal;
