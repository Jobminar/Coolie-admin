import React, { useState, useEffect } from "react";
import AddBlogs from "./AddBlogs";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useDropzone } from "react-dropzone";
import ReactPlayer from "react-player";
import "./Blogs.css"; // Updated CSS for enhanced styling

const Blogs = () => {
  const [blogs, setBlogs] = useState([]); // Store all blogs
  const [currentPageBlogs, setCurrentPageBlogs] = useState([]); // Store blogs for the current page
  const [pageCount, setPageCount] = useState(0); // Total number of pages
  const [currentPage, setCurrentPage] = useState(0); // Tracks current page
  const blogsPerPage = 5; // Number of blogs per page
  const [isEditing, setIsEditing] = useState(false); // Controls edit modal visibility
  const [editingBlog, setEditingBlog] = useState(null); // Stores blog being edited
  const [imagePreview, setImagePreview] = useState(null); // Preview of the image
  const [videoPreview, setVideoPreview] = useState(null); // Preview of the video

  // Fetch all blogs from API
  const fetchBlogs = async () => {
    try {
      const response = await fetch(
        "https://admin-tasktigers-f4esbabqggekahc9.southindia-01.azurewebsites.net/v1.0/admin/blogs",
      );
      const data = await response.json();
      if (response.ok) {
        setBlogs(data); // Store all blogs
        setPageCount(Math.ceil(data.length / blogsPerPage)); // Calculate total pages
        paginateBlogs(data, 0); // Set the initial blogs for the first page
      } else {
        console.error("Error fetching blogs:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Paginate the blogs based on the current page
  const paginateBlogs = (allBlogs, page) => {
    const startIndex = page * blogsPerPage;
    const selectedBlogs = allBlogs.slice(startIndex, startIndex + blogsPerPage);
    setCurrentPageBlogs(selectedBlogs);
  };

  // Load blogs on initial render
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Add a new blog
  const addBlog = (newBlog) => {
    setBlogs([newBlog, ...blogs]); // Add new blog to the list
    paginateBlogs([newBlog, ...blogs], currentPage); // Update the page content
  };

  // Delete a blog
  const deleteBlog = async (index, blogId) => {
    try {
      await fetch(
        `https://admin-tasktigers-f4esbabqggekahc9.southindia-01.azurewebsites.net/v1.0/admin/blogs/${blogId}`,
        {
          method: "DELETE",
        },
      );
      const updatedBlogs = blogs.filter((_, i) => i !== index);
      setBlogs(updatedBlogs);
      paginateBlogs(updatedBlogs, currentPage); // Update the current page after deletion
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  // Update (PATCH) the blog with new data
  const editBlog = async (updatedBlog) => {
    try {
      // Create a formData object to handle potential file uploads
      const formData = new FormData();
      formData.append("title", updatedBlog.title);
      formData.append("subject", updatedBlog.subject);
      formData.append("text", updatedBlog.text);

      // Append files (image, video) if present
      if (updatedBlog.image instanceof File) {
        formData.append("image", updatedBlog.image);
      }
      if (updatedBlog.video instanceof File) {
        formData.append("video", updatedBlog.video);
      }

      // Send a PATCH request to update the blog
      const response = await fetch(
        `https://admin-tasktigers-f4esbabqggekahc9.southindia-01.azurewebsites.net/v1.0/admin/blogs/${updatedBlog._id}`,
        {
          method: "PATCH",
          body: formData,
        },
      );

      if (response.ok) {
        const updatedBlogs = blogs.map((blog, index) =>
          index === editingBlog.index ? updatedBlog : blog,
        );
        setBlogs(updatedBlogs);
        paginateBlogs(updatedBlogs, currentPage); // Update the page content after editing
        setIsEditing(false); // Close the edit modal
      } else {
        console.error("Error updating blog:", await response.json());
      }
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  // Open the edit modal and set the current blog data
  const handleEdit = (index) => {
    const blogToEdit = blogs[index];
    setEditingBlog({ index, ...blogToEdit });
    setImagePreview(blogToEdit.image);
    setVideoPreview(blogToEdit.video);
    setIsEditing(true); // Open the edit modal
  };

  // Close the edit modal without saving changes
  const handleCancelEdit = () => {
    setIsEditing(false); // Close the edit modal when clicking "Cancel"
  };

  // Handle image drop
  const onDropImage = (acceptedFiles) => {
    const image = acceptedFiles[0];
    setEditingBlog({ ...editingBlog, image });
    setImagePreview(URL.createObjectURL(image));
  };

  // Handle video drop
  const onDropVideo = (acceptedFiles) => {
    const video = acceptedFiles[0];
    setEditingBlog({ ...editingBlog, video });
    setVideoPreview(URL.createObjectURL(video));
  };

  const { getRootProps: getRootPropsImage, getInputProps: getInputPropsImage } =
    useDropzone({
      accept: "image/*",
      onDrop: onDropImage,
    });

  const { getRootProps: getRootPropsVideo, getInputProps: getInputPropsVideo } =
    useDropzone({
      accept: "video/*",
      onDrop: onDropVideo,
    });

  // Handle page change from ReactPaginate
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected); // Update the current page
    paginateBlogs(blogs, selected); // Paginate based on the new page
  };

  return (
    <div className="tigress-container">
      {/* Add new blogs */}
      <AddBlogs onAdd={addBlog} />

      {/* Display blogs with pagination */}
      {currentPageBlogs.length > 0 ? (
        <div className="tigress-grid">
          {currentPageBlogs.map((blog, index) => (
            <div key={index} className="tigress-blog-card">
              {/* Blog Edit/Delete buttons */}
              <div className="tigress-card-actions">
                <button
                  className="tigress-btn-edit"
                  onClick={() => handleEdit(index)}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className="tigress-btn-delete"
                  onClick={() => deleteBlog(index, blog._id)}
                >
                  <FaTrashAlt /> Delete
                </button>
              </div>
              {/* Blog content */}
              <h3>{blog.title}</h3>
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="tigress-image"
                />
              )}
              {blog.video && (
                <video className="tigress-video" controls>
                  <source src={blog.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              <p>{blog.subject}</p>
              <p className="tigress-card-description">{blog.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No blogs available</p>
      )}

      {/* Pagination Component */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination-link"}
        nextLinkClassName={"pagination-link"}
        disabledClassName={"pagination-disabled"}
        activeClassName={"pagination-active"}
      />

      {/* Edit Modal */}
      {isEditing && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h2>Edit Blog</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editBlog(editingBlog);
              }}
            >
              <div className="edit-wrapper">
                {/* Blog title */}
                <input
                  type="text"
                  value={editingBlog.title}
                  onChange={(e) =>
                    setEditingBlog({ ...editingBlog, title: e.target.value })
                  }
                  placeholder="Title"
                  className="tigress-input"
                  required
                />
                {/* Blog subject */}
                <input
                  type="text"
                  value={editingBlog.subject}
                  onChange={(e) =>
                    setEditingBlog({ ...editingBlog, subject: e.target.value })
                  }
                  placeholder="Subject"
                  className="tigress-input"
                  required
                />
                {/* Blog description */}
                <textarea
                  value={editingBlog.text}
                  onChange={(e) =>
                    setEditingBlog({ ...editingBlog, text: e.target.value })
                  }
                  placeholder="Description"
                  className="tigress-textarea"
                  required
                />

                {/* Image Upload Section */}
                <div {...getRootPropsImage()} className="tigress-dropzone">
                  <input {...getInputPropsImage()} />
                  <p>Drag and drop an image, or click to select one</p>
                </div>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="tigress-preview-image"
                  />
                )}

                {/* Video Upload Section */}
                <div {...getRootPropsVideo()} className="tigress-dropzone">
                  <input {...getInputPropsVideo()} />
                  <p>Drag and drop a video, or click to select one</p>
                </div>
                {videoPreview && (
                  <ReactPlayer
                    url={videoPreview}
                    controls={true}
                    width="100%"
                    height="200px"
                    className="tigress-preview-video"
                  />
                )}
              </div>
              {/* Modal actions: Save or Cancel */}
              <div className="edit-modal-actions">
                <button type="submit" className="tigress-btn-save">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="tigress-btn-cancel"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
