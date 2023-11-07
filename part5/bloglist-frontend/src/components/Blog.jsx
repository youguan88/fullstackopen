import { useState } from 'react'

const Blog = ({ blog }) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const detailsStyle = {
    display : view ? '' : 'none'
  }

  const buttonLabel = view ? 'hide' : 'view'
  const user = blog.user ? blog.user.name : null
  const toggleVisibility = () => setView(!view)

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={detailsStyle}>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button>like</button>
        </div>
        <div>{user}</div>
      </div>
    </div>
  )
}
export default Blog