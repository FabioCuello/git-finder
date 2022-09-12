import { useState, createContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { get, post } from '../helpers/request';

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  const handleCheckProfile = useCallback(
    async ({ redirectOnError = false, redirectOnSuccess = false }, routes) => {
      try {
        const data = await get('/api/profile');
        setProfile(data);
        if (redirectOnSuccess) {
          navigate(routes.success);
        }
      } catch (e) {
        if (redirectOnError) {
          navigate(routes.fail);
        }
      }
    },
    [setProfile, navigate]
  );

  const logOutAuth = useCallback(async () => {
    try {
      await post('/api/logout');
      navigate('/login');
    } catch (err) {
      setError(err);
    }
  }, [navigate]);

  return (
    <ProfileContext.Provider
      value={{
        handleCheckProfile,
        logOutAuth,
        profile,
        error,
        setError,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileProvider };

export default ProfileContext;
