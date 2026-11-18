import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import StatusMessage from '../components/StatusMessage';
import PwaStatus from '../components/PwaStatus';

function RootLayout() {
  const { pathname } = useLocation();

  //newpage start at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <NavBar />
      <div className="wrap"><PwaStatus /></div>
      <main className="wrap">
        <div className="panel">
          <Suspense fallback={<StatusMessage type="loading" message="Loading page..." />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
      <footer className="site-footer">
        <p>GO CHIEFFSS!!!!</p>
      </footer>
    </>
  );
}

export default RootLayout;
