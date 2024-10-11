import { Link } from "react-router-dom";
import './post.css'

export default function Post({ title, category, text, dateTime, tags, username }) {


    const renderTags = tags?.split(',')?.map(tag => <div className="badge" >{tag}</div>)

    return (<div className="card my-5">
        <div className="card-header d-flex align-items-center justify-content-between">
            <div className="category"> {category} </div>
            <span> {title}</span>
            <span>{dateTime}</span>
        </div>

        <div className="card-body">
            <p className="card-text">
                {text}
            </p>
        </div>
        <div className="card-footer d-flex justify-content-between">
            <div className="d-flex align-items-center fw-bold" ><img className="me-2" src="./icons/person-square.svg"></img>{username.toUpperCase()}</div>
            <div className="d-flex justify-content-center align-items-center">
                {renderTags}
            </div>
        </div>
    </div>)
}