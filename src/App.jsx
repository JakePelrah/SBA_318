import { useEffect, useState } from 'react'
import Post from './Post'
import Sidebar from './Sidebar'
import Modal from './Modal'
import { usePost } from './PostProvider'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const {posts} = usePost()

  const renderPosts = posts.map(_ => <Post id={uuidv4()} />)

  useEffect(() => {

    fetch('/register', {
      method: 'POST',
      body: JSON.stringify({ userName: 'jpelrah', password: '123456' }),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(console.log)



    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ userName: 'jpelrah', password: '123456' }),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(console.log)




  }, [])

  return (
    <>
      <Sidebar />
      <div className='m-5 px-5'>
        {renderPosts}
      </div>
      <Modal />
    </>

  )
}

export default App
