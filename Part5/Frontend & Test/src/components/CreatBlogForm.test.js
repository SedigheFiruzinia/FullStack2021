import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreatBlogForm from './CreatBlogForm'


test('blogform updates parent state and calls onSubmit',() => {
  const creatBlog = jest.fn()

  const component = render(<CreatBlogForm creat={creatBlog}/>)


  const form = component.container.querySelector('form')
  const auther = component.container.querySelector('#auther')
  const url = component.container.querySelector('#url')
  const title = component.container.querySelector('#title')

  fireEvent.change(auther, { target: { value:'Masume' } })
  fireEvent.change(url, { target: { value:'//' } })
  fireEvent.change(title, { target: { value:'University' } })

  fireEvent.submit(form)

  expect(creatBlog.mock.calls).toHaveLength(1)
  expect(creatBlog.mock.calls[0][0].auther).toBe('Masume')
  expect(creatBlog.mock.calls[0][0].url).toBe('//')
  expect(creatBlog.mock.calls[0][0].title).toBe('University')
})
