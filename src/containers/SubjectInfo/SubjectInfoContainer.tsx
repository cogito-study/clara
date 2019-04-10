import { Box } from 'grommet';
import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';
import { SubjectRouteParams } from '../../types/RouteParams';
import { GeneralInfoCard, SubjectInfoCard } from '../../ui/components';
import { GeneralInfoCardPlaceholder } from '../../ui/components/InfoCard/GeneralInfoCardPlaceholder';
import { SubjectInfoCardPlaceholder } from '../../ui/components/InfoCard/SubjectInfoCardPlaceholder';
import { GENERAL_SUBJECT_INFO_QUERY } from './GeneralSubjectInfoQuery';
import { SUBJECT_INFO_QUERY } from './SubjectInfoQuery';
import {
  GeneralSubjectInfoQuery,
  GeneralSubjectInfoQueryVariables,
  GeneralSubjectInfoQuery_subject,
} from './__generated__/GeneralSubjectInfoQuery';
import {
  SubjectInfoQuery,
  SubjectInfoQueryVariables,
  SubjectInfoQuery_subject,
} from './__generated__/SubjectInfoQuery';

/* eslint-disable */

export const SubjectInfoContainer: FunctionComponent<RouteComponentProps<SubjectRouteParams>> = ({ match }) => {
  const { subjectCode } = match.params;

  const { data: generalInfoData, loading: generalInfoLoading } = useQuery<
    GeneralSubjectInfoQuery,
    GeneralSubjectInfoQueryVariables
  >(GENERAL_SUBJECT_INFO_QUERY, { variables: { subjectCode } });

  const { data: subjectInfoData, loading: subjectInfoLoading } = useQuery<SubjectInfoQuery, SubjectInfoQueryVariables>(
    SUBJECT_INFO_QUERY,
    {
      variables: { subjectCode },
    },
  );

  const renderSubjectInfos = ({ description, faculty, institute }: SubjectInfoQuery_subject) => {
    const teacherInfos = faculty
      ? faculty.map(({ firstName, lastName, roleName, phone, profilePicURL, email }) => ({
          name: `${firstName!} ${lastName!}`,
          roleName: roleName || 'professzor',
          phone: phone || undefined,
          email: email,
          profilePicURL: profilePicURL!,
        }))
      : [];

    return (
      <SubjectInfoCard
        institute={institute ? institute.name : ''}
        neptun={subjectCode}
        description={description}
        teacherInfos={teacherInfos}
      />
    );
  };

  const renderGeneralInfos = ({ info }: GeneralSubjectInfoQuery_subject) =>
    info
      ? info.map(({ id, title, subtitle, text }) => (
          <GeneralInfoCard key={id} title={title} subtitle={subtitle} content={text} />
        ))
      : undefined;

  return (
    <Box background="light" fill="vertical" align="center" gap="medium" pad="medium" margin="medium">
      {subjectInfoLoading && <SubjectInfoCardPlaceholder />}
      {generalInfoLoading && <GeneralInfoCardPlaceholder />}
      {subjectInfoData && subjectInfoData.subject && renderSubjectInfos(subjectInfoData.subject)}
      {generalInfoData && generalInfoData.subject && renderGeneralInfos(generalInfoData.subject)}
    </Box>
  );
};
