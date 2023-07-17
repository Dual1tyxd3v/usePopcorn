import { useEffect } from 'react';

export function useKeydown(callback: () => void, key: string) {
  useEffect(() => {
    function pressToClose(e: KeyboardEvent) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        callback();
      }
    }
    document.addEventListener('keydown', pressToClose);

    return () => document.removeEventListener('keydown', pressToClose);
  }, [callback, key]);
}
