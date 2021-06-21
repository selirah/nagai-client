const getItem = (key: string) => {
  const data = typeof window !== 'undefined' ? localStorage.getItem(key) : '';
  return JSON.parse(data ? data : '');
};

const setItem = (key: string, value: any) => {
  const stringify = typeof value !== 'string' ? JSON.stringify(value) : value;
  localStorage.setItem(key, stringify);
};

const removeItem = (key: string) => {
  localStorage.removeItem(key);
};

export { getItem, setItem, removeItem };
