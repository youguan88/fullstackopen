import React, { useReducer } from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Blog,ToggleButton } from './Blog'
import App from '../App'

const blog = {
  'title': 'six and seven',
  'author': 'real time',
  'url': 'www.sixandseven.com',
  'user': {
    'username': 'emily',
    'name': 'emily watsons',
    'id': '65425ad9c1c361c7dbeb068d'
  },
  'id': '6549f29d0dbdc20fa5f1a584',
  'likes': 0
}
const user = {
  'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVtaWx5IiwiaWQiOiI2NTQyNWFkOWMxYzM2MWM3ZGJlYjA2OGQiLCJpYXQiOjE2OTk0MDYyMDl9.o7Q7hn5tAfmUz4FWcTMHsu4X7h-7km9pXSmjHsANrp8',
  'username': 'emily',
  'name': 'emily watsons',
  'id': '65425ad9c1c361c7dbeb068d'
}


test('renders content', () => {
  const { container } = render(<Blog
    blog={blog}
    user={user}
    handleDelete={() => App.deleteBlog(blog)}
    handleLikes={() => App.updateLikes(blog)}/>)

  const firstLevelDiv = container.querySelector('.firstLevel')
  expect(firstLevelDiv).toHaveTextContent('six and seven')
  expect(firstLevelDiv).toHaveTextContent('real time')

  const secondLevelDiv = container.querySelector('.secondLevel')
  expect(secondLevelDiv).toHaveStyle('display: none')
})

test('shows content after clicking view button', async () => {
  const { container } = render(<Blog
    blog={blog}
    user={user}
    handleDelete={() => App.deleteBlog(blog)}
    handleLikes={() => App.updateLikes(blog)}/>)
  const ue = userEvent.setup()
  const button = screen.getByText('view')
  await ue.click(button)
  const secondLevelDiv = container.querySelector('.secondLevel')
  expect(secondLevelDiv).not.toHaveStyle('display: none')
})

test('clicking the button twice calls event handler twice', async () => {
  const mockHandler = jest.fn()
  render(<ToggleButton
    action={mockHandler}
    label='view'/>)
  const ue = userEvent.setup()
  const button = screen.getByText('view')
  await ue.click(button)
  await ue.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})