import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './app.css'
import { loadPosts, addPost } from './modules/posts'
import Posts from './components/Posts'
import Form from './components/Form'

export const App = () => {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.posts)

  console.log(posts)

  useEffect(() => {
    dispatch(loadPosts())
  }, [])

  function onFormSubmit(event) {
    event.preventDefault()
    dispatch(addPost({
      title  : event.target.title.value,
      author : event.target.name.value,
      text   : event.target.text.value,
      parent : event.target.parentId.value
    }))
  }

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      <Posts
        onFormSubmit={onFormSubmit}
        posts={posts}
      />
      <div>
        <h2>Create a topic</h2>
        <Form
          parentId={''}
          className='main-form'
          onFormSubmit={onFormSubmit}
        />
      </div>
    </div>
  )
}

export default App
