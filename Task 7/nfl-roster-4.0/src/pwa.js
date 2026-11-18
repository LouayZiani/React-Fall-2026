let registrationRef = null;

export async function registerPWA() {
  if (!('serviceWorker' in navigator) || !import.meta.env.PROD) return null;

  try {
    registrationRef = await navigator.serviceWorker.register(
      `${import.meta.env.BASE_URL}sw.js`,
      { scope: import.meta.env.BASE_URL }
    );

    const announceUpdate = () => {
      if (registrationRef?.waiting && navigator.serviceWorker.controller) {
        window.dispatchEvent(new CustomEvent('pwa-update-available', {
          detail: { registration: registrationRef },
        }));
      }
    };

    const watchInstallingWorker = (worker) => {
      worker?.addEventListener('statechange', () => {
        if (worker.state === 'installed') announceUpdate();
      });
    };

    announceUpdate();
    watchInstallingWorker(registrationRef.installing);
    registrationRef.addEventListener('updatefound', () => {
      watchInstallingWorker(registrationRef.installing);
    });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (window.__pwaReloading) return;
      window.__pwaReloading = true;
      window.location.reload();
    });

    // Check for a new deployment when the app is opened.
    registrationRef.update().catch(() => {});
    return registrationRef;
  } catch (error) {
    console.error('Service worker registration failed:', error);
    return null;
  }
}

export function activatePWAUpdate(registration) {
  const waitingWorker = registration?.waiting || registrationRef?.waiting;
  waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
}
