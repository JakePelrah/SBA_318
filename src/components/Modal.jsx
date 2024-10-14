import { useEffect, useRef, useState } from 'react'
import { usePost } from './PostProvider'
import './modal.css'


export default function Modal() {
  const { createPost } = usePost()
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [tags, setTags] = useState('')
  const modalRef = useRef(null)

  useEffect(() => {
    modalRef.current = new bootstrap.Modal('.modal')
    modalRef.current._element.addEventListener('hidden.bs.modal', onClose)
    return () => {
      modalRef.current?._element.removeEventListener('hidden.bs.modal', onClose)
    }
  }, [])


  function validateForm(e) {
    e.preventDefault()
    if(title!=='' && text !=='' && tags !==''){
      createPost(title, text, tags)
      modalRef.current.hide()
    }
    else{
      alert('Missing information.')
    }
  }

  function onClose() {
    setTags('')
    setText('')
    setTitle('')
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
                <label htmlFor="formGroupExampleInput" className="form-label">Post Tags</label>
                <input value={tags} onChange={(e) => setTags(e.target.value.split(','))} type="text" className="form-control" placeholder="backend, javascript, nodejs" required minLength={2} />
                <div className="form-text">Comma separated tags</div>
              </div>

              <button onClick={validateForm} className="btn custom-button">Save</button>
            </form>
          </div>

        </div>
      </div>
    </div>)
}