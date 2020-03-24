import React from 'react'

export const Form = ({ parentId, onFormSubmit }) => {
  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <input type="hidden" name="parentId" value={parentId} />
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" class="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="Title" />
        </div>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" name="name" aria-describedby="emailHelp" placeholder="Name" />
        </div>
        <div class="form-group">
          <label for="text">Example textarea</label>
          <textarea class="form-control" id="text" name="text" rows="3"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    
  )
}

export default Form
