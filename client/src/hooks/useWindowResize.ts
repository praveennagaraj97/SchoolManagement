import { useEffect, useState } from 'react';

const useWindowResize = (shouldListen?: boolean) => {
  const [sizes, setSizes] = useState({
    height: 638,
    width: 638,
  });

  useEffect(() => {
    let isCancelled = false;

    if (!isCancelled) {
      setSizes({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    if (shouldListen) {
      window.addEventListener('resize', () => {
        if (!isCancelled) {
          setSizes({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }
      });
    }

    return () => {
      isCancelled = true;
      window.removeEventListener('resize', () => {});
    };
  }, [shouldListen]);

  return sizes;
};

export default useWindowResize;
