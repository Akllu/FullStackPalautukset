import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('<Blog />', () => {
  let container
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test author',
    url: 'https://www.testing.com',
    likes: 100,
    user: {
      name: 'testUser'
    }
  }
  const mockHandler = jest.fn()

  beforeEach(() => {
    container = render(
      <Blog blog={blog} user={blog.user} updateLikes={mockHandler} />
    ).container
  })

  test('renders title and author', () => {
    const div = container.querySelector('.testBlogContainer')
    expect(div).toHaveTextContent('Component testing is done with react-testing-library')
    expect(div).toHaveTextContent('Test author')
  })

  test('does not render url and likes by default', () => {
    const div = container.querySelector('.testTogglableContent')
    expect(div).toBeUndefined
  })

  test('clicking the view button renders url and likes', async () => {
    const button = screen.getByText('View')
    userEvent.click(button)
    const div = container.querySelector('.testTogglableContent')
    expect(div).toHaveTextContent('https://www.testing.com')
    expect(div).toHaveTextContent('100')
  })

  test('clicking the like button twice calls the event handler twice', async () => {
    const button = screen.getByText('View')
    userEvent.click(button)
    const likeButton = screen.getByText('Like')
    userEvent.click(likeButton)
    userEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('<BlogForm /> calls the callback with correct when data is submitted', () => {
    const createBlog = jest.fn()

    render(<BlogForm createBlog={createBlog} setMessage={() => console.log('Blog created from test')} />)

    const titleInput = screen.getByPlaceholderText('Enter a title')
    const authorInput = screen.getByPlaceholderText('Enter a author')
    const urlInput = screen.getByPlaceholderText('Enter a URL')
    const likesInput = screen.getByPlaceholderText('Enter likes')

    const sendButton = screen.getByText('Submit')

    userEvent.type(titleInput, 'test for title')
    userEvent.type(authorInput, 'test for author')
    userEvent.type(urlInput, 'test for url')
    userEvent.type(likesInput, '2')
    userEvent.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('test for title')
    expect(createBlog.mock.calls[0][0].author).toBe('test for author')
    expect(createBlog.mock.calls[0][0].url).toBe('test for url')
    expect(createBlog.mock.calls[0][0].likes).toBe('2')
  })

})

