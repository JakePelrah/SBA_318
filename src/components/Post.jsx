import { Link } from "react-router-dom";
import './post.css'

export default function Post({ title, category, text, dateTime, tags, username, postUUID }) {


    const renderTags = tags?.split(',')?.map(tag => <div className="badge" >{tag}</div>)

    return (<div className="card my-5">
        <div className="card-header d-flex align-items-center justify-content-between">
            <div className="category"> {category} </div>
            <span> {title}</span>
            <Link className="btn custom-button" to={`postView/${postUUID}`}>View More</Link>
        </div>

        <div className="card-body">
            <p className="card-text">
                {text.slice(0, 1400)}...
                
            </p>
        </div>
        <div className="card-footer d-flex justify-content-between">

        

            <span>{dateTime}</span>

            <div className="d-flex justify-content-center align-items-center">
                {renderTags}
            </div>
        </div>
    </div>)
}