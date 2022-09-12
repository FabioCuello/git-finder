import React, { useState } from 'react';
import RepositoriesList from './RepositoriesList';

const FavoriteCards = ({
  handleLike,
  name,
  repositories,
  handleCheckProfile,
}) => {
  const [seeRepositories, setSeeRepositories] = useState(false);
  const handleSeeRepositories = () => {
    setSeeRepositories(true);
  };
  return (
    <div className='card' style={{ width: '18rem;' }}>
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
        {seeRepositories && repositories.length > 0 ? (
          <>
            <ul className='list-group list-group-light'>
              {repositories.map((repositoryName) => (
                <RepositoriesList
                  handleCheckProfile={handleCheckProfile}
                  handleLike={handleLike}
                  isFavorite={true}
                  projectsFavorites={repositories || []}
                  userName={name}
                  repositoryName={repositoryName}
                />
              ))}
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
export default FavoriteCards;
