import { createContext, useContext, useState } from "react";


const PostContext = createContext()
export const usePost = () => useContext(PostContext)

export default function PostProvider({ children }) {
    const [posts, setPosts] = useState([...Array(10).keys()])
    const [users, setUsers] = useState([...Array(10).keys()])
    const [tags, setTags] = useState([...Array(10).keys()])




    return (
        <PostContext.Provider value={{
            posts, users, tags
        }}>
            {children}
        </PostContext.Provider>
    );
}; 