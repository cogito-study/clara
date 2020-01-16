import { Flex } from '@chakra-ui/core';
import Quill from 'quill';
import React, { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Head } from '../../core/components';
import { CollabPagePlaceholder } from '../components/common';
import { Study, StudyHeader } from '../components/study';
import { createStudyModeQuill } from '../quills/';
import { CollabRouteParams } from '../utils/collab-route';
import { useNoteContentQuery } from './graphql/note-content-query.generated';
import './marks.css';

export const StudyPage: React.FC = () => {
  const { noteID } = useParams<CollabRouteParams>();
  const [editor, setEditor] = useState<Quill | undefined>(undefined);

  const { data, loading } = useNoteContentQuery({
    variables: { noteID },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (!loading) {
      setEditor(createStudyModeQuill());
    }
  }, [loading]);

  return (
    <>
      <Head title={data?.note?.title} description={data?.note?.description} />
      <Flex bg="white">
        {loading ? (
          <CollabPagePlaceholder />
        ) : (
          <Suspense fallback={<CollabPagePlaceholder />}>
            <StudyHeader subject={data?.note?.subject ?? { name: '', code: '' }} />
            <Flex direction="column" mt={[4, 4, 4, 12]} align="center" w="100%">
              <Study editor={editor} noteData={data?.note} />
            </Flex>
          </Suspense>
        )}
      </Flex>
    </>
  );
};
