import gql from 'graphql-tag';
import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { Parallax } from 'react-parallax';
import { RouteComponentProps, withRouter } from 'react-router';
import Scroll from 'react-scroll';
import { Banner, Button, Flex, Hide, Image, Input } from 'rebass';
import styled from 'styled-components';

import downArrow from '../../assets/images/down.svg';
import { scrollOptions } from '../../constants';
import { authService } from '../../services/authService';
import i18n from '../../services/i18n';
import { ContactCard } from '../contact/ContactCard';
import { color, Header1, Header2, Header3 } from '../styles';
import { SubscribeButton } from '../subscribe';

const { scroller } = Scroll;

export const LoginInput = styled(Input)`
  color: ${color.darkBlue};
  height: 50px;
  border: 1px solid ${color.CogitoBlue};
  background-color: ${color.almostWhite};
  box-shadow: 0;
  font-weight: medium;
  padding-left: 15px;
  border-radius: 15px;
`;

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(email: $username, password: $password) {
      token
    }
  }
`;

const Home: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loginUser = useMutation(LOGIN_USER, { variables: { username, password } });

  const onLogin = (event) => {
    event.preventDefault();
    loginUser().then(({ data }) => authService.authSuccess(data.login.token, history));
  };

  return (
    <Flex flexDirection="column">
      <Flex
        flexDirection="column"
        className="Home"
        css={['background: linear-gradient(309.89deg, #4787D3 10.57%, #67BCFB 105.29%);']}
      >
        <Parallax blur={0} bgImage={require('../../assets/images/homeBackground.svg')} strength={800}>
          <Banner p={0} width="100%" bg="transparent">
            <Flex
              width={['100%', '100%', '100%', '75%', '65%']}
              flexDirection={['column', 'column', 'column', 'row']}
              justifyContent="center"
              alignItems="center"
              mt={['100px', '150px', '200px', '30px', '60px']}
              className="home"
              css={{
                maxWidth: '1024px',
              }}
            >
              <Flex
                width={['273px', '340px', '434px', i18n.t('home.motto.width'), i18n.t('home.motto.width')]}
                mr={['10px', '40px']}
                mb={['50px', '50px', '50px', '0px']}
                css={{
                  maxWidth: '600px',
                }}
              >
                <Flex flexDirection="column" alignItems={['flex-start']} justifyContent="center">
                  <Header1 fontSize={['32px', '32px', '40px', '40px', '48px']} color="#FFF">
                    {i18n.t('home.motto.part1')}
                    <span>{i18n.t('home.motto.span')}</span>
                    {i18n.t('home.motto.part2')}
                  </Header1>
                  <Header3 fontSize={['18px', '18px', '18px', '18px', '22px']} color="#FFF" mt={30}>
                    {i18n.t('home.subtitle')}
                  </Header3>
                </Flex>
              </Flex>
              <Flex pl={'0px'} pt={['40px', '50px', '80px', '0px']} mb="0px" justifyContent="flex-end" width="100%">
                <ContactCard p={0}>
                  <Flex
                    alignItems="center"
                    width={['100%', '100%', '100%', '300px']}
                    justifyContent="center"
                    flexDirection="column"
                    py={['0px', '0px', '30px', '30px']}
                    mx={['0px', '0px', '0px', '50px']}
                  >
                    <Header2
                      position="relative"
                      mt={['25px', '45px', '0px', '0px']}
                      color={color.CogitoBlue}
                      fontSize={['32px', '32px', '40px', '48px', '48px']}
                    >
                      {i18n.t('home.card.title')}
                    </Header2>
                    <form onSubmit={onLogin}>
                      <Flex flexDirection="column" alignItems="center" mt={20}>
                        <Flex width="100%" flexDirection="column">
                          <Header3 fontSize={16} color={color.CogitoBlue} textAlign="left" ml="5px">
                            {i18n.t('home.card.emailtitle')}
                          </Header3>
                          <LoginInput
                            name="email"
                            type="email"
                            required
                            fontSize="16px"
                            placeholder={i18n.t('home.card.emailplaceholder')}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
                            mb={20}
                          />
                        </Flex>
                        <Flex width="100%" flexDirection="column">
                          <Header3 fontSize={16} color={color.CogitoBlue} textAlign="left" ml="5px">
                            {i18n.t('home.card.passwordtitle')}
                          </Header3>
                          <LoginInput
                            required
                            type="password"
                            fontSize="16px"
                            placeholder={i18n.t('home.card.passwordplaceholder')}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                          />
                        </Flex>

                        <SubscribeButton
                          css={['background: linear-gradient(101.81deg, #63B6F6 1%, #4A8CD7 136.47%);']}
                          mt={30}
                          children={i18n.t('home.card.title')}
                          fontSize={[1, 2, 2, '24px', '24px']}
                          bg={'#F5FBFF'}
                          color={color.almostWhite}
                          borderRadius={20}
                        />
                      </Flex>
                    </form>
                  </Flex>
                </ContactCard>
              </Flex>
            </Flex>
          </Banner>
        </Parallax>
      </Flex>
      <Hide xsmall small medium>
        <Flex flexDirection="column" alignItems="center">
          <Button
            onClick={() => scroller.scrollTo('About', scrollOptions)}
            bg="transparent"
            mt="-50px"
            css={{
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transition: 'all 0.2s ease-in-out',
                transform: 'translatey(10px)',
              },
            }}
          >
            <Image src={downArrow} className="downButton" />
          </Button>
        </Flex>
      </Hide>
    </Flex>
  );
};

export const HomeSection = withRouter(Home);
