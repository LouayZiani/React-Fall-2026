import { useState, useEffect } from 'react';

//runs an async fct whenever deps change and tracks loading success and error. 
// ignore flag drops answers from stale requests (old api req whose response arrives after a newer req) 
export default function useAsync(run, deps) {
  const [state, setState] = useState({ status: 'loading', data: null, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let ignore = false;
    setState({ status: 'loading', data: null, error: null });
    run()
      .then((data) => {
        if (!ignore) setState({ status: 'success', data, error: null });
      })
      .catch((error) => {
        if (!ignore) setState({ status: 'error', data: null, error });
      });
    return () => {
      ignore = true;
    };
  }, [...deps, attempt]);

  return { ...state, retry: () => setAttempt((n) => n + 1) };
}
