import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import Cards from '../components/Cards';
import useProfile from '../hooks/useProfile';
import useProjects from '../hooks/useProjects';

const HomeView = () => {
  const [searchedUser, setSearchedUser] = useState(null);
  const [usersToShow, setUsersToShow] = useState(10);
  const { handleCheckProfile, profile } = useProfile();
  const { searchUsers, users, searchProjects, projects, handleLike } =
    useProjects();

  useEffect(() => {
    const timeOutId = setTimeout(() => searchUsers(searchedUser), 500);
    return () => clearTimeout(timeOutId);
  }, [searchedUser, searchUsers]);

  useEffect(() => {
    handleCheckProfile({ redirectOnError: true }, { fail: '/login' });
  }, [handleCheckProfile]);

  const handleSearchBar = (e) => {
    const value = e.target.value;
    setSearchedUser(value);
    setUsersToShow(10);
  };

  const searchRepositories = (input) => {
    searchProjects(input);
  };

  const handleMoreUsers = () => {
    setUsersToShow((prevState) => prevState + 10);
  };

  return (
    <>
      <SearchBar
        searchedUser={searchedUser}
        handleSearchBar={handleSearchBar}
      />
      <div className='container'>
        <div className='row'>
          {users !== null ? (
            users.length === 0 ? (
              <h1>No se encontraron usuarios :c</h1>
            ) : (
              <>
                {users.slice(0, usersToShow).map(({ avatar_url, login }) => (
                  <div className='col-sm'>
                    <Cards
                      handleLike={handleLike}
                      profile={profile || []}
                      avatar_url={avatar_url}
                      name={login}
                      searchRepositories={searchRepositories}
                      repositories={projects}
                      handleCheckProfile={handleCheckProfile}
                    />
                  </div>
                ))}
                {users.length >= usersToShow && (
                  <button onClick={handleMoreUsers} className='btn btn-primary'>
                    Mostrar más usuarios
                  </button>
                )}
              </>
            )
          ) : (
            <h1>Busca por usuario y dale Like al repo que más te guste!</h1>
          )}
        </div>
      </div>
    </>
  );
};
export default HomeView;
