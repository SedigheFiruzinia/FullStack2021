import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and auther', () => {
  const blog = {
    title: 'hiiiii',
    auther: 'sedi',
    likes: 10,
    url:'//'
  }

  const component = render(
    <Blog blog={blog} />
  )
  component.debug()
  //////////////////////////
  //method 1
  expect(component.container).toHaveTextContent('sedi')
  // method 2
  const element = component.getByText('hiiiii sedi')
  expect(element).toBeDefined()
  // method 3
  const div = component.container.querySelector('.blogclass')
  expect(div).toHaveTextContent('sedi')

})

test('clicking the button calls event handler once',() => {
  const blog = {
    title: 'hiiiii',
    auther: 'sedi',
    likes: 10,
    url:'//',
    user: {
      id :'61687324bb11de2e40110e2d',
      name:'Masume'
    }
  }

  const component = render(
    <Blog blog={blog}/>
  )
  component.debug()
  const button = component.getByText('view')
  fireEvent.click(button)
  // mehtod 1
  expect(component.container).toHaveTextContent(10)
  // method 2
  const element = component.getByText('hiiiii sedi',10,'// Masume')
  expect(element).toBeDefined()
})



test('clicking the like button twice',() => {
  const blog = {
    title: 'hiiiii',
    auther: 'sedi',
    likes: 10,
    url:'//',
    user: {
      id :'61687324bb11de2e40110e2d',
      name:'Masume'
    }
  }
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} update={mockHandler}/>
  )
  component.debug()
  const button = component.getByText('view')
  fireEvent.click(button)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  expect(mockHandler).toHaveBeenCalledTimes(3)

})