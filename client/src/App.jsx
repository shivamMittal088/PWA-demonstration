import { useEffect, useState } from 'react'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
})

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    api.get('/hello')
      .then((res) => setMessage(res.data.message))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div>
      <h1>PWA App</h1>
      <p>Server says: {message || 'Loading...'}</p>
    </div>
  )
}

export default App
