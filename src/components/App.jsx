import Post from './Post'
import Sidebar from './Sidebar'
import { usePost } from './PostProvider'
import Navbar from './Navbar'
import Modal from './Modal'

function App() {
  const { posts } = usePost()

  const renderPosts = posts.map(post => <Post key={post.postUUID}
    title={post.title}
    text={post.text}
    dateTime={post.dateTime}
    tags={post.tags}
    postUUID={post.postUUID} />)


  return (
    <>
      <Navbar />
      <Sidebar />
      <Modal />
      <div className='m-5 px-5'>
        {renderPosts}
      </div>
    </>

  )
}

export default App
