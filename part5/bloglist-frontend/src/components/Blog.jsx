import { useState } from 'react'

const Blog = ({ blog, user, handleLikes, handleDelete }) => {
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
  const user_name = blog.user ? blog.user.name : null
  const toggleVisibility = () => setView(!view)
  const removeButtonVisibility = { display: blog.user ? blog.user.id === user.id ? '' : 'none' : 'none' }

  return (
    <div style={blogStyle}>
      <div className='firstLevel'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={detailsStyle} className='secondLevel'>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button onClick={handleLikes}>like</button>
        </div>
        <div>{user_name}</div>
        <button style={removeButtonVisibility} onClick={handleDelete}>remove</button>
      </div>
    </div>
  )
}
export default Blog