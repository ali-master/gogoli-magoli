import { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { Container, Grid } from "@mantine/core";
// Components
import { Loading } from "../../../components/Loading";
// Utilities
import { lazy } from "react";

const LazyLoginPage = lazy(() =>
  import(/* webpackChunkName: Auth_LoginPage */ "./pages/Login/login.page")
);

export default function AuthPage() {
  return (
    <Container my="md">
      <Grid justify="center">
        <Grid.Col span={6}>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route path="/auth/login" component={LazyLoginPage} />
            </Switch>
          </Suspense>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
