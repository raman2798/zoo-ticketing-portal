/* eslint-disable @typescript-eslint/no-unsafe-return */

const clearLocalStorage = () => {
  localStorage.clear();
};

const getLocalStorage = (key: string) => {
  const storedData = localStorage.getItem(key);

  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (error) {
      return storedData;
    }
  }

  return null;
};

const setLocalStorage = (key: string, data: string) => {
  localStorage.setItem(key, data);
};

export { clearLocalStorage, getLocalStorage, setLocalStorage };
