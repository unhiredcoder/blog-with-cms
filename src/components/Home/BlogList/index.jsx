import React from 'react';
import BlogItem from './BlogItem';
import './styles.css';


const BlogList = ({ blogs }) => {
  return (
    <div className='blogList-wrap'>
      <BlogItem blogs={blogs} />
    </div>
  );
};

export default BlogList;