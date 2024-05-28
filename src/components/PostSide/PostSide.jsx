import React from 'react'
import Posts from '../posts/Posts'
import PostShare from '../PostShare/PostShare'
import './PostSide.css'

function PostSide() {
    return (
        <div className='PostSide'>
            <PostShare/>
            <Posts/>
        </div>
    )
}

export default PostSide