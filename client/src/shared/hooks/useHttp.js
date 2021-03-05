import { useState, useCallback, useRef, useEffect } from 'react';

import DialogError from '../util/dialogError';

export const useHttp = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // store data across re-render cycle
  const activeHttpRequests = useRef([]);

  // is important to use useCallback() to
  // prevent an infinite loop call sendRequest()
  const sendRequest = useCallback(async (
    url,
    method = 'GET',
    body = null,
    headers = {}) => {

    setIsLoading(true);

    // preventing an error: update the state of the 
    // component which does not on the screen anymore
    const httpAbortCtrl = new AbortController();
    activeHttpRequests.current.push(httpAbortCtrl);

    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
        signal: httpAbortCtrl.signal
      });

      const resData = await response.json();

      // claan up the activeHttpRequests after req completes
      activeHttpRequests.current = activeHttpRequests.current.filter(
        reqCtrl => reqCtrl !== httpAbortCtrl
      )

      // handle 40X and 50X error codes
      if (!response.ok) {

        // setup error data for a dialog 
        let title = 'Помилка';

        const status = response.status;
        const message = resData.message;
        if (status) {
          const type = status.toString()[0];
          switch (type) {
            case '4': title = 'Помилка даних'
              break;
            case '5': title = 'Помилка серверу'
              break;
            default: break;
          }
        }

        throw new DialogError(message, title);
      }

      setIsLoading(false);
      return resData;

    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      throw err;
    }
  }, []);

  const clearError = () => {
    setError(null);
  }

  // cleanup 
  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach(abCtrl => abCtrl.abort());
    }
  }, [])

  return { isLoading, sendRequest, error, clearError }
};