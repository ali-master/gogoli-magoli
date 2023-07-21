import { Suspense } from "react";
import { Link, Route, Switch } from "react-router-dom";
// Components
import { NoMatch } from "./components/NoMatch";
import { Loading } from "../components/Loading";
import { PublicPage } from "../components/PublicPage";
import { PrivatePage } from "../components/PrivatePage";
import { ProtectedPage } from "../components/ProtectedPage";
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
const LazyDashboardPage = lazy(() =>
  import(
    /* webpackChunkName: "DashboardPage" */ "./pages/Dashboard/dashboard.page"
  )
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
      <Suspense fallback={<Loading />}>
        <Switch>
          <ProtectedPage path="/auth" component={LazyAuthPage} />
          <PrivatePage path="/about" component={LazyAboutUsPage} />
          <PrivatePage path="/users" component={LazyUsersPage} />
          <PrivatePage path="/dashboard" component={LazyDashboardPage} />
          <PublicPage path="/" exact>
            Home
          </PublicPage>
          <PublicPage path="*">
            <NoMatch />
          </PublicPage>
        </Switch>
      </Suspense>
    </div>
  );
}
