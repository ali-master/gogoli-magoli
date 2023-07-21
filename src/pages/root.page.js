import { Suspense } from "react";
import { Link, Route, Switch } from "react-router-dom";
// Utilities
import { lazy } from "react";

// Pages
const LazyUsersPage = lazy(() =>
  import(/* webpackChunkName: "UsersPage" */ "./pages/Users/users.page")
);
const LazyAboutUsPage = lazy(() =>
  import(/* webpackChunkName: "AboutUsPage" */ "./pages/AboutUs/about-us.page")
);
const LazyAuthPage = lazy(() =>
  import(/* webpackChunkName: "AuthPage" */ "./pages/Auth/auth.page")
);

export function RootPage() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/auth/login">Login</Link>
          </li>
        </ul>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/auth" component={LazyAuthPage} />
          <Route path="/about" component={LazyAboutUsPage} />
          <Route path="/users" component={LazyUsersPage} />
          <Route path="/">Home</Route>
        </Switch>
      </Suspense>
    </div>
  );
}
