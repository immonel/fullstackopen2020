import React, { useContext, useState } from 'react'
import blogService from '../services/blogs'
import { NotificationContext, BlogsContext } from '../App'
import PropTypes from 'prop-types'

const CreateBlog = ({ closeForm }) => {
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')

  const nContext = useContext(NotificationContext)
  const bContext = useContext(BlogsContext)

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const blog = await blogService.create(title, author, url)
      console.log(blog)
      nContext.notify('success', 'Blog was successfully added!')
      bContext.setBlogs(bContext.blogs.concat(blog))
      closeForm()

    } catch (error) {
      nContext.notify('error', 'Failed to add blog')
    } finally {

      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <form className='create-blog-form' onSubmit={handleSubmit}>
      <h3>Create a new blog</h3>
      Title
      <input id='form-title' type='text' value={title} onChange={({ target }) => setTitle(target.value)} />
      <br />Author
      <input id='form-author' type='text' value={author} onChange={({ target }) => setAuthor(target.value)} />
      <br />URL
      <input id='form-url' type='text' value={url} onChange={({ target }) => setUrl(target.value)} />
      <br />
      <button id='create-button' type='submit'>Create</button>
      <button id='cancel-button' type='reset' onClick={closeForm}>Cancel</button>
    </form>
  )
}

CreateBlog.propTypes = {
  closeForm: PropTypes.func.isRequired
}

export default CreateBlog