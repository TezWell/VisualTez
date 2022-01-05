import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import a11yDark from 'react-syntax-highlighter/dist/cjs/styles/prism/a11y-dark';

SyntaxHighlighter.registerLanguage('json', json);

interface OwnProps {
    square?: boolean;
    withCopy?: boolean;
    language: string;
    showLineNumbers: boolean;
    text: string;
    wrapLongLines?: boolean;
}

const CodeBlock: React.FC<OwnProps> = ({ text, wrapLongLines = false, ...props }) => {
    return (
        <SyntaxHighlighter
            {...props}
            className="h-full scrollbar-thin scrollbar-thumb-gray-400"
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
