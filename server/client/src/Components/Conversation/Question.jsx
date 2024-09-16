import React from 'react';
import ReactMarkdown from 'react-markdown';

const Question = ({ content }) => {
  return (
    <div className='flex justify-end'>
      <div className='bg-gradient-to-r from-purple-500 to-pink-500 text-white my-2 rounded-lg p-4 shadow-md ml-60'>
      <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Question;

 