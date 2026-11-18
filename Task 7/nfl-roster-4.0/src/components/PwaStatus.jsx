import { useEffect, useState } from 'react';
import { activatePWAUpdate } from '../pwa';

function PwaStatus() {
  const [online, setOnline] = useState(navigator.onLine);
  const [cachedData, setCachedData] = useState(false);
  const [updateRegistration, setUpdateRegistration] = useState(null);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installMessage, setInstallMessage] = useState('');

  useEffect(() => {
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    const onUpdate = (event) => setUpdateRegistration(event.detail?.registration || null);
    const onCachedData = (event) => setCachedData(Boolean(event.detail));
    const onInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    const onInstalled = () => {
      setInstallPrompt(null);
      setInstallMessage('NFL Roster is installed on this device.');
    };

    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    window.addEventListener('pwa-update-available', onUpdate);
    window.addEventListener('nfl-cached-data-used', onCachedData);
    window.addEventListener('beforeinstallprompt', onInstallPrompt);
    window.addEventListener('appinstalled', onInstalled);

    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
      window.removeEventListener('pwa-update-available', onUpdate);
      window.removeEventListener('nfl-cached-data-used', onCachedData);
      window.removeEventListener('beforeinstallprompt', onInstallPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  async function installApp() {
    if (!installPrompt) {
      const isAppleMobile = /iPad|iPhone|iPod/.test(navigator.userAgent);
      setInstallMessage(isAppleMobile
        ? 'On iPhone/iPad: open Safari’s Share menu, then choose “Add to Home Screen”.'
        : 'Open your browser menu and choose “Install app” or “Add to Home screen” if available.');
      return;
    }
    installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  }

  return (
    <section className="pwa-status" aria-label="App status">
      <div className="pwa-status-main">
        <span className={`connection-dot ${online ? 'is-online' : 'is-offline'}`} aria-hidden="true" />
        <span role="status">{online ? (cachedData ? 'Online · showing cached public data' : 'Online') : 'Offline · using saved roster data'}</span>
        {(cachedData || !online) && <span className="pwa-cache-label">Cached data</span>}
      </div>
      <div className="pwa-actions">
        <button className="pwa-small-button" type="button" onClick={installApp}>
          Install / Add to Home Screen
        </button>
        {updateRegistration && (
          <button className="pwa-small-button" type="button" onClick={() => activatePWAUpdate(updateRegistration)}>
            Update available · Reload
          </button>
        )}
      </div>
      {installMessage && <p className="pwa-hint" role="status">{installMessage}</p>}
    </section>
  );
}

export default PwaStatus;
