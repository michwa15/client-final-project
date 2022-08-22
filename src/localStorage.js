export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => {
    return JSON.parse(localStorage.get(key));
};

export const deleteLocalStorage = (key) => {
    localStorage.removeItem(key);
};