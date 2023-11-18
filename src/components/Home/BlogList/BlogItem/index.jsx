import React from 'react'; 
import { Link } from 'react-router-dom';
import Chip from '../../../common/Chip';
import './styles.css';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';


const BlogItem = ({ blogs }) => {

  const options = {
    renderText: text => <p className='blogItem-desc'>{text}</p>, // Render text without styles
  };
  return (
    <div className='blogItem-wrap'>
      {blogs.items.map((blog) => (
        <>
          {blogs.includes.Asset.map((elem) => (
            <>
              {blog.fields.cover.sys.id === elem.sys.id ?
                <Link to={`/blog/${blog.sys.id}`}>
                  <img className='blogItem-cover' src={"https:" + elem.fields.file.url} alt='cover' />
                </Link>
                : <div></div>}
            </>
          ))}
          <Chip label={blog.fields.category} />
          <h3>{blog.fields.title}</h3>
          <p className='blogItem-desc'> {blog.fields.description && documentToReactComponents(blog.fields.description, options)}
</p>
          <footer>
            <div className='blogItem-author'>
              {blogs.includes.Asset.map((elem) => (
                <>
                  {blog.fields.authorAvatarr?.sys.id === elem.sys.id ?
                    <img style={{ marginBottom: '3rem' }} src={"https:" + elem.fields.file.url} alt='author-avatar' />

                    : <div></div>}
                </>
              ))}
              <div style={{ marginBottom: '3rem' }}>
                <h6>{blog.fields.authorName}</h6>
                <p>{new Date(blog.sys.createdAt).toDateString()}</p>
              </div>
            </div>
            <Link style={{ marginBottom: '3rem' }} className='blogItem-link' to={`/blog/${blog.sys.id}`}>
              <p>Read More ➝</p>
            </Link>
          </footer>
        </>

      ))}
    </div>
  );
};

export default BlogItem;