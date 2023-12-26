import React from "react";

const Authors = ({ authors }) => {
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {authors.results.map((author) => (
      <div
        key={author._id} // bg-white p-4 rounded-md shadow-md 
        className="transition-transform transform hover:scale-105 flex items-center"
      >
        <figure className='img'>
          <img src={author?.avatar?.url} alt="" className='person-img rounded-full object-cover' />
        </figure>
        <div><h3 className="text-lg font-semibold">{author.username}</h3>
          <p className="text-gray-600">{author.bio}</p></div>
      </div>
    ))}
  </div>
};

export default Authors;
