import { Button, Container } from "@mantine/core";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
// Hooks
import { useAuthentication } from "../../../hooks/authentication.hook";
// Utilities
import { Suspense, lazy } from "react";
import { Loading } from "../../../components/Loading";
import { PrivatePage } from "../../../components/PrivatePage";

const LazyAuthorsPage = lazy(() =>
  import(
    /* webpackChunkName: "Dashboard_AuthorsPage" */ "./pages/Authors/authors.page"
  )
);

export default function DashboardPage() {
  const authentication = useAuthentication();

  return (
    <Container>
      <Button onClick={() => authentication.logout()}>Logout</Button>
      <Suspense fallback={<Loading />}>
        <Switch>
          <PrivatePage path="/dashboard" exact>
            Wellcome to Dashboard...
          </PrivatePage>
          <PrivatePage
            path="/dashboard/authors"
            component={LazyAuthorsPage}
          />
        </Switch>
      </Suspense>
    </Container>
  );
}
