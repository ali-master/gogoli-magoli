import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDB } from "./db.hook";

export function useAuthentication() {
  const history = useHistory();
  const key = "is-user-logged-in";
  const [isLoggedIn, setIsLoggedIn] = useState(checkIsLoggedIn());
  const db = useDB();

  function setLoggedIn(value) {
    localStorage.setItem(key, value);
    setIsLoggedIn(value);
  }

  function checkIsLoggedIn() {
    const value = localStorage.getItem(key);

    return value && value === "true";
  }

  async function login(email, password) {
    await db.login(email, password);
    setLoggedIn(true);
    const quries = history.location.search
      ? new URLSearchParams(history.location.search)
      : null;

    if (quries && quries.has("backTo")) {
      history.push(quries.get("backTo"));
    } else {
      // history.push("/dashboard");
    }
  }

  function logout() {
    setLoggedIn(false);
    history.push(`/auth/login?backTo=${history.location.pathname}`);
  }

  return {
    login,
    logout,
    isLoggedIn,
  };
}
