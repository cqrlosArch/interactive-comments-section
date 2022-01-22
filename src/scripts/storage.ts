//set localStorage
export function setLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value, null, 2));
}
//get localStorage
export function getLocalStorage(key: string) {

  return JSON.parse(localStorage.getItem(key));
}
//remove localStorage
export function removeLocalStorage(key: string) {
  localStorage.removeItem(key);
}
//clear localStorage
export function clearLocalStorage() {
  localStorage.clear();
}
