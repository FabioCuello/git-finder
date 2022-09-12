import React, { useEffect } from 'react';
import FavoriteCards from '../components/FavoriteCards';
import useProfile from '../hooks/useProfile';
import useProjects from '../hooks/useProjects';

const FavoritesView = () => {
  const { handleCheckProfile, profile } = useProfile();
  const { handleLike } = useProjects();

  useEffect(() => {
    handleCheckProfile({ redirectOnError: true }, { fail: '/login' });
  }, [handleCheckProfile]);

  return (
    <>
      <div className='container'>
        <div className='row'>
          {profile !== null && profile.length > 0 ? (
            <>
              {profile.map(({ external_github_ref, favorites }) => (
                <div className='col-sm'>
                  <FavoriteCards
                    handleLike={handleLike}
                    profile={profile || []}
                    name={external_github_ref}
                    repositories={favorites}
                    handleCheckProfile={handleCheckProfile}
                  />
                </div>
              ))}
            </>
          ) : (
            <h1>Aun no tienes repositorios favoritos... Agrega alguno!</h1>
          )}
        </div>
      </div>
    </>
  );
};
export default FavoritesView;
