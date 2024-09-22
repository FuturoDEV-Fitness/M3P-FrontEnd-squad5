export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const deleteLocalStorage = (key) => {
  localStorage.removeItem(key);
};
