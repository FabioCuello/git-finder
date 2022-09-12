import { useContext } from 'react';
import ProjectsContext from '../context/ProjectsProvider';

const useProjects = () => useContext(ProjectsContext);

export default useProjects;
