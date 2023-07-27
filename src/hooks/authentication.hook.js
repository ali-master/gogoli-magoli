import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDB } from "./db.hook";
import { prepare } from "../store/slices/User/user.slice";
import { useDispatch } from "react-redux";
import {read, store} from "../utils/storage.util";
import {TokenManager} from "../utils/token-manager.util";

export function useAuthentication() {
  const history = useHistory();
  const key = "is-user-logged-in";
  const [isLoggedIn, setIsLoggedIn] = useState(checkIsLoggedIn());
  const db = useDB();
  const dispatch = useDispatch();

  function setLoggedIn(value) {
    store(key, value);
    setIsLoggedIn(value);
  }

  function checkIsLoggedIn() {
    const value = read(key, false);

    return value && value === "true";
  }

  async function login(email, password) {
    const { session, user } = await db.login(email, password);
    dispatch(prepare(user));
    setLoggedIn(true);

    TokenManager.setAccess(session.access_token);

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
