import React from 'react';
import './styles.css';

const SearchBar = ({ handleSearchBar, value, handleSearchKey, clearSearch }) => {
  return (
    <div className='searchBar-wrap'>
      <form>
        <input
          type='text'
          placeholder='Search By Category...'
          value={value}
          onChange={handleSearchKey}
        />
        {value && <span onClick={clearSearch}>X</span>}
        <button onClick={handleSearchBar}>Search</button>
      </form>
    </div>
  );
};

export default SearchBar;