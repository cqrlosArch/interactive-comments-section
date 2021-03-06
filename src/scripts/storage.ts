//set items localStorage
export function setLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value, null, 2));
}

//get item localStorage
export function getLocalStorage(key: string) {
  return JSON.parse(localStorage.getItem(key));
}

//remove item localStorage
export function removeLocalStorage(key: string) {
  localStorage.removeItem(key);
}

//clear localStorage
export function clearLocalStorage() {
  localStorage.clear();
}

//Update item localStorage
export function updateLocalStorage(key: string, value: any) {
  const dataStorage = getLocalStorage(key);
  const newDataStorage = dataStorage.map((item: any) => {
    if (item.id === value.id) {
      return value;
    } else {
      return item;
    }
  });
  setLocalStorage(key, newDataStorage);
}




//Add new item localStorage
export function addLocalStorage(key: string, value: any) {
  const data = getLocalStorage(key);
  setLocalStorage(key, [...data, value]);
}

