import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './app.css'

export const App = () => {
  const [posts, setPosts] = useState([])

  useEffect(async () => {
    const response = await axios.get('/api/posts')
    setPosts(response.data)
  }, [])

  return (
    <div>
      <h1>Posts</h1>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  )
}

export default App
