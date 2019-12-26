import axios from 'axios'

// Initial state
const initialState = []

// Actions
const LOAD = 'posts/LOAD'
const ADD_POST = 'posts/ADD_POST'

// Reducer
export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case `${LOAD}_FULFILLED`: {
      return [...action.payload.data]
    }
    case `${ADD_POST}_FULFILLED`: {
      return [
        ...state,
        action.payload.data
      ]
    }
    default: return state
  }
}

// Action Creators
export function loadPosts () {
  return dispatch => {
    return dispatch({
      type: LOAD,
      payload: axios.get('/api/posts')
    })
  }
}

// Action Creators
export function addPost (data) {
  return dispatch => {
    return dispatch({
      type: ADD_POST,
      payload: axios.post('/api/add/post', data)
    })
  }
}
