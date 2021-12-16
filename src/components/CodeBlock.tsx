import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/cjs/languages/hljs/json';
import a11yDark from 'react-syntax-highlighter/dist/cjs/styles/hljs/a11y-dark';

SyntaxHighlighter.registerLanguage('json', json);

interface OwnProps {
    square?: boolean;
    withCopy?: boolean;
    language: string;
    showLineNumbers: boolean;
    text: string;
    wrapLongLines?: boolean;
    editProps?: {
        open: boolean;
        onOpenChange: () => void;
        onCodeChange: (value: string) => void;
    };
}

const CodeBlock: React.FC<OwnProps> = ({ text, square = true, wrapLongLines = false, editProps, ...props }) => {
    return (
        <SyntaxHighlighter
            {...props}
            className="h-full"
            style={a11yDark}
            customStyle={{
                maxHeight: 500,
            }}
            wrapLines
            wrapLongLines={wrapLongLines}
        >
            {text}
        </SyntaxHighlighter>
    );
};

export default CodeBlock;
