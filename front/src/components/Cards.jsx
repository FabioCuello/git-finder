import React, { useState } from 'react';
import RepositoriesList from './RepositoriesList';
import { post } from '../helpers/request';

const Cards = ({
  handleLike,
  avatar_url,
  name,
  searchRepositories,
  repositories,
  profile,
  handleCheckProfile,
}) => {
  const [seeRepositories, setSeeRepositories] = useState(false);
  const userRepositories = repositories !== null && repositories[name];
  const userFavorites = profile.find(
    ({ external_github_ref }) => external_github_ref === name
  );
  const isFavorite = (name) => {
    if (userFavorites?.favorites === undefined) return false;
    const favoritesProjects = userFavorites.favorites;
    return favoritesProjects.includes(name);
  };
  const handleSeeRepositories = (name) => {
    setSeeRepositories(true);
    searchRepositories(name);
  };

  return (
    <div className='card' style={{ width: '18rem;' }}>
      <img src={avatar_url} className='card-img-top' alt={`${name}_image`} />
      <div className='card-body'>
        <h5 className='card-title'>{name}</h5>
        {!seeRepositories && (
          <button
            onClick={() => handleSeeRepositories(name)}
            className='btn btn-primary'
          >
            Ver repositorios
          </button>
        )}
        {userRepositories && seeRepositories ? (
          <>
            <ul className='list-group list-group-light'>
              {userRepositories.map(
                ({ name: repositoryName, id, description }) => (
                  <RepositoriesList
                    handleCheckProfile={handleCheckProfile}
                    handleLike={handleLike}
                    isFavorite={isFavorite(repositoryName)}
                    projectsFavorites={userFavorites?.favorites || []}
                    userFavorites={userFavorites}
                    userName={name}
                    key={id}
                    repositoryName={repositoryName}
                    description={description}
                  />
                )
              )}
            </ul>
            <button
              onClick={() => setSeeRepositories(false)}
              className='btn btn-primary'
            >
              Ocultar repositorios
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};
export default Cards;
