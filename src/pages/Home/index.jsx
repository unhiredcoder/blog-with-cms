import React, { useEffect, useState } from 'react';
import EmptyList from '../../components/common/EmptyList';
import BlogList from '../../components/Home/BlogList';
import Header from '../../components/Home/Header';
import '../../components/Home/SearchBar/styles.css'
import SearchBar from '../../components/Home/SearchBar';


async function getBlogs() {
  const res = await fetch(`https://cdn.contentful.com/spaces/${process.env.REACT_APP_SPACE_ID}/entries?access_token=${process.env.REACT_APP_ACCESS_TOKEN}&content_type=title`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const Home = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [blogs, setBlogs] = useState([]);
  console.log("🚀 ~ file: index.jsx:22 ~ Home ~ blogsssssssss:", blogs)
  const [searchKey, setSearchKey] = useState('');
  const handleSearchBar = (e) => {
    e.preventDefault();
    handleSearchResults();

  }
  const handleSearchResults = () => {
    const filteredBlogs = allBlogs.items.filter((blog) =>
      blog.fields.category.toLowerCase().includes(searchKey.toLowerCase().trim())
    );
    setBlogs({
      includes: allBlogs.includes,
      items: filteredBlogs,
    });
  };

  const handleClearSearch = () => {
    setBlogs(allBlogs);
    setSearchKey('');
  };

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const blogsData = await getBlogs();
        setAllBlogs(blogsData); // Save all blogs in a separate state
        setBlogs(blogsData);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    }

    fetchBlogs();
  }, []);

  if (!blogs) {
    return <h1 style={{ height: '100vh', widtht: '100vw', textAlign: 'center', display: 'grid', placeContent: 'center' }}>Loading...</h1>;
  }

  return (
    <div>
      <Header />
      <SearchBar
        value={searchKey}
        clearSearch={handleClearSearch}
        handleSearchBar={handleSearchBar}
        handleSearchKey={(e) => setSearchKey(e.target.value)}
      />
      {!blogs.items?.length > 0 ? <EmptyList /> : <BlogList blogs={blogs} />}
    </div>
  );
};

export default Home;