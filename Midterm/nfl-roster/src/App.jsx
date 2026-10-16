import { useState } from 'react';
import PlayersPage from './components/PlayersPage';

function App() {
  const [homeKey, setHomeKey] = useState(0);

  return (
    <>
      <header className="site-header">
        <div className="wrap header-inner">
          <button className="home-link" onClick={() => setHomeKey(homeKey + 1)} aria-label="Go to home page">
            <img className="logo" src={`${import.meta.env.BASE_URL}nfl.jpg`} alt="NFL" />
          </button>
          <div>
            <h1>NFL Roster</h1>
          </div>
        </div>
      </header>
      <main className="wrap">
        <PlayersPage key={homeKey} />
      </main>
    </>
  );
}

export default App;