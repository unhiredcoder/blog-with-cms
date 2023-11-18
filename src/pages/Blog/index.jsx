import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Chip from '../../components/common/Chip';
import EmptyList from '../../components/common/EmptyList';
import './styles.css';
import { Link } from 'react-router-dom';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';


async function getBlogs() {
  const res = await fetch(`https://cdn.contentful.com/spaces/${process.env.REACT_APP_SPACE_ID}/entries?access_token=${process.env.REACT_APP_ACCESS_TOKEN}&content_type=title`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  console.log('count');

  return res.json();
}



const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  console.log("🚀 ~ file: index.jsx:28 ~ Blog ~ blog:", blog)
  const [blogimg, setBlogImg] = useState(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const blogsData = await getBlogs();
        setBlogImg(blogsData)
        const foundBlog = blogsData.items.find((blog) => blog.sys.id === id);

        if (foundBlog) {
          setBlog(foundBlog);
        } else {
          console.warn(`Blog with id ${id} not found.`);
          // Handle the case when the blog with the specified id is not found
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    }

    fetchBlogs();
  }, [id]);

  const options = {
    renderText: text => (
      <span style={{ marginRight: '1px' }}>
        {text}
      </span>
    ),
  };

  if (!blog) {
    return <h1 style={{ height: '100vh', color: 'lightgrey', widtht: '100vw', textAlign: 'center', display: 'grid', placeContent: 'center' }}>Loading...</h1>;
  }

  const imageId = blog?.fields.cover.sys.id;
  const image = blogimg?.includes.Asset.find((asset) => asset.sys.id === imageId);

  return (
    <>
      <Link className='blog-goBack' to='/'>
        <h1 style={{ display: 'inline' }}> &#8592;</h1> <h3 style={{ display: 'inline' }}>Go Back</h3>
      </Link>
      {blog ? (
        <div className='blog-wrap'>
          <header>
            <p className='blog-date'>Published {new Date(blog.sys.createdAt).toDateString()}</p>
            <h1>{blog.fields.title}</h1>
            <div className='blog-subCategory'>
              {blog.fields.subcategoryy?.map((category, i) => (
                <div key={i}>
                  <Chip label={category} />
                </div>
              ))}
            </div>
          </header>
          <img src={`https:${image.fields.file.url}`} alt={blog.fields.title} width="400" height="400" />
          <p>{blog.fields.description && documentToReactComponents(blog.fields.description, options)}
          </p>
          <h6 style={{position:'relative',bottom:'-4rem',textAlign:'center',color:'blue'}}>💖 #Design & developed by Aditya maurya. 💖</h6>
        </div>
      ) : (
        <EmptyList />
      )}
    </>
  );
};

export default Blog;