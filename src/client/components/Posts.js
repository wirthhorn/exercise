import React, { useState, useEffect } from 'react'
import Form from './Form'

export const Posts = ({ onFormSubmit, posts }) => {
  const [toggleForm, setToggleForm] = useState([])

  useEffect(() => {
    setToggleForm([])
  }, [])

  function renderChildPosts(parentPostId, postLevel) {
    if (!parentPostId) {
      return null
    }

    const childPosts = posts.filter(post => post.parent === parentPostId)

    return (
      <div>
        {
          childPosts.map((childPost, index) => {
            return (
              <div key={`child_${postLevel}_${index}`} className={`post mb-2 ml-5 level-${postLevel}`}>
                <p>{childPost.title} | {childPost.author}</p>
                <p>{childPost.text}</p>
                <div>
                  {renderChildPosts(childPost._id, postLevel + 1)}
                </div>
                <button className="btn btn-success" onClick={() => handleToggleForm(childPost._id)}>answer</button>
                {
                  toggleForm.includes(childPost._id) && 
                    <Form 
                      parentId={childPost._id}
                      className='post-form'
                      onFormSubmit={onFormSubmit}
                    />
                }
              </div>
            )
          })
        }
      </div>
    )
  }

  function handleToggleForm(id) {
    if (!toggleForm.includes(id)) {
      setToggleForm([
        ...toggleForm,
        id
      ])
    } else {
      setToggleForm(toggleForm.filter(form => form !== id))
    }
  }
  
  function renderParentPosts() {
    const parentPosts = posts.filter(post => !post.parent)

    return (
      <div>
        {
          parentPosts.map((parentPost, index) => {
            return (
              <div key={index} className="post mb-2">
                <p>{parentPost.title} | {parentPost.author}</p>
                <p>{parentPost.text}</p>
                <div>
                  {renderChildPosts(parentPost._id, 1)}
                </div>
                <button className="btn btn-success" onClick={() => handleToggleForm(parentPost._id)}>answer</button>
                {
                  toggleForm.includes(parentPost._id) && 
                    <Form 
                      parentId={parentPost._id}
                      className='post-form'
                      onFormSubmit={onFormSubmit}
                    />
                }
              </div>
            )
          })
        }
      </div>
    )
  }

  return (
    renderParentPosts()
  )
}

export default Posts
