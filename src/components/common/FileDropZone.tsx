import React from 'react';
import { useDropzone } from 'react-dropzone';

import Button from './Button';
import Modal from './Modal';

interface FileDropZoneProps {
    open: boolean;
    title: string;
    placeholder?: string;
    onClose: () => void;
    onComplete: (file: File) => void;
    accept: string;
}

const FileDropZone: React.FC<FileDropZoneProps> = ({
    open,
    title,
    onClose,
    onComplete,
    placeholder = 'Drop file here...',
    accept = '.*',
}) => {
    const onDrop = React.useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                onComplete(acceptedFiles[0]);
            }
        },
        [onComplete],
    );
    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'text/*': [accept] },
        noDrag: false,
        multiple: false,
        onDrop,
    });

    const handleClose = () => {
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            height={96}
            title={
                <div className="flex items-center text-xl text-center align-middle font-mono text-ellipsis overflow-hidden">
                    {title}
                </div>
            }
            actions={[
                <Button
                    key="cancel"
                    onClick={handleClose}
                    className="bg-yellow-500 hover:bg-yellow-400 border-yellow-700 hover:border-yellow-500 p-2"
                >
                    Cancel
                </Button>,
            ]}
        >
            <div className="p-2 h-full">
                <div
                    {...getRootProps({
                        className: 'flex items-center p-100 border-2 border-dashed h-full',
                    })}
                >
                    <input {...getInputProps()} />
                    <p className="flex-1 text-center align-middle font-mono text-black dark:text-white">
                        {placeholder}
                    </p>
                </div>
            </div>
        </Modal>
    );
};

export default FileDropZone;
