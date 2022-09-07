// @ts-nocheck
import React from 'react'
import './PostSide.css'
import PostShare from '../PostShare/PostShare.jsx';
import Posts from '../Posts/Posts.jsx';
const PostSide = () => {
  return (
    <div className="PostSide">
      <PostShare/>
      <Posts/>
    </div>
  )
}

export default PostSide