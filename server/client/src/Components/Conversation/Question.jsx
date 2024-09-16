import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism'; // You can use any theme

const Question = ({ content }) => {
  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={okaidia}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };
  return (
    <div className='flex justify-end'>
      <div className='bg-gradient-to-r from-purple-500 to-pink-500 text-white my-2 rounded-lg p-4 shadow-md ml-60'>
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Question;

 