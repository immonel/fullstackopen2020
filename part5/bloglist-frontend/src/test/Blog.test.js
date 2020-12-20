import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import { Blog } from '../components/BlogList'

const blog = {
  title: 'title',
  author: 'author',
  url: 'url',
  likes: 0,
  user: {
    username: 'username',
    name: 'name',
    id: 'userid'
  },
  id: 'blogid'
}

test('Blog renders only title and author when collapsed', () => {
  const component = render(<Blog blog={blog} />)

  expect(component.container).toHaveTextContent('title')
  expect(component.container).toHaveTextContent('author')
  expect(component.container).not.toHaveTextContent('url')
  expect(component.container).not.toHaveTextContent('0')
  expect(component.container).not.toHaveTextContent('name')
  expect(component.container).not.toHaveTextContent('username')
  expect(component.container).not.toHaveTextContent('blogid')
})

test('Blog renders all information when expanded using the button', () => {
  const component = render(<Blog blog={blog} />)
  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('title')
  expect(component.container).toHaveTextContent('author')
  expect(component.container).toHaveTextContent('url')
  expect(component.container).toHaveTextContent('0')
  expect(component.container).toHaveTextContent('name')
  expect(component.container).not.toHaveTextContent('username')
  expect(component.container).not.toHaveTextContent('blogid')
})

test('Callback function is called twice when like-button is pressed twice', () => {
  const mockHandler = jest.fn()
  const component = render(<Blog blog={blog} mock={mockHandler} />)
  const showButton = component.getByText('view')
  fireEvent.click(showButton)

  let likeButton = component.getByText('Like')
  fireEvent.click(likeButton)
  likeButton = component.getByText('Like')
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})