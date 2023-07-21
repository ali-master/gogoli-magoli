import { useAuthentication } from "../../hooks/authentication.hook";
import { Redirect, Route } from "react-router-dom";

export function PrivatePage(props) {
  const { isLoggedIn } = useAuthentication();

  if (isLoggedIn) {
    if (props.children) {
      const { children, ...restProps } = props;
      return <Route {...restProps}>{children}</Route>;
    }
    return <Route {...props} />;
  }

  return <Redirect to="/auth/login" push />;
}
