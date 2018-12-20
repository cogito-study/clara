import React, { FunctionComponent, ChangeEvent } from 'react';
import { Box, BoxProps, Heading, TextInput, Button, Text, Image } from 'grommet';
import { FormField } from './FormField';
import { Spinner } from './Spinner';
import styled from 'styled-components';
import profile from '../../assets/images/Profile.svg';
import { Link } from './Link';
import { routePath } from '../../constants';

interface Props {
  name: string;
  email: string;
  isRegistrationDisabled: boolean;
  isLoading: boolean;
  onPasswordChange: (value: string) => void;
  onPasswordCheckChange: (value: string) => void;
  onRegistration?: () => void;
}

const Card = styled(Box)`
  min-height: 400px;
`;

const RegistrationCard: FunctionComponent<BoxProps & Props> = ({
  name,
  email,
  isRegistrationDisabled,
  isLoading,
  onPasswordChange,
  onPasswordCheckChange,
  onRegistration,
}) => (
  <Card
    responsive={false}
    width="500px"
    height="500px"
    background="white"
    elevation="large"
    align="center"
    justify="center"
    round="medium"
    pad="medium"
    gap="xsmall"
  >
    <Heading level="1" margin="0px 0px 10px 0px" color="primary">
      {'Register'}
    </Heading>
    <Box direction="row-responsive">
      <Box align="center">
        <Image src={profile} width="100px" />
      </Box>
      <Box direction="column" justify="center" pad="medium">
        <Heading level="3" margin="none" color="nightBlue">
          {name}
        </Heading>
        <Text margin="none" color="primary">
          {email}
        </Text>
      </Box>
    </Box>
    <Box margin="20px 0px 0px 0px">
      <Heading level="4" margin="0px 0px 0px 3px" color={'nightBlue'}>
        {'Password'}
      </Heading>
      <FormField flex="grow" basis="1" htmlFor="password" margin="none">
        <TextInput
          plain
          type="password"
          id="password"
          placeholder="password"
          onChange={(event: ChangeEvent<HTMLInputElement>) => onPasswordChange(event.target.value)}
        />
      </FormField>
    </Box>
    <Box>
      <Heading level="4" margin="0px 0px 0px 3px" color={'nightBlue'}>
        {'Confirm password'}
      </Heading>
      <FormField flex="grow" basis="1" htmlFor="password-check" margin="none">
        <TextInput
          plain
          type="password"
          id="password-check"
          placeholder="repeat password"
          onChange={(event: ChangeEvent<HTMLInputElement>) => onPasswordCheckChange(event.target.value)}
        />
      </FormField>
    </Box>
    {isLoading ? (
      <Spinner primary />
    ) : (
      <Button
        primary
        margin="20px 0px 0px 0px"
        disabled={isRegistrationDisabled}
        label="Registration"
        onClick={onRegistration}
      />
    )}
    <Text size="small" margin="none">
      Already have an account? <Link to={routePath.root()}>Login</Link>
    </Text>
  </Card>
);

export { RegistrationCard };
