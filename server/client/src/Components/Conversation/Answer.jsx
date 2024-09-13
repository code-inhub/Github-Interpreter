import React from 'react';

function Answer({ content }) {
  return (
    <div className='bg-gray-300  text-black mr-16 my-2 rounded-2xl p-4 shadow-lg '>
      {content}
    </div>
  );
}

export default Answer;