import React, { FunctionComponent } from 'react';
import { Heading, Image, Box } from 'grommet';
import { RouteComponentProps } from 'react-router-dom';

import cogitoPortrait from '../assets/images/cogito-portrait.svg';
import { Footer } from '../ui/components/Footer';
import { RegistrationCard } from '../ui/components/RegistrationCard';

export const RegisterContainer: FunctionComponent<RouteComponentProps<{ userID: string }>> = ({ match }) => {
  const onPasswordChange = (value: string) => console.log(value);

  const onPasswordCheckChange = (value: string) => console.log(value);

  return (
    <Box flex background="gradient" fill>
      <Box flex="shrink" justify="center" align="center">
        <Heading level="2" color="light">
          Let’s join the community!
        </Heading>
      </Box>
      <Box flex="grow" direction="row" justify="center" align="center" gap="small">
        <Box flex align="center" pad="large">
          <Image src={cogitoPortrait} width="40%" />
        </Box>
        <Box flex align="center" pad="large">
          <RegistrationCard
            name="Teszt Elek"
            email="asd@abc.com"
            onPasswordChange={onPasswordChange}
            onPasswordCheckChange={onPasswordCheckChange}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};
