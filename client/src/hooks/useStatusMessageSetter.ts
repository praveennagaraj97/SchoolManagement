import { useEffect, useState } from 'react';

export type ErrorTypes = 'error' | 'success' | 'info';

const useMessageStatusSetter = () => {
  const [successmessage, setSuccessMessage] = useState<string | null>(null);
  const [errMessage, setErrMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [timeOutIds, setTimeOutIds] = useState<any[]>([]);

  useEffect(() => {
    return () => {
      timeOutIds.forEach((timeId) => {
        clearTimeout(timeId);
      });
    };
  }, [timeOutIds]);

  let tid: any;
  function setter(msg: string, type: ErrorTypes, displayTime = 3000) {
    return new Promise((resolve, reject) => {
      if (type === 'error') {
        setErrMessage(msg);
        tid = setTimeout(() => {
          resolve(true);
          setErrMessage(null);
        }, displayTime);

        return setTimeOutIds([...timeOutIds, tid]);
      }

      if (type === 'info') {
        setInfoMessage(msg);
        tid = setTimeout(() => {
          setInfoMessage(null);
          resolve(true);
        }, displayTime);

        return setTimeOutIds([...timeOutIds, tid]);
      }
      if (type === 'success') {
        setSuccessMessage(msg);
        tid = setTimeout(() => {
          setSuccessMessage(null);
          resolve(true);
        }, displayTime);

        return setTimeOutIds([...timeOutIds, tid]);
      }
    });
  }

  return { successmessage, errMessage, infoMessage, setter };
};

export default useMessageStatusSetter;
