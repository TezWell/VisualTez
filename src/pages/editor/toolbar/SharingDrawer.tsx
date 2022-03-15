import React from 'react';
import { CheckIcon } from '@heroicons/react/outline';

import Button from 'src/components/common/Button';
import { copyToClipboard } from 'src/utils/clipboard';
import { generateRandomString } from 'src/utils/rand';
import { AES } from 'src/utils/crypto';
import Http from 'src/utils/http';
import settings from 'src/settings.json';
import useEditor from 'src/context/hooks/useEditor';
import CircularLoading from 'src/components/common/Spinner';
import DrawerTitle from './DrawerTitle';

export const generatePermalink = async (content: string) => {
    if (content) {
        const passPhrase = generateRandomString();
        const encrypted = AES.encrypt(content, passPhrase);
        const { data } = await Http.post<{ hash: string }>(
            `${settings.storage_api}/sharings`,
            { content: encrypted },
            { timeout: 10000 },
        );

        return `${window.location.origin}/editor?h=${data.hash}&k=${passPhrase}`;
    }
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SharingDrawerProps {}

const SharingDrawer: React.FC<SharingDrawerProps> = () => {
    const { workspace } = useEditor();
    const [permalink, setPermalink] = React.useState<string>();
    const [error, setError] = React.useState<string>();
    const [generatingPermalink, setGeneratingPermalink] = React.useState(false);

    const generatePermaLink = React.useCallback(() => {
        setGeneratingPermalink(true);
        generatePermalink(workspace.xml)
            .then(setPermalink)
            .catch((e) => {
                setError(e?.toString() || 'Could not generate permalink.');
            })
            .finally(() => setGeneratingPermalink(false));
    }, [workspace]);

    return (
        <div className="flex flex-col w-full h-full p-5">
            <DrawerTitle title="Share" />

            <div className="flex grow justify-center items-center">
                {generatingPermalink ? (
                    <CircularLoading message="UPLOADING" />
                ) : permalink ? (
                    <div className="p-5 flex flex-col justify-center items-center gap-3 w-full">
                        <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-200">
                            <CheckIcon className="block h-8 w-8" aria-hidden="true" />
                        </div>
                        <h1 className="text-lg font-bold text-black dark:text-white text-center align-middle font-mono">
                            Permalink generated!
                        </h1>
                        <h6 className="truncate text-xs w-full break-normal overflow-x-scroll font-mono border p-2 rounded-lg text-yellow-500 ">
                            {permalink}
                        </h6>
                        <Button
                            onClick={() => copyToClipboard(permalink)}
                            className="w-full bg-blue-500 hover:bg-blue-400 border-blue-700 hover:border-blue-500 p-2"
                        >
                            Copy Permalink
                        </Button>
                    </div>
                ) : (
                    error
                )}
            </div>
            <Button
                onClick={generatePermaLink}
                className="bg-yellow-500 hover:bg-yellow-400 border-yellow-700 hover:border-yellow-500 disabled:bg-yellow-500 disabled:border-yellow-700 p-2"
            >
                Generate Permalink
            </Button>
        </div>
    );
};

export default SharingDrawer;
