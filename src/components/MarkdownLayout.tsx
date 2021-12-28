import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkHtml from 'remark-html';

interface MarkdownLayoutProps {
    markdown: string;
}

const MarkdownLayout: React.FC<MarkdownLayoutProps> = ({ markdown }) => {
    return (
        <ReactMarkdown
            className="prose dark:prose-invert prose-2xl container mx-auto pt-24 pb-24"
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm, remarkHtml]}
        >
            {markdown}
        </ReactMarkdown>
    );
};

export default MarkdownLayout;
