import React, { ReactNode } from 'react';

interface IPostViewsProps {
  children?: ReactNode
}

const PostViews: React.FC<IPostViewsProps> = ({ children }) => {
  return (
    <small className="text-lg">{ children }</small>
  )
}

export default PostViews;