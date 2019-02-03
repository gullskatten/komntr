import { useState, useEffect } from 'react';

/**
 * Custom hook for API-calls
 * Usage:
 *
 *    const [busy, response, error, refetch] = useApi({
 *     endpoint: 'posts',
 *     initialData: [],
 *     fetchOnMount: true
 *   });
 *
 */

export default function useApi(opts) {
  const [busy, setBusy] = useState(false);
  const [data, setData] = useState(opts.initialData);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      setBusy(true);

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/${opts.endpoint}`,
        {
          method: opts.method || 'GET'
        }
      );

      const json = await res.json();
      setBusy(false);
      setData(json);
    } catch (error) {
      setError(error);
    }
  }

  if (opts.fetchOnMount) {
    useEffect(() => {
      fetchData();
    }, []);
  }

  return [busy, data, error, fetchData];
}
