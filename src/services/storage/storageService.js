const STORAGE_PREFIX = "pmis";

function buildKey(key) {
  return `${STORAGE_PREFIX}:${key}`;
}

export function getStorageItem(key, fallbackValue = null) {
  try {
    const storedValue = localStorage.getItem(buildKey(key));

    if (storedValue === null) {
      return fallbackValue;
    }

    return JSON.parse(storedValue);
  } catch (error) {
    console.error("STORAGE_READ_ERROR", error);

    return fallbackValue;
  }
}

export function setStorageItem(key, value) {
  try {
    localStorage.setItem(buildKey(key), JSON.stringify(value));

    return true;
  } catch (error) {
    console.error("STORAGE_WRITE_ERROR", error);

    return false;
  }
}

export function removeStorageItem(key) {
  try {
    localStorage.removeItem(buildKey(key));

    return true;
  } catch (error) {
    console.error("STORAGE_REMOVE_ERROR", error);

    return false;
  }
}

export function clearStorageItem(key) {
  return removeStorageItem(key);
}
