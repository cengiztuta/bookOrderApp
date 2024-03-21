import {
  AUTH_GET_PERMISSIONS,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_ERROR,
  AUTH_CHECK,
} from "react-admin";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const homepage = () => {
  history.push("/home");
};

const createUser = (username, password, role) => {
  console.log(`Creating new user: ${username}, role: ${role}`);
};

const setTokenExpiration = (isAdmin) => {
  const expirationTime = new Date().getTime() + (isAdmin ? 3600000 : 1800000);
  localStorage.setItem("tokenExpiration", { expirationTime });
};

const isTokenExpired = () => {
  const expirationTime = localStorage.getItem("tokenExpiration");
  return expirationTime && new Date().getTime() > expirationTime;
};

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username, password } = params;

    if (username === "admin" && password === "password") {
      localStorage.setItem("role", "admin");
      localStorage.removeItem("not_authenticated");
      setTokenExpiration(true);
      homepage();
      return Promise.resolve();
    } else if (username === "admin") {
      alert("Invalid password for admin");
    }

    if (username === "user" && password === "password") {
      localStorage.setItem("role", "user");
      localStorage.removeItem("not_authenticated");
      setTokenExpiration(false);
      homepage();
      return Promise.resolve();
    } else if (username !== "admin") {
      createUser(username, password, "user");
      localStorage.setItem("role", "user");
      localStorage.removeItem("not_authenticated");
      setTokenExpiration(false);
      homepage();
      return Promise.resolve();
    }

    return Promise.resolve();
  }

  if (type === AUTH_LOGOUT) {
    localStorage.setItem("not_authenticated", true);
    localStorage.removeItem("role");
    localStorage.removeItem("tokenExpiration");
    return Promise.resolve();
  }

  if (type === AUTH_ERROR) {
    const { status } = params;
    return status === 401 || status === 403 || isTokenExpired()
      ? Promise.reject()
      : Promise.resolve();
  }

  if (type === AUTH_CHECK) {
    const notAuthenticated = localStorage.getItem("not_authenticated");

    if (notAuthenticated || !localStorage.getItem("role") || isTokenExpired()) {
      history.push("/login");
      return Promise.reject();
    }

    return Promise.resolve();
  }

  if (type === AUTH_GET_PERMISSIONS) {
    const role = localStorage.getItem("role");
    return Promise.resolve(role);
  }

  return Promise.reject("Unknown method");
};
