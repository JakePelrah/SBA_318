import { useEffect, useRef, useState } from 'react'
import { usePost } from './PostProvider'
import { v4 as uuidv4 } from 'uuid'
import './modal.css'


export default function Modal() {
  const { createPost } = usePost()
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [postUUID, setPostUUID] = useState('')
  const modalRef = useRef(null)


  useEffect(() => {

    modalRef.current = new bootstrap.Modal('.modal')

    modalRef.current._element.addEventListener('shown.bs.modal', onOpen)
    modalRef.current._element.addEventListener('hidden.bs.modal', onClose)

    return () => {
      modalRef.current?._element.removeEventListener('shown.bs.modal', onOpen)
      modalRef.current?._element.removeEventListener('hidden.bs.modal', onClose)
    }
  }, [])


  function validateForm(e) {
    e.preventDefault()
    createPost(postUUID, title, category, text, tags, username, password)
    modalRef.current.hide()
  }

  function onOpen() {
    const postId = uuidv4()
    setPostUUID(postId)
  }

  function onClose() {
    setCategory('')
    setPassword('')
    setPostUUID('')
    setTags('')
    setText('')
    setTitle('')
    setUsername('')
  }

  return (
    <div ref={modalRef} className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog  modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-body">
            <form className='m-5'>
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Post Title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" placeholder="Creating an Express server..." required minLength={2} />
              </div>

              <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Post Content</label>
                <textarea value={text} onChange={(e) => setText(e.target.value)} className="form-control" rows="3" placeholder='The first step in creating an Express server is....' required minLength={2}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Post Category</label>
                <input value={category} onChange={(e) => setCategory(e.target.value)} type="text" className="form-control" placeholder="JavaScript" required minLength={2} />
              </div>

              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Post Tags</label>
                <input value={tags} onChange={(e) => setTags(e.target.value.split(','))} type="text" className="form-control" placeholder="backend, javascript, nodejs" required minLength={2} />
                <div className="form-text">Comma separated tags</div>
              </div>

              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" required minLength={5} />
                <div className="form-text">Write this down, to edit the post after creation.</div>

                <label htmlFor="formGroupExampleInput" className="form-label mt-2">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="**********" required minLength={2} />
              </div>

              <button onSubmit={validateForm} type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>

        </div>
      </div>
    </div>)
}