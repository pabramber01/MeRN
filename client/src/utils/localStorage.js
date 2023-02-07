function addUserToLocalStorage(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

function removeUserFromLocalStorage() {
  localStorage.removeItem('user');
}

function getUserFromLocalStorage() {
  const result = localStorage.getItem('user');
  return result ? JSON.parse(result) : null;
}

export {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
  getUserFromLocalStorage,
};
