"use client";
import React, { useEffect, useState } from 'react';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8; 

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/blogs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.data) {
          setBlogs(data.data);
        } else {
          throw new Error("Invalid data structure");
        }
      })
      .catch((error) => console.error("Failed to fetch blogs:", error));
  }, []);

  const totalPages = Math.ceil(blogs.length / cardsPerPage);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-4xl text-center mt-6">News</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 p-6">
        {currentBlogs.map((blog) => (
          <div key={blog._id} className="bg-white overflow-hidden">
            <div className="relative group overflow-hidden">
              <img
                src={blog.image ? `http://localhost:3001/uploads/${blog.image}` : 'https://via.placeholder.com/150'}
                alt={blog.title}
                className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <span className="absolute top-3 left-3 bg-black text-white px-3 py-1 text-xs font-bold uppercase">
                {blog.category || "News"}
              </span>
            </div>
            <div className="p-5">
              <p className="text-sm text-gray-500 mb-2">
                POST BY {blog.postedBy ? blog.postedBy.toUpperCase() : "Unknown Author"} -{" "}
                {new Date(blog.postDate).toDateString()}
              </p>
              <h2 className="text-lg font-semibold mb-3 text-black">
                {blog.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {blog.description.length > 100
                  ? `${blog.description.substring(0, 100)}...`
                  : blog.description}
              </p>
              <button className="text-black font-semibold underline-animation">
                Continue Reading
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 ${currentPage === index + 1 ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 border border-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
