import { useState, useEffect, createContext, useCallback, useRef } from 'react';
import { customRequest, post, remove } from '../helpers/request';

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const prevInput = useRef('');
  const [projects, setProjects] = useState(null);

  const searchUsers = async (input) => {
    if (input === '' || input === null) {
      setUsers(null);
      setProjects(null);
      return;
    }

    if (prevInput.current === input) {
      return;
    }

    const gitUsersInfo = await customRequest(
      `https://api.github.com/search/users?q=${input}&type:user`
    );

    const newUser = gitUsersInfo.items.map(
      ({ login, avatar_url, repos_url }) => ({
        login,
        avatar_url,
        repos_url,
      })
    );

    prevInput.current = input;
    setUsers(newUser);
  };

  const handleLike = async ({
    repositoryName,
    userName,
    projectsFavorites,
    action,
  }) => {
    if (action === 'add') {
      await post('/api/repositories/addOrModify', {
        gitHubRef: userName,
        favorites: [...projectsFavorites, repositoryName],
      });
      return;
    }
    const newFavorites = projectsFavorites.filter(
      (name) => name !== repositoryName
    );
    if (newFavorites.length === 0) {
      await remove('/api/repositories/delete', {
        gitHubRef: userName,
      });
      return;
    }
    await post('/api/repositories/addOrModify', {
      gitHubRef: userName,
      favorites: newFavorites,
    });
  };

  const searchProjects = async (input) => {
    const gitProjectsInfo = await customRequest(
      `https://api.github.com/users/${input}/repos`
    );
    const newProjects = gitProjectsInfo.map(({ name, id, description }) => ({
      name,
      id,
      description,
    }));
    setProjects((prevState) => ({
      ...prevState,
      [input]: newProjects,
    }));
  };

  return (
    <ProjectsContext.Provider
      value={{
        searchUsers,
        searchProjects,
        projects,
        users,
        handleLike,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider };

export default ProjectsContext;
