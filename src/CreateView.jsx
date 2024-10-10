import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePost } from './PostProvider';

export default function CreateView() {
    const {createPost} = usePost()
    let { id } = useParams();
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [category, setCategory] = useState('')
    const [tags, setTags] = useState('')






    return (<form className='m-5'>
        <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">Post Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" id="formGroupExampleInput" placeholder="Creating an Express server..." />
        </div>

        <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Post Content</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='The first step in creating an Express server is....'></textarea>
        </div>
        <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">Post Category</label>
            <input value={category} onChange={(e) => setCategory(e.target.value)} type="text" className="form-control" id="formGroupExampleInput" placeholder="JavaScript" />
        </div>

        <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">Post Tags</label>
            <input value={tags} onChange={(e) => setTags(e.target.value.split(','))} type="text" className="form-control" id="formGroupExampleInput" placeholder="backend, javascript, nodejs" />
            <div id="emailHelp" className="form-text">Comma separated tags</div>
        </div>





        <div onClick={() => createPost( id, title, category, text, tags )} type="submit" className="btn btn-primary">Save</div>
    </form>)
}