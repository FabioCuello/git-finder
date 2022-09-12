import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginView from './views/LoginView';
import HomeView from './views/HomeView';
import RegisterView from './views/RegisterView';
import FavoritesView from './views/FavoritesView';
import AuthLayout from './layouts/AuthLayout';
import { ProfileProvider } from './context/ProfileProvider';
import { ProjectsProvider } from './context/ProjectsProvider';

function App() {
  return (
    <BrowserRouter>
      <ProfileProvider>
        <ProjectsProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<HomeView />} />
              <Route path='/favorites' element={<FavoritesView />} />
            </Route>
            <Route path='/login' element={<LoginView />} />
            <Route path='/register' element={<RegisterView />} />
            <Route path='*' element={<h1>Route not found :c</h1>} />
          </Routes>
        </ProjectsProvider>
      </ProfileProvider>
    </BrowserRouter>
  );
}

export default App;
