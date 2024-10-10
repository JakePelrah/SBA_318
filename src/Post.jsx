import { Link } from "react-router-dom";
import './post.css'

export default function Post({ id, text }) {

    return (<div class="card my-5">
        <div class="card-header d-flex align-items-center justify-content-between">
            <div className="category"> JavaScript </div>
            <span> The title of the post.</span>
            <span>{new Date().toLocaleTimeString()}</span>
        </div>

        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">

                {text}
            </p>
        </div>

        <div className="card-footer">

            <Link className="btn post-button" to={`post/${id}`}>View</Link>

        </div>

    </div>)
}