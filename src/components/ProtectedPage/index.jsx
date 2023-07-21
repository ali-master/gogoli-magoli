import { useAuthentication } from "../../hooks/authentication.hook";
import { Redirect, Route } from "react-router-dom";

export function ProtectedPage(props) {
  const { isLoggedIn } = useAuthentication();

  if (isLoggedIn) {
    return <Redirect to="/dashboard" push />;
  }

  return <Route {...props} />;
}
