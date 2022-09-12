import React from 'react';

const SearchBar = ({ searchedUser, handleSearchBar }) => {
  return (
    <form>
      <div className='container py-5 px-5 h-100'>
        <div className='input-group rounded'>
          <input
            type='search'
            onChange={handleSearchBar}
            value={searchedUser}
            className='form-control rounded'
            placeholder='Search'
            aria-label='Search'
            aria-describedby='search-addon'
          />
          <span className='input-group-text border-0' id='search-addon'>
            <i className='fas fa-search'></i>
          </span>
        </div>
      </div>
    </form>
  );
};
export default SearchBar;
