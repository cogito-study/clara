import React, { Fragment } from 'react';
import { Switch } from 'react-router';
import { PrivateRoute } from '../../core/router/private-route';
import { SubjectInfo } from '../components/subject-info';
import { SubjectNotes } from '../components/subject-notes';
import { useSubjectRoute } from '../hooks/use-subject-route';

export const SubjectRouter = () => {
  const subjectInfo = useSubjectRoute({ path: 'subject-info' });
  const subjectNotes = useSubjectRoute({ path: 'subject-notes' });

  return (
    <Fragment>
      <Switch>
        <PrivateRoute path={subjectInfo}>
          <SubjectInfo />
        </PrivateRoute>
        <PrivateRoute path={subjectNotes}>
          <SubjectNotes />
        </PrivateRoute>
      </Switch>
    </Fragment>
  );
};
