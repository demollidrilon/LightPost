export function saveToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function saveId(id) {
  localStorage.setItem("id", id);
}

export function getId() {
  return localStorage.getItem("id");
}

export function removeId() {
  localStorage.removeItem("id");
}

export function isLoggedIn() {
  const token = localStorage.getItem("token");
  return !!token;
}

export function logout() {
  localStorage.clear();
}

export function clearLocalStorage() {
  removeToken();
  removeId();
  logout();
}
