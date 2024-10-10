import { useEffect, useState } from 'react'
import Post from './Post'
import Sidebar from './Sidebar'
import Modal from './Modal'
import { usePost } from './PostProvider'
import { v4 as uuidv4 } from 'uuid'
import Navbar from './Navbar'

function App() {
  const { posts } = usePost()

  const renderPosts = posts.map(_ => <Post id={uuidv4()} />)


  return (
    <>
      <Navbar />
      <Sidebar />
      <div className='m-5 px-5'>
        {renderPosts}
      </div>
      <Modal />
    </>

  )
}

export default App
