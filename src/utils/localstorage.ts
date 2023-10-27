export const setLocalStorage = (name: string, item: any) => {
  const value = JSON.stringify(item);
  localStorage.setItem(name, value);
};

export const getLocalStorage = (name: string) => {
  const value = localStorage.getItem(name);
  if (!value) return null;
  return JSON.parse(value);
};

export const clearLocalStorage = (name: string) => {
  localStorage.removeItem(name);
};
