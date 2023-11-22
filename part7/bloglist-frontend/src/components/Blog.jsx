import { useState } from 'react'
import { Link } from 'react-router-dom'


const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className="blog">
      <div className="firstLevel">
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
      </div>
    </div>
  )
}

const BlogDetail = ({ blog, user, handleLikes, handleDelete }) => {
  if (!blog) {
    return null
  }
  const user_name = blog.user ? blog.user.name : null
  const removeButtonVisibility = {
    display: blog.user ? (blog.user.id === user.id ? '' : 'none') : 'none'
  }
  return (
    <>
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <div>
        {blog.likes}
        <button onClick={() => handleLikes(blog)} id="like-button">
          like
        </button>
      </div>
      <div>added by {user_name}</div>
      <button style={removeButtonVisibility} onClick={() => handleDelete(blog)}>
          remove
      </button>

      {blog.comments.length > 0 &&
        <div>
          <h3>comments</h3>
          <ul>
            {blog.comments.map(comment => (
              <li key={comment}>
                {comment}
              </li>
            ))}
          </ul>
        </div>
      }
    </>

  )
}

export { Blog, BlogDetail }
