export const getFromStorage = (key) => {
  if (typeof window !== 'undefined') {

    const value = window.localStorage.getItem(key);
    return value
  }
};

export const setToStorage = (key, value) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.setItem(key, value);
  }
};

export const removeFromStorage = (keys: string[]) => {
  if (typeof window !== 'undefined') {
    // Verifique se window está definida para renderização do lado do servidor
    keys.forEach((key) => localStorage.removeItem(key));
  }
};
