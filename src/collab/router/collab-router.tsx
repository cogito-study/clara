import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { useMedia } from 'react-use';
import { useTheme } from '../../core/hooks';
import { PrivateRoute } from '../../core/router/private-route';
import { EditorPage } from '../pages/editor-page';
import { StudyPage } from '../pages/study-page';
import { collabRoute } from '../utils/collab-route';

export const CollabRouter = () => {
  const { breakpoints } = useTheme();
  const isDesktop = useMedia(`(min-width: ${breakpoints[2]})`);

  return (
    <Switch>
      <PrivateRoute path={collabRoute({ path: 'note-study' })}>
        <StudyPage />
      </PrivateRoute>
      {isDesktop && (
        <PrivateRoute path={collabRoute({ path: 'note-edit' })}>
          <EditorPage />
        </PrivateRoute>
      )}
      <Redirect to={collabRoute({ path: 'note-study' })} />
    </Switch>
  );
};
