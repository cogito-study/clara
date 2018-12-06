import React, { lazy, Suspense } from 'react';
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';
import { Grommet, Box } from 'grommet';

import { theme } from '../ui/theme/theme';
import { LoadingPage } from '../pages/LoadingPage';

const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const SubjectPage = lazy(() => import('../pages/SubjectPage'));
const NotePage = lazy(() => import('../pages/NotePage'));
// const LandingPage = lazy(() => import('../landing-page/LandingPage'));
const GrommetComponents = lazy(() => import('../ui/GrommetComponents'));

export const App = () => (
  <Grommet theme={theme}>
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Box background="primary" flex="grow" direction="row" justify="between" align="center" wrap>
          <Link to="/">Landing Page</Link>
          <Link to="/sote/erseb/info">Subject Info</Link>
          <Link to="/sote/erseb/notes">Subject Note List</Link>
          <Link to="/sote/erseb/notes/12">12. Note</Link>
          <Link to="/sote/erseb/notes/5">5. Note</Link>
        </Box>
        <Switch>
          <Route exact path="/" component={(props) => <div {...props}>Landing Page helye</div>} />
          <Route exact path="/sote/erseb/notes/:noteID" component={(props) => <NotePage {...props} />} />
          <Route path="/register" component={(props) => <RegisterPage {...props} />} />
          <Route path="/sote/erseb" component={(props) => <SubjectPage {...props} />} />
          <Route path="/components" component={(props) => <GrommetComponents {...props} />} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  </Grommet>
);
