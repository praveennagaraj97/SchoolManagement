import type { MutableRefObject } from 'react';
import { useEffect } from 'react';

const useHandleClose = <T>(
  callback: CallableFunction,
  ref?: MutableRefObject<T>
) => {
  const handleClick = (e: any) => {
    if (ref?.current instanceof HTMLElement) {
      if (ref?.current && !ref.current.contains(e.target) && e?.which === 1) {
        callback();
      }
    }
  };

  useEffect(() => {
    document?.addEventListener('mousedown', handleClick);

    return () => {
      document?.removeEventListener('mousedown', handleClick);
    };
  });
};

export default useHandleClose;
