import React, { useContext, useState } from 'react'
import blogService from '../services/blogs'
import { UserContext, BlogsContext } from '../App'
import './BlogList.css'
import PropTypes from 'prop-types'

export const Blog = ({ blog, mock = () => {} }) => {
  /**
   * Mock prop is used for exercise 5.15 since the callback
   * functions are not passed as props, but instead context is used
   */


  const [ _blog, setBlog ] = useState(blog)
  const [ expanded, setExpanded ] = useState(false)
  const userContext = useContext(UserContext)
  const blogsContext = useContext(BlogsContext)

  const ExpandButton = () => <button className='toggle-expand-button' onClick={() => setExpanded(!expanded)}>{expanded ? 'hide' : 'view'}</button>
  const DeleteButton = () => <button id='delete-button' onClick={deleteBlog}>Delete</button>
  const LikeButton = ({ mock }) => <button id='like-button' onClick={() => { mock(); like() }}>Like</button>

  const like = () => {
    blogService.addLike(_blog)
    setBlog({ ..._blog, likes: _blog.likes + 1 })
  }

  const blogAdder = _blog.user.username
  const loggedInUser = userContext.user.username

  const deleteBlog = () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      blogService.deleteBlog(_blog)
      blogsContext.setBlogs(blogsContext.blogs.filter((b) => b.id !== _blog.id))
    }
  }

  return (
    <div className='single-blog'>
      {_blog.title} (by {_blog.author}) <ExpandButton />
      {
        !expanded ? <></> :
          <div className='blog-details'>
            <p>
              URL: {_blog.url}<br />
              Likes: <span className='likes'>{_blog.likes}</span> <LikeButton mock={mock} /><br />
              Added by: {_blog.user.name}
            </p>
            {blogAdder === loggedInUser && <DeleteButton />}
          </div>
      }
    </div>
  )
}

const BlogList = ({ blogs }) => {
  const sorted = blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
  return (
    <div className='blog-list'>
      {sorted.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  mock: PropTypes.func
}

BlogList.propTypes = {
  blogs: PropTypes.array
}

export default BlogList