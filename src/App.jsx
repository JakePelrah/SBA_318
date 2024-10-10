import { useEffect, useState } from 'react'
import Post from './Post'
import Sidebar from './Sidebar'
import Modal from './Modal'
function App() {
  const [posts, setPosts] = useState([...Array(10).keys()])

  const renderPosts = posts.map(_ => <Post />)

  useEffect(() => {

    fetch('/register', {
      method: 'POST',
      body: JSON.stringify({ userName: 'jpelrah', password: '123456' }),
      headers:{'Content-Type':'application/json'}
    }).then(res => res.json()).then(console.log)



    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ userName: 'jpelrah', password: '123456' }),
      headers:{'Content-Type':'application/json'}
    }).then(res => res.json()).then(console.log)




  }, [])

  return (
    <>
      <Sidebar />
      <div className='mb-5'>
        {renderPosts}
      </div>
      <Modal />
    </>

  )
}

export default App
