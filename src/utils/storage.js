export const loadFromStorage = (key, fallback) => {
  try {
    const item = localStorage.getItem(`studioflow_${key}`);
    if (item) {
      return JSON.parse(item);
    }
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
  }
  return fallback;
};

export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(`studioflow_${key}`, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
  }
};

export const clearStorage = () => {
  try {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('studioflow_')) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};
