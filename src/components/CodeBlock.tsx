import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';
import darkTheme from 'react-syntax-highlighter/dist/cjs/styles/prism/a11y-dark';
import lightTheme from 'react-syntax-highlighter/dist/cjs/styles/prism/material-light';

import useTheme from 'src/context/hooks/useTheme';
import { copyToClipboard } from 'src/utils/clipboard';
import Button from './common/Button';

SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('python', python);

interface OwnProps {
    square?: boolean;
    withCopy?: boolean;
    language: string;
    showLineNumbers: boolean;
    text: string;
    wrapLongLines?: boolean;
}

const CodeBlock: React.FC<OwnProps> = ({ text, square, withCopy, wrapLongLines = false, ...props }) => {
    const { isDark } = useTheme();

    const copy = () => {
        copyToClipboard(text);
    };

    return text ? (
        <div
            className="relative h-full w-full overflow-auto scrollbar-thin scrollbar-thumb-gray-400"
            style={{
                borderRadius: square ? 0 : 10,
            }}
        >
            {withCopy ? (
                <Button
                    onClick={copy}
                    className="absolute z-20 p-2 right-5 top-2 bg-blue-500 hover:bg-blue-400 border-blue-700 hover:border-blue-500"
                >
                    Copy
                </Button>
            ) : null}
            <SyntaxHighlighter
                {...props}
                style={isDark ? darkTheme : lightTheme}
                customStyle={{
                    margin: 0,
                }}
                wrapLines
                wrapLongLines={wrapLongLines}
            >
                {text}
            </SyntaxHighlighter>
        </div>
    ) : null;
};

export default CodeBlock;
