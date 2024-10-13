import Post from './Post'
import Sidebar from './Sidebar'
import { usePost } from './PostProvider'
import Navbar from './Navbar'
import Modal from './Modal'

function App() {
  const { posts } = usePost()

  const sortedPosts = posts?.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  const renderPosts = sortedPosts.map(post => <Post key={post.post_id}
    title={post.title}
    text={post.text}
    timestamp={post.timestamp}
    tags={post.tags}
    postId={post.post_id} />)


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
