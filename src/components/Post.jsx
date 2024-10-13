import { Link } from "react-router-dom";
import './post.css'

export default function Post({ title, text, timestamp, tags, postId }) {


    const renderTags = tags?.split(',')?.map(tag => <div className="badge" >{tag}</div>)

    return (<div className="card my-5">
        <div className="card-header d-flex align-items-center justify-content-between">
            <span className="d-none d-sm-block"> {title}</span>
            <Link className="btn custom-button" to={`postView/${postId}`}>View More</Link>
        </div>

        <div className="card-body">
            <p className="card-text">
                {text.slice(0, 1300)}...
                
            </p>
        </div>
        <div className="card-footer d-flex justify-content-between ">

            <span className="d-none d-md-block">{timestamp}</span>

            <div className="d-flex justify-content-center align-items-center d-none d-md-block">
                {renderTags}
            </div>
        </div>
    </div>)
}