import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addCommentToBlog } from '../reducers/blogReducer'
import Button from 'react-bootstrap/Button';

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
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  if (!blog) {
    return null
  }
  const user_name = blog.user ? blog.user.name : null
  const removeButtonVisibility = {
    display: blog.user ? (blog.user.id === user.id ? '' : 'none') : 'none'
  }
  const addComment = (event) => {
    event.preventDefault()
    const newCommentList = blog.comments.concat(comment)
    dispatch(addCommentToBlog(blog, newCommentList))
    setComment('')
  }
  const blogURL = blog.url.includes('http') ? blog.url : 'http://' + blog.url
  return (
    <>
      <h2>{blog.title}</h2>
      <div><a href={blogURL}>{blog.url}</a></div>
      <div>
        {blog.likes}
        <Button variant="primary" size='sm' onClick={() => handleLikes(blog)} id="like-button">
          like
        </Button>
      </div>
      <div>added by {user_name}</div>
      <Button variant="primary" size='sm' style={removeButtonVisibility} onClick={() => handleDelete(blog)}>
        remove
      </Button>

      <div>
        <h3>comments</h3>
        <form onSubmit={addComment}>
          <input value={comment} onChange={({ target }) => setComment(target.value)} />
          <Button variant="primary" size='sm' type='submit'>add comment</Button>
        </form>
        {blog.comments.length > 0 &&
          <ul>
            {blog.comments.map(comment => (
              <li key={comment}>
                {comment}
              </li>
            ))}
          </ul>
        }
      </div>
    </>
  )
}

export { Blog, BlogDetail }
