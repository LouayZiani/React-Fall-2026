import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import PlayersPage from './pages/PlayersPage';
import AddPlayer from './pages/AddPlayer';
import NotFound from './pages/NotFound';
//
import ProtectedRoute from './components/ProtectedRoute';


//lazy-loaded pages
const About = lazy(() => import('./pages/About'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const PlayerDetail = lazy(() => import('./pages/PlayerDetail'));
const Teams = lazy(() => import('./pages/Teams'));
const TeamDetail = lazy(() => import('./pages/TeamDetail'));
const Compare = lazy(() => import('./pages/Compare'));
const RandomPlayer = lazy(() => import('./pages/RandomPlayer'));

//new lazy imports
const Signup = lazy(() => import('./pages/Signup'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="players">
          <Route index element={<PlayersPage />} />
          <Route path="new" element={<AddPlayer />} />
          <Route path=":id" element={<PlayerDetail />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="dashboard" element={<Dashboard />} />

        {/* these are the bonus routes i added: teams, teamDetail, Compare, randomPlayer, and the gif customized 404*/}
        <Route path="teams">
          <Route index element={<Teams />} />
          <Route path=":slug" element={<TeamDetail />} />
        </Route>
        <Route path="compare" element={<Compare />} />
        <Route path="random" element={<RandomPlayer />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
