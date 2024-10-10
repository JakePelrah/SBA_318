import { createContext, useContext, useState } from "react";



const PostContext = createContext()
export const usePost = () => useContext(PostContext)

export default function PostProvider({ children }) {
    const [posts, setPosts] = useState([...Array(10).keys()])
    const [users, setUsers] = useState([...Array(10).keys()])
    const [tags, setTags] = useState([...Array(10).keys()])


    function createPost(id, title, category, text, tags) {
        console.log(id, title, category, text, tags)
        fetch('/createPost', {
            method: 'POST',
            body: JSON.stringify({ id, title, category, text, tags }),
            headers: { 'Content-Type': 'application/json' }
        })
    }


    return (
        <PostContext.Provider value={{
            posts, users, tags, createPost
        }}>
            {children}
        </PostContext.Provider>
    );
}; 