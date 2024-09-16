import React from 'react';
import ReactMarkdown from 'react-markdown';

function Answer({ content }) {
  return (
    <div className='bg-gray-300 text-black mr-16 my-2 rounded-2xl p-4 shadow-lg'>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

export default Answer;
 